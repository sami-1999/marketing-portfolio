"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faPaperPlane,
  faUser,
  faRocket,
  faChartLine,
  faBullhorn,
  faCheck,
  faStar,
  faQuoteLeft,
  faHandshake,
  faCode,
  faServer,
  faDatabase,
  faCog,
  faEye,
  faQuestionCircle,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faGithub,
  faLinkedin,
  faInstagram,
  faTwitter,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import portfolioData from "../data/portfolio.json";
import { PortfolioData } from "../types/portfolio";

// Type assertion for the imported JSON data
const data: PortfolioData = portfolioData as PortfolioData;

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (res.ok) {
        setSubmitStatus({
          type: "success",
          message: responseData.message || "Quote request sent successfully! I'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            responseData.error || "Failed to send request. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      const sections = [
        { id: "about", nav: "about" },
        { id: "services", nav: "services" },
        { id: "portfolio", nav: "portfolio" },
        { id: "testimonials", nav: "testimonials" },
        { id: "pricing", nav: "pricing" },
        { id: "contact", nav: "contact" },
      ];

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.nav);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: "Ahmed Hassan",
      company: "Fashion Forward Co.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "Sara transformed our entire digital presence. Her combination of technical skills and marketing expertise is unmatched. Our sales increased by 400%!",
      rating: 5,
      service: "Web Development + Social Media"
    },
    {
      name: "Fatima Ali",
      company: "TechStart Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      text: "Working with Sara was a game-changer. She built our platform from scratch and created a marketing strategy that got us 50K users in 6 months.",
      rating: 5,
      service: "Full Stack Development"
    },
    {
      name: "Omar Sheikh",
      company: "Digital Health Clinic",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Sara's IT solutions and digital marketing expertise helped us modernize our practice. Patient engagement increased by 250% and our systems run flawlessly.",
      rating: 5,
      service: "IT Solutions + Marketing"
    },
    {
      name: "Zara Khan",
      company: "Beauty Essentials",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      text: "The e-commerce platform Sara built for us is incredible. Combined with her social media strategies, we've seen 300% growth in online sales.",
      rating: 5,
      service: "E-commerce + Social Media"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Services data from portfolio.json with icons
  const services = data.services.slice(0, 4).map((service, index) => {
    const icons = [faBullhorn, faChartLine, faCode, faServer];
    const colors = ["from-pink-500 to-rose-500", "from-blue-500 to-cyan-500", "from-purple-500 to-indigo-500", "from-green-500 to-emerald-500"];
    
    return {
      icon: icons[index],
      title: service.title,
      description: service.description,
      features: service.features,
      color: colors[index]
    };
  });

  // Portfolio/Case Studies data from portfolio.json
  const portfolioItems = data.projects.map((project, index) => {
    const images = [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop"
    ];
    
    return {
      title: project.title,
      category: project.status === "Completed" ? "Completed Project" : "Ongoing Project",
      image: images[index % images.length],
      results: project.metrics,
      description: project.description,
      tech: ["Social Media", "Digital Marketing", "Analytics", "Strategy"]
    };
  });

  // Pricing plans
  const pricingPlans = [
    {
      name: "Basic",
      price: "$599",
      period: "/month",
      description: "Perfect for small businesses starting their digital journey",
      features: [
        "Social Media Management (2 platforms)",
        "Basic Website Maintenance",
        "Monthly Analytics Report",
        "Email Support",
        "Content Creation (10 posts/month)"
      ],
      popular: false,
      cta: "Get Started",
      color: "from-blue-600 to-slate-600"
    },
    {
      name: "Standard",
      price: "$1,299",
      period: "/month",
      description: "Ideal for growing businesses ready to scale digitally",
      features: [
        "Social Media Management (4 platforms)",
        "Custom Website Development",
        "Paid Ads Management ($500 ad spend included)",
        "IT Support & Maintenance",
        "Content Creation (20 posts/month)",
        "Priority Support",
        "Monthly Strategy Call"
      ],
      popular: true,
      cta: "Most Popular",
      color: "from-slate-700 to-gray-700"
    },
    {
      name: "Premium",
      price: "$2,499",
      period: "/month",
      description: "Complete digital solution for established businesses",
      features: [
        "Full Digital Marketing Suite",
        "Custom Web Application Development",
        "Complete IT Infrastructure Management",
        "Advanced Analytics & Reporting",
        "24/7 Priority Support",
        "Dedicated Account Manager",
        "Weekly Strategy Sessions",
        "Unlimited Content Creation"
      ],
      popular: false,
      cta: "Contact Us",
      color: "from-gray-600 to-slate-700"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold theme-gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Sara Khan
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Services", "Portfolio", "Testimonials", "Pricing", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium transition-all duration-300 relative ${
                    activeSection === item.toLowerCase()
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      layoutId="activeSection"
                    />
                  )}
                </button>
              ))}
            </div>
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="theme-gradient text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Quote
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hi, I'm{" "}
                <span className="theme-gradient-text block">
                  Sara Khan
                </span>
              </motion.h1>
              <motion.p 
                className="text-2xl md:text-3xl text-gray-600 mb-8 font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {data.personalInfo.subtitle}
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 mb-10 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I combine the power of social media marketing with cutting-edge IT solutions 
                to help businesses thrive in the digital world. From building stunning websites 
                to creating viral social campaigns, I've got you covered.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className="theme-gradient text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faRocket} />
                  Start Your Project
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("portfolio")}
                  className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faEye} />
                  View My Work
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Professional Photo/Illustration */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="aspect-square rounded-3xl overflow-hidden theme-gradient p-1">
                    <div className="w-full h-full bg-white rounded-3xl flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-32 h-32 mx-auto mb-6 theme-gradient rounded-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faUser} className="text-4xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Sara Khan</h3>
                        <p className="text-gray-600 mb-4">Digital Marketing & IT Expert</p>
                        <div className="flex justify-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faBullhorn} className="text-blue-600" />
                          </div>
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCode} className="text-purple-600" />
                          </div>
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faServer} className="text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FontAwesomeIcon icon={faReact} className="text-2xl text-white" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -right-4 w-20 h-20 bg-slate-600 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-2xl text-white" />
                </motion.div>
                <motion.div
                  className="absolute top-1/2 -left-8 w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center shadow-lg"
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <FontAwesomeIcon icon={faDatabase} className="text-xl text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold theme-gradient-text">150+</div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold theme-gradient-text">4+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold theme-gradient-text">200+</div>
              <div className="text-gray-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold theme-gradient-text">99%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Sara Khan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate digital expert who bridges the gap between creative marketing and technical excellence
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Where Creativity Meets Technology
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                With over 4 years of experience in digital marketing and IT solutions, I've helped 150+ businesses 
                transform their digital presence. My unique approach combines data-driven marketing strategies 
                with robust technical implementations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether you need a viral social media campaign, a custom web application, or complete IT infrastructure 
                management, I bring both the creative vision and technical expertise to make it happen.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-16 h-16 theme-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faBullhorn} className="text-2xl text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Marketing Expert</h4>
                  <p className="text-sm text-gray-600">Social media strategies that drive real results</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="w-16 h-16 theme-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faCode} className="text-2xl text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Tech Specialist</h4>
                  <p className="text-sm text-gray-600">Custom solutions built with modern technologies</p>
                </div>
              </div>

              <motion.button
                onClick={() => scrollToSection("contact")}
                className="theme-gradient text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faHandshake} />
                Let's Work Together
              </motion.button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">My Expertise</h4>
                <div className="space-y-4">
                  {[
                    { skill: "Social Media Marketing", level: 95 },
                    { skill: "Web Development", level: 90 },
                    { skill: "IT Solutions", level: 85 },
                    { skill: "Digital Strategy", level: 92 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-700">{item.skill}</span>
                        <span className="text-gray-600">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="h-2 theme-gradient rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Services & Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From social media marketing to custom web development and IT support - I offer comprehensive digital solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon icon={service.icon} className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Portfolio & Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real projects, real results - see how I've helped businesses transform their digital presence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="theme-gradient-text font-bold text-lg mb-4">{item.results}</div>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Client Reviews
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what my clients say about working with me
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-xl mr-1" />
                    ))}
                  </div>
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-blue-500 mb-6" />
                  <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
                   {testimonials[currentTestimonial].text}
                  </p>
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className="text-left">
                      <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-600">{testimonials[currentTestimonial].company}</div>
                      <div className="text-sm text-blue-600 font-medium">{testimonials[currentTestimonial].service}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pricing Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect package for your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  plan.popular ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.color} text-white hover:scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss how I can help transform your digital presence and grow your business
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 theme-gradient rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">{data.personalInfo.email}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 theme-gradient rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faPhone} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">{data.personalInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 theme-gradient rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faLocationDot} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-gray-300">{data.personalInfo.location}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${data.personalInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-gradient text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                  WhatsApp Me
                </a>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faEye} />
                  View Pricing
                </button>
              </div>
            </motion.div>

            {/* Quote Request Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 text-gray-900"
            >
              <div className="flex items-center mb-6">
                <FontAwesomeIcon icon={faComments} className="text-2xl text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold">Get Your Free Quote</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    <p className="text-sm font-medium">{submitStatus.message}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faCog} className="mr-2" />
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      <option value="social-media">Social Media Marketing</option>
                      <option value="web-development">Website Development</option>
                      <option value="it-support">IT Support & Solutions</option>
                      <option value="paid-ads">Paid Advertising</option>
                      <option value="full-package">Complete Digital Package</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select budget</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faComments} className="mr-2" />
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project goals, timeline, and any specific requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "theme-gradient text-white hover:scale-105"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={isSubmitting ? "animate-pulse" : ""}
                  />
                  {isSubmitting ? "Sending Quote Request..." : "Get My Free Quote"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold theme-gradient-text mb-4">
                Sara Khan
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Digital Marketing & IT Solutions Expert helping businesses thrive in the digital world 
                through creative strategies and technical excellence.
              </p>
              <div className="flex space-x-4">
                <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-300">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-300">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#services" className="hover:text-white transition-colors duration-300">Social Media Marketing</a></li>
                <li><a href="#services" className="hover:text-white transition-colors duration-300">Website Development</a></li>
                <li><a href="#services" className="hover:text-white transition-colors duration-300">IT Support</a></li>
                <li><a href="#services" className="hover:text-white transition-colors duration-300">Paid Advertising</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors duration-300">Portfolio</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sara Khan. All rights reserved. Built with ❤️ for growing businesses.</p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <a
        href={`https://wa.me/${data.personalInfo.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 z-50 flex items-center justify-center hover:scale-110 group"
        aria-label="Contact via WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with Sara!
        </span>
      </a>
    </div>
  );
}
