
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, BarChart2, Cloud, Database, Globe, Lock, Server, Shield } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-20 overflow-hidden hero-pattern">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                IOsense Real-time Monitoring Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Sensor intelligence for industrial <span className="text-blue-600 dark:text-blue-400">transformation</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg text-balance">
                IOsense provides real-time monitoring and analytics for your industrial sensors and IoT devices with advanced security features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <>
                    <Link to="/login">
                      <Button size="lg" className="rounded-full font-medium">
                        Get Started <ArrowRight className="ml-2" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button size="lg" variant="outline" className="rounded-full font-medium">
                        Contact Sales
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard">
                    <Button size="lg" className="rounded-full font-medium">
                      Go to Dashboard <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="relative animate-floating">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 animate-scale-in">
                <img 
                  src="/placeholder.svg" 
                  alt="Dashboard preview" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Real-time monitoring
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Monitoring Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Industrial-grade sensor management with real-time analytics and intelligent alerts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart2 className="w-10 h-10 text-blue-600" />}
              title="Real-time Analytics"
              description="Monitor and analyze sensor data in real-time with intuitive dashboards and visualizations."
            />
            <FeatureCard 
              icon={<Shield className="w-10 h-10 text-green-600" />}
              title="Advanced Security"
              description="Enterprise-grade security with role-based access control and data encryption."
            />
            <FeatureCard 
              icon={<Server className="w-10 h-10 text-purple-600" />}
              title="Device Management"
              description="Easily manage and configure all your IoT devices from a central dashboard."
            />
            <FeatureCard 
              icon={<Database className="w-10 h-10 text-orange-600" />}
              title="Data Storage"
              description="Secure, scalable storage for all your sensor data with flexible retention policies."
            />
            <FeatureCard 
              icon={<Cloud className="w-10 h-10 text-indigo-600" />}
              title="Cloud Integration"
              description="Seamlessly integrate with leading cloud platforms and services."
            />
            <FeatureCard 
              icon={<Globe className="w-10 h-10 text-teal-600" />}
              title="Global Deployment"
              description="Deploy and monitor sensors anywhere in the world with our distributed architecture."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your industrial operations?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of companies using IOsense to monitor and optimize their industrial sensors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={user ? "/dashboard" : "/login"}>
                <Button size="lg" variant="default" className="bg-white text-blue-700 hover:bg-blue-50 rounded-full">
                  {user ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 rounded-full">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section could be added here */}

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Card className="border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md">
    <CardHeader className="pb-2">
      <div className="mb-4">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

export default Index;
