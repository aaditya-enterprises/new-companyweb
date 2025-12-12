import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Star, Calendar, Users, Award, 
  MapPin, Briefcase, Mail, Phone, Instagram, Linkedin, 
  Facebook, ArrowRight, Upload, CheckCircle, XCircle,
  Shield, Clock, Zap, CheckSquare
} from 'lucide-react';

/* --- THEME & ASSETS --- */
const THEME = {
  colors: {
    gold: '#C49A59',
    goldHover: '#A88248',
    black: '#111111',
    darkGray: '#1F1F1F',
    lightGray: '#F9FAFB',
    white: '#FFFFFF',
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
  }
};

// Placeholder for the uploaded logo - in production this would be: import logo from './assets/logo.png'
const LOGO_URL = "logo (1).png"; 

/* --- DATA MOCKS --- */
const SERVICES = [
  {
    id: 1,
    title: "Government & Corporate Event Planning",
    desc: "End-to-end execution of AGMs, product launches, and gala dinners tailored to your brand ethos.",
    details: "Our event planning service is comprehensive and bespoke. We handle every aspect of your event, from initial concept and theme development to venue selection, catering management, and on-site coordination. Whether it's a government conferences & meeting or a high-stakes AGM, we ensure your brand values are reflected in every detail.",
    icon: <Briefcase className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Conferences & Summits",
    desc: "Large-scale logistical management for industry summits, ensuring seamless flow and engagement.",
    details: "We specialize in the complex logistics required for large-scale conferences and global summits. Our team manages delegate registration, speaker coordination, AV production, and breakout session flows. We ensure that thousands of attendees have a seamless experience, allowing you to focus on the content and networking.",
    icon: <Users className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Brand Activations",
    desc: "Immersive experiences that bring your brand story to life and connect directly with your audience.",
    details: "In an increasingly digital world, tangible brand experiences matter more than ever. We design immersive pop-ups, interactive installations, and experiential marketing campaigns that captivate audiences. Our goal is to create shareable moments that amplify your brand's reach across social media and beyond.",
    icon: <Star className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Luxury Experiences",
    desc: "Bespoke high-end retreats and VIP networking events crafted with meticulous attention to detail.",
    details: "For your most discerning guests, only the exceptional will do. We curate exclusive luxury retreats, VIP dinners, and high-touch networking events. From private jet charters to Michelin-starred catering and personalized gifting, we ensure every touchpoint exudes sophistication and exclusivity.",
    icon: <Award className="w-8 h-8" />
  },
  {
    id: 5,
    title: "Venue & Vendor Mgmt",
    desc: "Access to an exclusive network of premium venues and top-tier vendors across the globe.",
    details: "Leverage our decade-long relationships with the world's most sought-after venues and vendors. We negotiate the best rates and secure dates at locations that are often inaccessible to others. Our vendor network includes top-tier decorators, technical directors, and entertainers who meet our rigorous standards of quality.",
    icon: <MapPin className="w-8 h-8" />
  },
  {
    id: 6,
    title: "Employee Engagement",
    desc: "Creative team-building retreats and workshops designed to boost morale and productivity.",
    details: "Invest in your most valuable asset: your people. We move beyond standard ice-breakers to create meaningful offsites, wellness retreats, and skill-building workshops. Our programs are designed to align with your company culture, fostering genuine connection and renewed energy among your teams.",
    icon: <Users className="w-8 h-8" />
  }
];

const WHY_CHOOSE_DATA = [
  {
    title: "Multi-Service Expertise",
    desc: "From AMC to civil work, supply logistics, and events",
    icon: <Briefcase className="w-10 h-10" />
  },
  {
    title: "Government-Certified",
    desc: "Compliant with tender and procurement frameworks",
    icon: <Shield className="w-10 h-10" />
  },
  {
    title: "End-to-End Delivery",
    desc: "One-stop solution for infrastructure and facility needs",
    icon: <CheckCircle className="w-10 h-10" />
  },
  {
    title: "Skilled Manpower",
    desc: "Highly trained and experienced technical staff",
    icon: <Users className="w-10 h-10" />
  },
  {
    title: "24x7 Support",
    desc: "Prompt emergency response and service uptime assurance",
    icon: <Clock className="w-10 h-10" />
  },
  {
    title: "Transparent Engagement",
    desc: "Clear pricing, documented work, and strong reporting",
    icon: <Award className="w-10 h-10" />
  }
];

const CORE_VALUES_DATA = [
  {
    title: "Integrity",
    desc: "Transparent dealings and ethical business practices",
    icon: <Shield className="w-10 h-10" />
  },
  {
    title: "Quality Service",
    desc: "Delivered through skilled manpower and top-grade materials",
    icon: <Award className="w-10 h-10" />
  },
  {
    title: "Customer Focus",
    desc: "Solutions tailored to operational requirements",
    icon: <Users className="w-10 h-10" />
  },
  {
    title: "Safety First",
    desc: "Full compliance with safety norms and regulations",
    icon: <CheckSquare className="w-10 h-10" />
  },
  {
    title: "Innovation",
    desc: "Adoption of modern tools and industry best practices",
    icon: <Zap className="w-10 h-10" />
  }
];

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "ITDC Event",
    category: "Conference",
    image: "vigyanbhavan.jpeg",
    stats: { guests: "900+", location: "Vigyan Bhavan, Delhi", date: "Nov 2025"},
    summary: "Hosted at the prestigious Vigyaan Bhavan, this major ITDC government conference welcomed over 900 attendees. We oversaw end-to-end management, from venue branding to complex crowd control protocols. The event highlighted our expertise in delivering large-scale, high-impact summits at India’s most iconic government venues with absolute professionalism."
  },
  {
    id: 2,
    title: "Niti Ayog Event",
    category: "Conference",
    image: "surajkund.png", 
    stats: { guests: "350+", location: "Vardaan Jimkana, Surajkund", date: "Oct 2025"},
    summary: "Executed in October 2025, this exclusive Niti Aayog conference required high-level protocol management for 350+ distinguished guests. We focused on creating a secure and sophisticated environment at Vardaan Jimkhana, ensuring flawless VIP hospitality and operational efficiency that catered specifically to the needs of high-ranking government officials."
  },
  {
    id: 3,
    title: "ICMR Event",
    category: "Conference",
    image: "bharatmandapam.png",
    stats: { guests: "3000+", location: "Bharat Mandapam, Delhi", date: "Sep 2025"},
    summary: "We orchestrated this massive government medical summit at the world-class Bharat Mandapam. Handling over 3,000 delegates, our team managed complex logistics, including multi-track sessions and large-scale attendee flow. This project demonstrated our capacity to execute mega-events with precision, ensuring a seamless experience for medical professionals and dignitaries alike."
  }
];

/* --- COMPONENTS --- */

// Reusable Button
const Button = ({ children, variant = 'primary', className = '', onClick, type="button", disabled=false }) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 transition-all duration-300 font-medium text-sm tracking-wide uppercase";
  const variants = {
    primary: `bg-[#C49A59] text-white hover:bg-[#A88248] hover:shadow-lg disabled:opacity-70`,
    outline: `border border-[#C49A59] text-[#C49A59] hover:bg-[#C49A59] hover:text-white`,
    white: `bg-white text-black hover:bg-gray-100`
  };
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Navbar
const Navbar = ({ activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setActivePage('home')}
        >
          {/* Using text fallback if image fails, but designed to take the uploaded logo */}
          <div className="h-12 w-12 relative overflow-hidden">
             <img 
               src={LOGO_URL} 
               alt="Aaditya Enterprises Logo" 
               className="object-contain h-full w-full"
               onError={(e) => {
                 e.target.style.display = 'none';
                 e.target.parentElement.innerHTML = `<div class="bg-[#C49A59] w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xl">A</div>`;
               }}
             />
          </div>
          <span className={`font-serif text-xl font-bold tracking-wide ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            AADITYA <span className={`text-[#C49A59]`}>ENTERPRISES</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C49A59] ${
                activePage === link.id ? `text-[#C49A59]` : (isScrolled ? 'text-gray-800' : 'text-white')
              }`}
            >
              {link.name}
            </button>
          ))}
          <Button 
            variant={isScrolled ? 'primary' : 'white'} 
            className="ml-4 py-2 px-6"
            onClick={() => setActivePage('contact')}
          >
            Enquire Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#C49A59]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className={`w-8 h-8 ${isScrolled ? 'text-black' : 'text-white'}`} /> : <Menu className={`w-8 h-8 ${isScrolled ? 'text-black' : 'text-white'}`} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setMobileMenuOpen(false); }}
              className="text-left text-gray-900 font-medium py-2 border-b border-gray-100"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// Hero Section
const Hero = ({ onCtaClick }) => (
  <header className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
    {/* Background - In real code use <video> or high-res image */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop" 
        alt="Luxury Corporate Event" 
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
    </div>

    <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
      <p className={`text-[#C49A59] font-medium tracking-[0.2em] mb-4 uppercase`}>
        Defining Excellence
      </p>
      <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
        Crafting Exceptional <br/> Experiences
      </h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
        Aaditya Enterprises specializes in bespoke brand activations, conferences, and high-end corporate & government gatherings that leave a lasting legacy.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onCtaClick} variant="primary">Plan Your Event</Button>
        <Button onClick={() => onCtaClick('portfolio')} variant="outline">View Portfolio</Button>
      </div>
    </div>
  </header>
);

// Services Section
const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-gray-900 mb-4">Our Expertise</h2>
          <div className={`h-1 w-20 bg-[#C49A59] mx-auto mb-6`}></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We combine logistical precision with creative flair to deliver flawless events and conferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border-b-2 border-transparent hover:border-[#C49A59] flex flex-col items-start">
              <div className={`text-[#C49A59] mb-6 transform group-hover:-translate-y-1 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
              <button 
                onClick={() => setSelectedService(service)}
                className={`mt-auto flex items-center text-sm font-bold uppercase tracking-wider text-gray-900 group-hover:text-[#C49A59] transition-colors`}
              >
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-black hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={`bg-[#C49A59] p-8 text-white`}>
              <div className="mb-4 opacity-90">{selectedService.icon}</div>
              <h3 className="font-serif text-3xl font-bold">{selectedService.title}</h3>
            </div>
            
            <div className="p-8">
              <h4 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-4">Service Overview</h4>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {selectedService.details}
              </p>
              
              <div className="bg-gray-50 p-6 rounded border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-2">Why choose us for this?</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className={`w-4 h-4 text-[#C49A59]`} /> Specialized team with 10+ years experience</li>
                  <li className="flex items-center gap-2"><CheckCircle className={`w-4 h-4 text-[#C49A59]`} /> Trusted vendor network</li>
                  <li className="flex items-center gap-2"><CheckCircle className={`w-4 h-4 text-[#C49A59]`} /> 100% Satisfaction Guarantee</li>
                </ul>
              </div>

              <div className="mt-8 flex justify-end">
                <Button onClick={() => setSelectedService(null)} variant="outline">Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Component: Why Choose Us (RESTORED)
const WhyChooseSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl text-gray-900 mb-4">Why Choose Aaditya Enterprises?</h2>
        <div className={`h-1 w-20 bg-[#C49A59] mx-auto mb-6`}></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {WHY_CHOOSE_DATA.map((item, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className={`text-[#C49A59] mb-6 p-4 bg-orange-50 rounded-full`}>
              {item.icon}
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Component: Core Values (RESTORED)
const CoreValuesSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl text-gray-900 mb-4">Core Values</h2>
        <div className={`h-1 w-20 bg-[#C49A59] mx-auto mb-6`}></div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {CORE_VALUES_DATA.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className={`text-[#C49A59] mb-4 transform group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Portfolio Section (UPDATED - No Filter)
const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="font-serif text-4xl text-gray-900 mb-4">Selected Works</h2>
          <div className={`h-1 w-20 bg-[#C49A59]`}></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-80 overflow-hidden cursor-pointer bg-gray-200"
              onClick={() => setSelectedProject(item)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className={`text-[#C49A59] text-xs font-bold uppercase tracking-wider mb-2`}>
                  {item.category}
                </span>
                <h3 className="text-white font-serif text-2xl mb-1">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.stats.location}</p>
                <div className="mt-4 flex items-center text-white text-sm font-medium">
                  View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal/Lightbox */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full text-black hover:bg-gray-100 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="h-64 md:h-96 relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div>
                  <h2 className="text-white font-serif text-3xl md:text-4xl">{selectedProject.title}</h2>
                  <p className={`text-[#C49A59] text-lg`}>{selectedProject.category}</p>
                </div>
              </div>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="font-serif text-xl mb-4">Project Overview</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedProject.summary} This event required meticulous planning, high-security protocols, 
                  and a design language that reflected the client's premium standing in the market. 
                  Our team handled everything from venue procurement to the final closing speech.
                </p>
                {/* Gallery Removed as requested */}
              </div>
              <div className="bg-gray-50 p-6 rounded-lg h-fit">
                <h3 className="font-serif text-lg mb-4">Key Stats</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Users className={`w-5 h-5 text-[#C49A59]`} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Guests</p>
                      <p className="font-medium">{selectedProject.stats.guests}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 text-[#C49A59]`} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Location</p>
                      <p className="font-medium">{selectedProject.stats.location}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar className={`w-5 h-5 text-[#C49A59]`} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Date</p>
                      <p className="font-medium">{selectedProject.stats.date}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Contact Form Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', type: 'Corporate Event', date: '', budget: '', message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API Call
    setTimeout(() => {
      setStatus('success');
      // In real app: POST to /api/enquiry
    }, 2000);
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
       {/* Background accent */}
       <div className={`absolute top-0 right-0 w-96 h-96 bg-[#C49A59] opacity-10 rounded-full blur-[100px] pointer-events-none`}></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Let's Create Something <span className={`text-[#C49A59]`}>Extraordinary</span></h2>
          <p className="text-gray-400 text-lg mb-10 max-w-md">
            Ready to plan your next corporate milestone? Fill out the form, and our event specialists will contact you within 24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-[#C49A59]/10 rounded-full text-[#C49A59]`}>
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Call Us</p>
                <p className="text-xl font-medium">+91 9873457729</p>
                <p className="text-xl font-medium">+91 9718474071</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-[#C49A59]/10 rounded-full text-[#C49A59]`}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email Us</p>
                <p className="text-xl font-medium">hello@aadityaenterprises.com</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-8 border-t border-gray-800">
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 text-gray-900 shadow-2xl">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <CheckCircle className={`w-16 h-16 text-[#C49A59] mb-4`} />
              <h3 className="font-serif text-2xl font-bold mb-2">Enquiry Received</h3>
              <p className="text-gray-600 mb-6">Thank you, {formData.name}. We have received your details and will be in touch shortly.</p>
              <Button onClick={() => setStatus('idle')} variant="outline">Send Another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-2xl mb-6">Quick Enquiry</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name *</label>
                  <input required name="name" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-[#C49A59]" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Company</label>
                  <input name="company" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-[#C49A59]" placeholder="Acme Inc." />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email *</label>
                  <input required type="email" name="email" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-[#C49A59]" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone</label>
                  <input name="phone" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-[#C49A59]" placeholder="+91..." />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Event Type</label>
                  <select name="type" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-[#C49A59]">
                    <option>Corporate Event</option>
                    <option>Conference</option>
                    <option>Product Launch</option>
                    <option>Brand Activation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Est. Budget</label>
                  <select name="budget" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-[#C49A59]">
                    <option>Undecided</option>
                    <option>₹1,00,000 - ₹5,00,000</option>
                    <option>₹5,00,000 - ₹10,00,000</option>
                    <option>₹10,00,000 - ₹20,00,000</option>
                    <option>₹20,00,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Event Date</label>
                <input type="date" name="date" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-[#C49A59]" />
              </div>

              <div>
                 <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Message</label>
                 <textarea name="message" onChange={handleChange} rows="3" className="w-full bg-gray-50 border border-gray-200 p-3 rounded focus:outline-none focus:border-[#C49A59]" placeholder="Tell us about your vision..."></textarea>
              </div>

              {/* File Upload UI Placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                 <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                 <p className="text-xs text-gray-500">Click to upload RFQ or Brief (PDF/Max 10MB)</p>
              </div>

              <Button type="submit" variant="primary" className="w-full mt-4" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Submit Enquiry'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setActivePage }) => (
  <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="font-serif text-2xl font-bold tracking-wide mb-6">
            AADITYA <span className={`text-[#C49A59]`}>ENTERPRISES</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Premier corporate event management delivering luxury experiences, seamless logistics, and impactful brand activations globally.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {['Home', 'Services', 'Portfolio', 'Contact'].map(link => (
              <li key={link}>
                <button onClick={() => setActivePage(link.toLowerCase().split(' ')[0])} className="hover:text-white transition-colors">
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>Corporate Planning</li>
            <li>Conferences</li>
            <li>Brand Activations</li>
            <li>Luxury Retreats</li>
            <li>Product Launches</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6">Visit Us</h4>
          <address className="text-sm text-gray-400 not-italic leading-relaxed">
            Building no. 112,<br/>
            Kishangarh, Near Fortis Hospital,<br/>
            Vasant Kunj, Delhi, India 110070<br/><br/>
            <span className="text-white">+91 9873457729</span>
            <span className="text-white">+91 9718474071</span>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2024 Aaditya Enterprises. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

/* --- MAIN APP SHELL --- */
const App = () => {
  const [activePage, setActivePage] = useState('home');

  // Simple Router Logic
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <Hero onCtaClick={(page) => setActivePage(page || 'contact')} />
            <ServicesSection />
            
            {/* Stats Strip */}
            <div className={`bg-[#C49A59] py-12`}>
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                <div>
                  <div className="text-4xl font-serif font-bold mb-1">50+</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">Events Delivered</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold mb-1">4+</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">Cities</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold mb-1">10+</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">Years Exp.</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold mb-1">75k+</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">Guests Hosted</div>
                </div>
              </div>
            </div>

            {/* Added Why Choose Us Section Here */}
            <WhyChooseSection />

            <PortfolioSection />
            
            {/* Testimonials */}
            <section className="py-24 bg-gray-50">
              <div className="max-w-4xl mx-auto px-6 text-center">
                 <h2 className="font-serif text-3xl mb-12">Client Words</h2>
                 <div className="relative bg-white p-10 shadow-lg rounded-lg">
                   <div className={`text-[#C49A59] text-6xl font-serif absolute top-4 left-6 opacity-20`}>"</div>
                   <p className="text-gray-600 text-lg italic mb-6 relative z-10">
                     Aaditya Enterprises didn't just organize an event; they curated an experience that perfectly aligned with our luxury brand image. The attention to detail was impeccable.
                   </p>
                   <div>
                     <p className="font-bold text-gray-900">Rajesh Khanna</p>
                     <p className="text-sm text-gray-500">CMO, TechGlobal Industries</p>
                   </div>
                 </div>
              </div>
            </section>
            
            <ContactSection />
          </>
        );
      case 'about':
        return (
          <div className="pt-24 min-h-screen">
             <div className="max-w-7xl mx-auto px-6 py-12">
               <h1 className="font-serif text-5xl mb-6">Our Story</h1>
               <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                 <div>
                   <p className="text-lg text-gray-600 leading-relaxed mb-6">
                     Founded in 2021, Aaditya Enterprises began with a singular vision: to bring a level of professionalism and luxury to the corporate event sector.
                   </p>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     We believe every event tells a story. From intimate board meetings to sprawling international summits, our mission is to ensure your brand's narrative is heard, felt, and remembered.
                   </p>
                 </div>
               </div>
               
               {/* Added Core Values Section Here */}
               <CoreValuesSection />

               <h2 className="font-serif text-3xl mb-8 mt-24 text-center">Leadership Team</h2>
               <div className="grid md:grid-cols-3 gap-8">
                 {TEAM.map((member, i) => (
                   <div key={i} className="text-center group">
                     <div className="h-80 mb-4 overflow-hidden rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500">
                       <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="font-serif text-xl">{member.name}</h3>
                     <p className={`text-[#C49A59] text-sm uppercase`}>{member.role}</p>
                   </div>
                 ))}
               </div>
             </div>
             <ContactSection />
          </div>
        );
      case 'services':
        return (
          <div className="pt-24">
            <ServicesSection />
            <ContactSection />
          </div>
        );
      case 'portfolio':
        return (
          <div className="pt-24">
            <PortfolioSection />
            <ContactSection />
          </div>
        );
      case 'contact':
        return (
          <div className="pt-24">
            <ContactSection />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-white selection:bg-[#C49A59] selection:text-white">
      {/* Dynamic Font Loader for Demo */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&display=swap');
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; transform: translateY(20px); }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main>
        {renderContent()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
};

export default App;







