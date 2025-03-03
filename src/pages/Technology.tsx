
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

const Technology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full mb-4 inline-block">
            Our Technology
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
            Advanced sensing for a connected world
          </h1>
          <p className="text-lg text-muted-foreground">
            Our innovative technologies are designed to provide unprecedented accuracy, reliability, and intelligence to your devices and environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-4">
              The science behind our sensors
            </h2>
            <p className="text-muted-foreground mb-6">
              IOsense combines cutting-edge hardware with sophisticated algorithms to create sensing solutions that outperform traditional technologies in precision, range, and adaptability.
            </p>
            <ul className="space-y-3 mb-6">
              {techFeatures.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center mr-3 shrink-0">
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="rounded-full">
              Read White Paper
            </Button>
          </div>
          <div className="order-1 md:order-2 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1563770660941-10516bcb688e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="IOsense sensor technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Breakdown */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-800 rounded-full mb-4 inline-block">
              Technical Specifications
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
              Precision engineering at every level
            </h2>
            <p className="text-lg text-muted-foreground">
              Our technology is built on a foundation of meticulous engineering and breakthrough innovations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specs.map((spec, index) => (
              <Card 
                key={index} 
                className="p-6 border border-gray-200 dark:border-gray-700 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                    {spec.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{spec.title}</h3>
                </div>
                <p className="text-muted-foreground">{spec.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-sm font-medium">Performance:</span>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full mt-2">
                    <div 
                      className="bg-black dark:bg-white h-2 rounded-full" 
                      style={{ width: `${spec.performance}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section className="container-custom section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="IOsense software interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="animate-slide-up">
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full mb-4 inline-block">
              Software
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-4">
              Intelligent software for powerful insights
            </h2>
            <p className="text-muted-foreground mb-6">
              Our proprietary software platform transforms raw sensor data into actionable intelligence, providing you with deeper insights and enhanced control.
            </p>
            <ul className="space-y-4 mb-8">
              {softwareFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-black dark:text-white mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button className="rounded-full">
              Explore Software Platform
            </Button>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="bg-black text-white py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full mb-4 inline-block">
              Ecosystem
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
              Seamless integration with your world
            </h2>
            <p className="text-lg text-gray-300">
              Our technology works with the products and platforms you already use, enhancing them with new capabilities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-center aspect-square animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-white text-xl font-bold">{partner}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button className="rounded-full px-8 py-6 bg-white text-black hover:bg-gray-100 text-base">
              View All Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="container-custom section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 animate-slide-up">
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full mb-4 inline-block">
              Research & Development
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-4">
              Pushing the boundaries of what's possible
            </h2>
            <p className="text-muted-foreground mb-6">
              Our R&D team is constantly exploring new frontiers in sensing technology, from quantum sensors to biometric innovations.
            </p>
            <div className="space-y-6">
              {researchAreas.map((area, index) => (
                <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  <h4 className="font-medium">{area.title}</h4>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Research image 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Research image 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22731d4be1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Research image 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092334252-9d21ad66c2cf?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Research image 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
              Ready to experience the future of sensing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover how our technology can transform your projects and environments with unparalleled precision and intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="rounded-full px-8 py-6 text-base w-full sm:w-auto">
                Request a Demo
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 text-base w-full sm:w-auto">
                View Technical Specs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const techFeatures = [
  "Quantum-inspired sensing algorithms for 10x accuracy improvement",
  "Low-power architecture with intelligent sleep modes for extended battery life",
  "Multi-spectral detection capabilities across electromagnetic, thermal, and acoustic domains",
  "Self-calibrating systems that maintain precision in changing environments",
  "Adaptive filtering to eliminate noise and focus on relevant signals"
];

const specs = [
  {
    title: "Sensing Precision",
    description: "Industry-leading accuracy with error margins below 0.01%, ensuring reliable data even in challenging conditions.",
    performance: 95,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  {
    title: "Energy Efficiency",
    description: "Ultra-low power consumption of under 10μW in standby mode, extending battery life to months or even years.",
    performance: 90,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Processing Speed",
    description: "On-device edge computing with 1.2 TFLOPS of processing power, enabling real-time analysis without cloud dependency.",
    performance: 85,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const softwareFeatures = [
  {
    title: "Advanced Analytics",
    description: "Powerful algorithms that transform raw data into actionable insights and predictive models."
  },
  {
    title: "Customizable Dashboard",
    description: "Intuitive interface that allows you to monitor and control your devices from anywhere."
  },
  {
    title: "API Integration",
    description: "Comprehensive API that enables seamless integration with your existing systems and applications."
  },
  {
    title: "Machine Learning",
    description: "Self-improving algorithms that adapt to your environment and usage patterns over time."
  }
];

const partners = [
  "Apple",
  "Google",
  "Amazon",
  "Microsoft",
  "Samsung",
  "Tesla",
  "Siemens",
  "Philips",
  "Bosch",
  "Honeywell",
  "Intel",
  "Nvidia"
];

const researchAreas = [
  {
    title: "Quantum Sensing",
    description: "Exploring quantum mechanics principles to develop sensors with unprecedented sensitivity and accuracy."
  },
  {
    title: "Biometric Integration",
    description: "Creating non-invasive sensing technologies that can monitor vital signs and health metrics in real-time."
  },
  {
    title: "Environmental Intelligence",
    description: "Developing systems that can detect and predict environmental changes with remarkable precision."
  }
];

export default Technology;
