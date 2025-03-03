
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24">
      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full mb-4 inline-block">
            Our Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
            Sensing technology that changes everything
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reimagined from the ground up, our sensors deliver unmatched precision, reliability, and ease of use for a wide range of applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full mb-4 inline-block">
              Premium Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
              Join thousands of satisfied customers
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our innovative sensing solutions are trusted by leading companies across industries. See why they choose IOsense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card bg-white/5 p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      fill="currentColor" 
                      className="text-yellow-400" 
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button className="rounded-full px-8 py-6 bg-white text-black hover:bg-gray-100 text-base">
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>

      <section className="container-custom section-spacing">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full mb-4 inline-block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your needs. All plans include our premium support and warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-2xl p-8 border ${
                plan.featured 
                  ? 'border-black shadow-lg relative' 
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-semibold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full rounded-full ${
                  plan.featured 
                    ? 'bg-black hover:bg-black/90 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-foreground'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  return (
    <Card 
      className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-2xl group animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-medium">${product.price}</span>
          <Button variant="ghost" className="group/btn" size="sm">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const products = [
  {
    id: 1,
    name: "IO Sense Pro",
    description: "Our flagship multi-functional sensor with advanced detection capabilities.",
    price: "299",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2378&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "IO Sense Mini",
    description: "Compact design with the same precision in a smaller package.",
    price: "199",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "IO Hub Controller",
    description: "Central hub to connect and control all your IOsense devices.",
    price: "349",
    image: "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "IO Monitor 4K",
    description: "Ultra-high definition display with integrated sensors.",
    price: "499",
    image: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?q=80&w=2272&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "IO Connect Kit",
    description: "Complete starter package for smart home integration.",
    price: "399",
    image: "https://images.unsplash.com/photo-1563208275-4e627769cf13?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 6,
    name: "IO Sense Outdoor",
    description: "Weather-resistant sensors for outdoor environments.",
    price: "249",
    image: "https://images.unsplash.com/photo-1514840400428-a169ae9c1ebb?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "CTO at TechVision",
    quote: "The IOsense devices have transformed how we monitor our facilities. The precision and reliability are unmatched in the industry."
  },
  {
    name: "Michael Chen",
    title: "Product Manager at Innovate",
    quote: "We've integrated IOsense into our smart building solutions and our clients are amazed by the seamless experience."
  },
  {
    name: "Emily Rodriguez",
    title: "Director of Operations at SmartSpace",
    quote: "IOsense has reduced our maintenance costs by 40% while improving accuracy. It's been a game changer for our business."
  }
];

const pricingPlans = [
  {
    name: "Basic",
    price: 99,
    description: "Essential features for small projects",
    features: [
      "1 IOsense device",
      "Basic monitoring",
      "Email support",
      "1-year warranty"
    ],
    featured: false
  },
  {
    name: "Professional",
    price: 199,
    description: "Advanced features for growing needs",
    features: [
      "3 IOsense devices",
      "Advanced analytics",
      "Priority support",
      "Real-time alerts",
      "2-year warranty"
    ],
    featured: true
  },
  {
    name: "Enterprise",
    price: 399,
    description: "Complete solution for businesses",
    features: [
      "10 IOsense devices",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced security features",
      "5-year warranty"
    ],
    featured: false
  }
];

export default Products;
