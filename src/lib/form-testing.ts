/**
 * Form Testing Utilities for HubSpot Integration
 * Provides comprehensive testing capabilities for all form types
 */

export interface TestFormData {
  formType: 'beacon-check' | 'beta-signup' | 'contact';
  data: Record<string, any>;
  shouldFail?: boolean;
  expectedError?: string;
  testScenario?: string;
}

export interface TestResult {
  success: boolean;
  statusCode: number;
  response: any;
  error?: string;
  duration: number;
  testData: TestFormData;
}

export interface TestSuite {
  name: string;
  description: string;
  tests: TestFormData[];
}

/**
 * Predefined test scenarios for different form types
 */
export const TEST_SCENARIOS: Record<string, TestSuite> = {
  'beacon-check': {
    name: 'Beacon Check Form Tests',
    description: 'Comprehensive tests for the beacon check form',
    tests: [
      {
        formType: 'beacon-check',
        testScenario: 'Valid submission',
        data: {
          email: 'test.user@example.com',
          company: 'Test Company Inc',
          role: 'CMO',
          message: 'This is a test message for beacon check analysis. It should be long enough to pass validation.',
          consent: true,
          type: 'beacon-check'
        }
      },
      {
        formType: 'beacon-check',
        testScenario: 'Missing required fields',
        shouldFail: true,
        expectedError: 'Missing required fields',
        data: {
          email: 'test.user@example.com',
          type: 'beacon-check'
        }
      },
      {
        formType: 'beacon-check',
        testScenario: 'Invalid email format',
        shouldFail: true,
        expectedError: 'Valid email address is required',
        data: {
          email: 'invalid-email',
          company: 'Test Company',
          role: 'CMO',
          message: 'Test message for beacon check',
          consent: true,
          type: 'beacon-check'
        }
      },
      {
        formType: 'beacon-check',
        testScenario: 'Message too short',
        shouldFail: true,
        expectedError: 'Message must be at least 10 characters long',
        data: {
          email: 'test.user@example.com',
          company: 'Test Company',
          role: 'CMO',
          message: 'Short',
          consent: true,
          type: 'beacon-check'
        }
      },
      {
        formType: 'beacon-check',
        testScenario: 'Honeypot triggered',
        shouldFail: true,
        data: {
          email: 'test.user@example.com',
          company: 'Test Company',
          role: 'CMO',
          message: 'This is a test message for beacon check',
          consent: true,
          website: 'https://spam-site.com', // Honeypot field
          type: 'beacon-check'
        }
      },
      {
        formType: 'beacon-check',
        testScenario: 'No consent given',
        shouldFail: true,
        expectedError: 'Consent is required to process your request',
        data: {
          email: 'test.user@example.com',
          company: 'Test Company',
          role: 'CMO',
          message: 'This is a test message for beacon check',
          consent: false,
          type: 'beacon-check'
        }
      }
    ]
  },

  'beta-signup': {
    name: 'Beta Signup Form Tests',
    description: 'Comprehensive tests for the beta signup form',
    tests: [
      {
        formType: 'beta-signup',
        testScenario: 'Valid submission with interests',
        data: {
          email: 'beta.user@company.com',
          firstName: 'Jane',
          lastName: 'Smith',
          company: 'Innovation Corp',
          role: 'Marketing Director',
          companySize: '201-1000',
          interests: ['semantic-drift', 'ai-alignment', 'brand-consistency'],
          consent: true,
          type: 'beta-signup'
        }
      },
      {
        formType: 'beta-signup',
        testScenario: 'Minimal valid submission',
        data: {
          email: 'minimal.user@startup.com',
          firstName: 'John',
          company: 'Startup XYZ',
          consent: true,
          type: 'beta-signup'
        }
      },
      {
        formType: 'beta-signup',
        testScenario: 'Missing first name',
        shouldFail: true,
        expectedError: 'First name is required',
        data: {
          email: 'test@company.com',
          company: 'Test Company',
          consent: true,
          type: 'beta-signup'
        }
      },
      {
        formType: 'beta-signup',
        testScenario: 'Large company submission',
        data: {
          email: 'enterprise.user@bigcorp.com',
          firstName: 'Sarah',
          lastName: 'Johnson',
          company: 'Big Corp Enterprise',
          role: 'CMO',
          companySize: '1000+',
          interests: ['enterprise-features', 'api-integration'],
          consent: true,
          type: 'beta-signup'
        }
      }
    ]
  },

  'contact': {
    name: 'Contact Form Tests',
    description: 'Comprehensive tests for the contact form',
    tests: [
      {
        formType: 'contact',
        testScenario: 'Valid general inquiry',
        data: {
          firstName: 'Mike',
          lastName: 'Wilson',
          email: 'mike.wilson@agency.com',
          company: 'Creative Agency Ltd',
          role: 'Account Director',
          subject: 'General Inquiry',
          message: 'I would like to learn more about your APO solutions and how they can help our clients improve their marketing effectiveness.',
          consent: true,
          type: 'contact'
        }
      },
      {
        formType: 'contact',
        testScenario: 'Product demo request',
        data: {
          firstName: 'Lisa',
          lastName: 'Chen',
          email: 'lisa.chen@techstartup.com',
          company: 'Tech Startup Inc',
          role: 'VP Marketing',
          subject: 'Product Demo',
          message: 'We are interested in seeing a demonstration of your platform for our marketing team. Please let us know your availability.',
          consent: true,
          type: 'contact'
        }
      },
      {
        formType: 'contact',
        testScenario: 'Enterprise sales inquiry',
        data: {
          firstName: 'Robert',
          lastName: 'Davis',
          email: 'robert.davis@enterprise.com',
          company: 'Enterprise Solutions Corp',
          role: 'CMO',
          subject: 'Enterprise Sales',
          message: 'We represent a Fortune 500 company interested in enterprise-level APO solutions. We need to discuss custom pricing and implementation.',
          consent: true,
          type: 'contact'
        }
      },
      {
        formType: 'contact',
        testScenario: 'Missing subject',
        shouldFail: true,
        expectedError: 'Subject is required',
        data: {
          firstName: 'Test',
          email: 'test@company.com',
          company: 'Test Company',
          message: 'This is a test message without subject',
          consent: true,
          type: 'contact'
        }
      },
      {
        formType: 'contact',
        testScenario: 'Message too short',
        shouldFail: true,
        expectedError: 'Message must be at least 10 characters long',
        data: {
          firstName: 'Test',
          email: 'test@company.com',
          company: 'Test Company',
          subject: 'General Inquiry',
          message: 'Short',
          consent: true,
          type: 'contact'
        }
      }
    ]
  },

  'spam-protection': {
    name: 'Spam Protection Tests',
    description: 'Tests for spam protection mechanisms',
    tests: [
      {
        formType: 'beacon-check',
        testScenario: 'Multiple honeypot fields filled',
        shouldFail: true,
        data: {
          email: 'spam@test.com',
          company: 'Spam Company',
          role: 'Spammer',
          message: 'This is spam content',
          consent: true,
          website: 'https://spam.com',
          phone: '555-1234',
          address: '123 Spam Street',
          url: 'https://evil.com',
          type: 'beacon-check'
        }
      },
      {
        formType: 'contact',
        testScenario: 'Suspicious email pattern',
        shouldFail: true,
        data: {
          firstName: 'Test',
          email: 'a@b.com', // Too short pattern
          company: 'Test',
          subject: 'Test',
          message: 'Test message content',
          consent: true,
          type: 'contact'
        }
      },
      {
        formType: 'beta-signup',
        testScenario: 'Keyboard walking pattern',
        shouldFail: true,
        data: {
          firstName: 'qwerty', // Keyboard walking
          email: 'test@asdf.com',
          company: 'asdf company',
          consent: true,
          type: 'beta-signup'
        }
      }
    ]
  }
};

/**
 * Test runner class for form submissions
 */
export class FormTestRunner {
  private baseUrl: string;
  private results: TestResult[] = [];

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  /**
   * Run a single test case
   */
  async runTest(testData: TestFormData): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${this.baseUrl}/api/hubspot/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'HubSpot-Form-Tester/1.0',
        },
        body: JSON.stringify({
          ...testData.data,
          timestamp: Date.now(),
          formStartTime: Date.now() - 5000, // Simulate 5 second form completion
          userAgent: 'HubSpot-Form-Tester/1.0',
          referrer: `${this.baseUrl}/test-page`
        })
      });

      const responseData = await response.json();
      const duration = Date.now() - startTime;

      const result: TestResult = {
        success: response.ok,
        statusCode: response.status,
        response: responseData,
        duration,
        testData
      };

      // Check if test should fail
      if (testData.shouldFail) {
        result.success = !response.ok;
        if (response.ok) {
          result.error = `Test should have failed but succeeded`;
        }
      }

      // Check expected error message
      if (testData.expectedError && responseData.error) {
        const errorMatches = responseData.error.includes(testData.expectedError);
        if (!errorMatches) {
          result.error = `Expected error "${testData.expectedError}" but got "${responseData.error}"`;
          result.success = false;
        }
      }

      this.results.push(result);
      return result;

    } catch (error) {
      const duration = Date.now() - startTime;
      const result: TestResult = {
        success: false,
        statusCode: 0,
        response: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration,
        testData
      };

      this.results.push(result);
      return result;
    }
  }

  /**
   * Run a complete test suite
   */
  async runTestSuite(suiteName: string): Promise<TestResult[]> {
    const suite = TEST_SCENARIOS[suiteName];
    if (!suite) {
      throw new Error(`Test suite "${suiteName}" not found`);
    }

    console.log(`\n🧪 Running test suite: ${suite.name}`);
    console.log(`📝 ${suite.description}\n`);

    const results: TestResult[] = [];
    
    for (const test of suite.tests) {
      console.log(`⏳ Running: ${test.testScenario}`);
      const result = await this.runTest(test);
      
      if (result.success) {
        console.log(`✅ PASS: ${test.testScenario} (${result.duration}ms)`);
      } else {
        console.log(`❌ FAIL: ${test.testScenario} (${result.duration}ms)`);
        if (result.error) {
          console.log(`   Error: ${result.error}`);
        }
      }
      
      results.push(result);
      
      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return results;
  }

  /**
   * Run all test suites
   */
  async runAllTests(): Promise<Record<string, TestResult[]>> {
    const allResults: Record<string, TestResult[]> = {};
    
    for (const suiteName of Object.keys(TEST_SCENARIOS)) {
      allResults[suiteName] = await this.runTestSuite(suiteName);
    }

    return allResults;
  }

  /**
   * Generate test report
   */
  generateReport(): string {
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const avgDuration = totalTests > 0 ? 
      this.results.reduce((sum, r) => sum + r.duration, 0) / totalTests : 0;

    let report = '\n📊 HubSpot Form Integration Test Report\n';
    report += '=' .repeat(50) + '\n\n';
    report += `Total Tests: ${totalTests}\n`;
    report += `✅ Passed: ${passedTests}\n`;
    report += `❌ Failed: ${failedTests}\n`;
    report += `⏱️  Average Duration: ${avgDuration.toFixed(2)}ms\n`;
    report += `📈 Success Rate: ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0}%\n\n`;

    if (failedTests > 0) {
      report += '❌ Failed Tests:\n';
      report += '-'.repeat(20) + '\n';
      
      this.results
        .filter(r => !r.success)
        .forEach((result, index) => {
          report += `${index + 1}. ${result.testData.testScenario}\n`;
          report += `   Form Type: ${result.testData.formType}\n`;
          report += `   Status Code: ${result.statusCode}\n`;
          report += `   Error: ${result.error || 'Unknown error'}\n`;
          if (result.response && result.response.error) {
            report += `   API Error: ${result.response.error}\n`;
          }
          report += '\n';
        });
    }

    return report;
  }

  /**
   * Clear test results
   */
  clearResults(): void {
    this.results = [];
  }

  /**
   * Get all results
   */
  getResults(): TestResult[] {
    return [...this.results];
  }
}

/**
 * Rate limiting test
 */
export async function testRateLimit(baseUrl: string = 'http://localhost:3000'): Promise<void> {
  console.log('\n🚦 Testing Rate Limiting...');
  
  const testData = {
    email: 'ratelimit.test@example.com',
    company: 'Rate Limit Test Co',
    role: 'Tester',
    message: 'This is a rate limit test message',
    consent: true,
    type: 'beacon-check'
  };

  // Send 10 rapid requests
  const promises = Array.from({ length: 10 }, (_, i) => 
    fetch(`${baseUrl}/api/hubspot/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    }).then(async res => ({
      index: i + 1,
      status: res.status,
      response: await res.json()
    }))
  );

  const results = await Promise.all(promises);
  
  results.forEach(result => {
    if (result.status === 429) {
      console.log(`✅ Request ${result.index}: Rate limited (${result.status})`);
    } else if (result.status === 200) {
      console.log(`⚠️  Request ${result.index}: Allowed (${result.status})`);
    } else {
      console.log(`❌ Request ${result.index}: Unexpected status (${result.status})`);
    }
  });

  const rateLimitedCount = results.filter(r => r.status === 429).length;
  console.log(`\n📊 Rate Limiting Results: ${rateLimitedCount}/10 requests were rate limited`);
}

/**
 * Performance test
 */
export async function testPerformance(
  baseUrl: string = 'http://localhost:3000',
  concurrentRequests: number = 5
): Promise<void> {
  console.log(`\n⚡ Testing Performance with ${concurrentRequests} concurrent requests...`);
  
  const testData = {
    email: 'performance.test@example.com',
    company: 'Performance Test Corp',
    role: 'CMO',
    message: 'This is a performance test message to measure response times',
    consent: true,
    type: 'beacon-check'
  };

  const startTime = Date.now();
  
  const promises = Array.from({ length: concurrentRequests }, async (_, i) => {
    const requestStart = Date.now();
    
    try {
      const response = await fetch(`${baseUrl}/api/hubspot/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testData,
          email: `performance.test.${i}@example.com`
        })
      });
      
      const duration = Date.now() - requestStart;
      const result = await response.json();
      
      return {
        index: i + 1,
        status: response.status,
        duration,
        success: response.ok
      };
    } catch (error) {
      return {
        index: i + 1,
        status: 0,
        duration: Date.now() - requestStart,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  });

  const results = await Promise.all(promises);
  const totalDuration = Date.now() - startTime;
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} Request ${result.index}: ${result.duration}ms (${result.status})`);
  });

  const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
  const successCount = results.filter(r => r.success).length;
  
  console.log(`\n📊 Performance Results:`);
  console.log(`   Total Duration: ${totalDuration}ms`);
  console.log(`   Average Request Time: ${avgDuration.toFixed(2)}ms`);
  console.log(`   Success Rate: ${successCount}/${concurrentRequests} (${((successCount/concurrentRequests)*100).toFixed(1)}%)`);
}

/**
 * CLI test runner function
 */
export async function runTestCLI(): Promise<void> {
  const args = process.argv.slice(2);
  const baseUrl = args.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:3000';
  
  const runner = new FormTestRunner(baseUrl);
  
  console.log('🚀 HubSpot Form Integration Test Suite');
  console.log(`🌐 Testing against: ${baseUrl}`);
  
  // Run all tests
  await runner.runAllTests();
  
  // Generate and display report
  console.log(runner.generateReport());
  
  // Run additional tests
  await testRateLimit(baseUrl);
  await testPerformance(baseUrl);
  
  console.log('\n✅ All tests completed!');
}

// Export test runner for programmatic use
export default FormTestRunner;