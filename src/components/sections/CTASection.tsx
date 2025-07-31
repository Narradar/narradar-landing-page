import { BeaconCheckForm } from '@/components/forms'

export function CTASection() {
  return (
    <section id="beacon-check" className="py-16 bg-primary-600">
      <div className="container-narrow">
        <div className="text-center mb-8">
          <h2 className="heading-lg text-white mb-4">
            Run a Beacon Check and get your Drift Report in minutes
          </h2>
          <p className="text-xl text-primary-100">
            See how AI models interpret your message and get actionable insights to improve alignment
          </p>
        </div>

        <BeaconCheckForm className="max-w-2xl mx-auto" />
      </div>
    </section>
  )
}