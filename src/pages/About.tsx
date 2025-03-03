
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full mb-4 inline-block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
            Pioneering the future of sensing technology
          </h1>
          <p className="text-lg text-muted-foreground">
            Founded in 2018, IOsense has been at the forefront of developing innovative sensing solutions that seamlessly integrate with modern technology ecosystems.
          </p>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] animate-scale-in">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3" 
            alt="IOsense team at work"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-800 rounded-full mb-4 inline-block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
              What drives us every day
            </h2>
            <p className="text-lg text-muted-foreground">
              Our core values guide every decision we make and every product we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full mb-4 inline-block">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
            Meet the people behind IOsense
          </h2>
          <p className="text-lg text-muted-foreground">
            We're a diverse team of engineers, designers, and visionaries united by our passion for innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-black text-white py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="mx-auto mb-8 w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <h2 className="text-3xl md:text-4xl font-display font-light italic tracking-tight mb-6">
              "Our mission is to create sensing technology that enhances human experiences through simplicity, precision, and beauty."
            </h2>
            <p className="text-gray-400 mt-6">David Chen, Founder & CEO</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full mb-4 inline-block">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
            The IOsense story
          </h2>
          <p className="text-lg text-muted-foreground">
            From humble beginnings to industry leadership, our path has been defined by innovation and excellence.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gray-200 dark:bg-gray-800"></div>
          
          {timeline.map((item, index) => (
            <div 
              key={index} 
              className={`relative pl-12 pb-12 ${index % 2 === 0 ? 'md:translate-x-12' : 'md:-translate-x-12 md:ml-auto'} animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-10">
                <div className="w-3 h-3 rounded-full bg-black dark:bg-white"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full mb-3 inline-block">
                  {item.year}
                </span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
              Join our team
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about creating innovative technology that makes a difference.
            </p>
            <Button className="rounded-full px-8 py-6 text-base">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const values = [
  {
    title: "Innovation",
    description: "We push the boundaries of what's possible, constantly exploring new ideas and approaches to solve complex problems.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Excellence",
    description: "We are committed to the highest standards in everything we do, from product design to customer service.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  {
    title: "Sustainability",
    description: "We design our products with environmental responsibility in mind, minimizing waste and maximizing efficiency.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const team = [
  {
    name: "David Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Sophia Williams",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Marcus Johnson",
    role: "Lead Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Elena Rodriguez",
    role: "Design Director",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const timeline = [
  {
    year: "2018",
    title: "Company Founded",
    description: "IOsense was established with a mission to revolutionize sensing technology for consumer and industrial applications."
  },
  {
    year: "2019",
    title: "First Product Launch",
    description: "Released our flagship IO Sense Pro to critical acclaim, setting new standards in the industry."
  },
  {
    year: "2020",
    title: "International Expansion",
    description: "Opened offices in Europe and Asia to better serve our growing global customer base."
  },
  {
    year: "2021",
    title: "Series A Funding",
    description: "Secured $15M in funding to accelerate product development and market expansion."
  },
  {
    year: "2022",
    title: "Patent Breakthrough",
    description: "Developed proprietary sensing technology that improved accuracy by 300% while reducing power consumption."
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Received multiple awards for innovation and design excellence in sensing technology."
  }
];

export default About;
