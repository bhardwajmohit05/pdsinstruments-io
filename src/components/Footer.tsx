
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-black font-semibold text-xs">IO</span>
              </div>
              <span className="font-display text-xl font-semibold tracking-tight">IOsense</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Premium sensing solutions for the modern world. Beautifully designed, meticulously crafted.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              <FooterLink href="/products/sensors">Sensors</FooterLink>
              <FooterLink href="/products/controllers">Controllers</FooterLink>
              <FooterLink href="/products/monitors">Monitors</FooterLink>
              <FooterLink href="/products/accessories">Accessories</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/technology">Technology</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/support">Help Center</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {currentYear} IOsense. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/terms" className="hover:text-gray-900 dark:hover:text-gray-200">Terms</Link>
              <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-gray-200">Privacy</Link>
              <Link to="/cookies" className="hover:text-gray-900 dark:hover:text-gray-200">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
