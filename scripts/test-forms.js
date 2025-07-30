#!/usr/bin/env node

/**
 * HubSpot Form Integration Test Runner
 * 
 * Usage:
 *   npm run test:forms
 *   npm run test:forms -- --url=https://your-domain.com
 *   npm run test:forms -- --suite=beacon-check
 *   npm run test:forms -- --performance
 */

const { FormTestRunner, testRateLimit, testPerformance, runTestCLI } = require('../src/lib/form-testing');

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  const config = {
    url: 'http://localhost:3000',
    suite: null,
    performance: false,
    rateLimit: false,
    help: false
  };

  args.forEach(arg => {
    if (arg.startsWith('--url=')) {
      config.url = arg.split('=')[1];
    } else if (arg.startsWith('--suite=')) {
      config.suite = arg.split('=')[1];
    } else if (arg === '--performance') {
      config.performance = true;
    } else if (arg === '--rate-limit') {
      config.rateLimit = true;
    } else if (arg === '--help' || arg === '-h') {
      config.help = true;
    }
  });

  if (config.help) {
    console.log(`
🧪 HubSpot Form Integration Test Runner

Usage:
  npm run test:forms [options]

Options:
  --url=<url>        Test URL (default: http://localhost:3000)
  --suite=<name>     Run specific test suite
  --performance      Run performance tests
  --rate-limit       Run rate limiting tests
  --help, -h         Show this help message

Available test suites:
  - beacon-check     Beacon Check form tests
  - beta-signup      Beta Signup form tests
  - contact          Contact form tests
  - spam-protection  Spam protection tests

Examples:
  npm run test:forms
  npm run test:forms -- --url=https://staging.narradar.com
  npm run test:forms -- --suite=beacon-check
  npm run test:forms -- --performance --rate-limit
`);
    return;
  }

  console.log('🚀 HubSpot Form Integration Test Suite');
  console.log(`🌐 Testing against: ${config.url}`);
  console.log('');

  const runner = new FormTestRunner(config.url);

  try {
    if (config.suite) {
      // Run specific test suite
      console.log(`Running test suite: ${config.suite}`);
      await runner.runTestSuite(config.suite);
    } else {
      // Run all test suites
      console.log('Running all test suites...');
      await runner.runAllTests();
    }

    // Generate and display report
    console.log(runner.generateReport());

    // Run additional tests if requested
    if (config.rateLimit || (!config.suite && !config.performance)) {
      await testRateLimit(config.url);
    }

    if (config.performance || (!config.suite && !config.rateLimit)) {
      await testPerformance(config.url);
    }

    console.log('\\n✅ All tests completed!');

    // Exit with appropriate code
    const results = runner.getResults();
    const hasFailures = results.some(r => !r.success);
    process.exit(hasFailures ? 1 : 0);

  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Run the main function
main();