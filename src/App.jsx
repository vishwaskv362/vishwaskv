import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight, Menu, X,
  Code2, Server, Database, Cloud, Globe, Terminal, Cpu, Braces,
  ChevronDown, Monitor
} from 'lucide-react';

import Scene3D from './components/Scene3D';
import { FadeIn, StaggerContainer, StaggerItem, MagneticButton } from './components/Animations';
import profilePic from './assets/profile-pic.png';

// Custom Cursor with glow trail
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-cyan-400 opacity-80" />
      </motion.div>
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 8,
          translateY: 8,
        }}
      >
        <div className="w-full h-full rounded-full bg-cyan-400 opacity-50 blur-sm" />
      </motion.div>
    </>
  );
};

// Tech Loading Screen
const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative">
      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
        animate={{ y: [-100, 100] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{ height: '200%', top: '-50%' }}
      />
      
      <motion.div
        className="relative px-8 py-6 border border-cyan-500/50 bg-black/80"
        animate={{ borderColor: ['rgba(0,245,255,0.5)', 'rgba(255,0,255,0.5)', 'rgba(0,245,255,0.5)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-3 h-3 bg-cyan-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="text-cyan-400 font-mono text-lg tracking-widest">INITIALIZING</span>
        </div>
        <motion.div
          className="h-1 bg-gradient-to-r from-cyan-500 to-magenta-500 mt-3"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2 }}
        />
      </motion.div>
    </div>
  </motion.div>
);

// Glowing Text Component
const GlowText = ({ children, className = "" }) => (
  <span className={`relative ${className}`}>
    <span className="absolute inset-0 blur-lg bg-gradient-to-r from-cyan-400 to-purple-500 opacity-50" />
    <span className="relative">{children}</span>
  </span>
);

// Navbar with tech design
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-cyan-500/20' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl sm:text-2xl font-bold font-mono"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white">&lt;</span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">VKV</span>
            <span className="text-white">/&gt;</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-3 lg:px-4 py-2 text-gray-400 hover:text-cyan-400 text-sm font-mono transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">[</span>
                {item}
                <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">]</span>
              </motion.a>
            ))}
            <MagneticButton>
              <a
                href="mailto:vishwas.kv362@gmail.com"
                className="ml-2 lg:ml-4 px-4 lg:px-6 py-2 border border-cyan-500 text-cyan-400 rounded font-mono text-sm hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                &gt; Contact_
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/98 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl font-mono text-gray-300 hover:text-cyan-400 transition-colors"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-cyan-500 mr-2">{`0${index + 1}.`}</span>
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="mailto:vishwas.kv362@gmail.com"
                className="mt-4 px-8 py-3 border-2 border-cyan-500 text-cyan-400 rounded font-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                &gt; Contact_
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section with tech theme
const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ['Full Stack Engineer', 'Cloud Architect', 'Backend Specialist', 'DevOps Engineer'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-4 sm:left-10 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
        <div className="absolute top-1/3 right-4 sm:right-10 w-px h-48 bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Content */}
        <div className="lg:w-1/2 text-center lg:text-left z-10">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-xs sm:text-sm font-mono">STATUS: AVAILABLE FOR WORK</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="font-mono text-gray-500 text-sm sm:text-base mb-2">
              <span className="text-gray-600"># Hello, World! I am</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Vishwas K V
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="h-12 sm:h-16 mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRole}
                  className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-mono"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-cyan-500">&gt;&gt;&gt;</span> {roles[currentRole]}
                  <span className="animate-pulse">_</span>
                </motion.h2>
              </AnimatePresence>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="text-gray-500 text-base sm:text-lg max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0 font-mono">
              <div className="mb-1">
                <span className="text-purple-400">class</span> <span className="text-cyan-400">Developer</span>:
              </div>
              <div className="sm:ml-4">
                <span className="text-purple-400">def</span> <span className="text-yellow-400">__init__</span>(<span className="text-orange-400">self</span>):
              </div>
              <div className="sm:ml-8">
                <span className="text-orange-400">self</span>.passion = <span className="text-green-400">"building scalable systems"</span>
              </div>
              <div className="sm:ml-8">
                <span className="text-orange-400">self</span>.expertise = <span className="text-green-400">"cloud & backend"</span>
              </div>
              <div className="sm:ml-8">
                <span className="text-orange-400">self</span>.goal = <span className="text-green-400">"transform ideas into reality"</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MagneticButton>
                <a
                  href="https://linkedin.com/in/vishwaskv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded text-white font-mono text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <Linkedin size={20} />
                  connect()
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://github.com/vishwaskv362"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 rounded text-gray-300 font-mono text-sm sm:text-base hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                >
                  <Github size={20} />
                  view_code()
                </a>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        {/* Profile Image */}
        <FadeIn delay={0.4} direction="left" className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <div className="relative">
            {/* Tech frame */}
            <motion.div
              className="absolute -inset-4 sm:-inset-6 border border-cyan-500/30 rounded-lg"
              animate={{ rotate: [0, 1, 0, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-8 sm:-inset-12 border border-purple-500/20 rounded-lg"
              animate={{ rotate: [0, -1, 0, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Scanning effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg" />
              <div className="relative w-full h-full bg-black/50 rounded-lg border border-gray-800 overflow-hidden">
                <img
                  src={profilePic}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://ui-avatars.com/api/?name=Vishwas+K+V&background=0a0a0a&color=00f5ff&size=512";
                  }}
                  alt="Vishwas K V"
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                />

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-500" />

                {/* Status badge */}
                <motion.div
                  className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded font-mono text-xs"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-green-400">ONLINE</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-cyan-500" size={32} />
      </motion.div>
    </section>
  );
};

// Experience Section with tech cards
const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Wells Fargo',
      period: '2022 - Present',
      description: 'Spearheading the architecture of the internal Model Risk Management platform. Deployed critical microservices handling sensitive financial data.',
      achievements: [
        'Optimized API latency by 400% (8s → 2s) via Redis caching',
        'Engineered PySpark pipelines for FRED/NetApp data ETL',
        'Integrated Google Gemini for document summarization',
      ],
      tech: ['Django', 'FastAPI', 'React', 'Kafka', 'K8s', 'GCP'],
    },
    {
      title: 'DevOps Engineer Intern',
      company: 'Hitachi Vantara',
      period: 'Jan - Jul 2022',
      description: 'Orchestrated automated CI/CD pipelines. Managed Azure Kubernetes Service clusters with OAuth2 security.',
      achievements: [
        'Built CI/CD pipelines reducing deployment time by 60%',
        'Implemented Keycloak OAuth2 authentication',
        'Managed container orchestration with AKS',
      ],
      tech: ['Azure DevOps', 'Docker', 'Keycloak', 'Terraform', 'AKS'],
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-32 relative px-4">
      <div className="container mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
            <span className="text-cyan-500 font-mono text-sm sm:text-base">01.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Experience</h2>
            <div className="flex-grow h-px bg-gray-800" />
          </div>
        </FadeIn>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <motion.div
                className="relative p-4 sm:p-6 md:p-8 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-cyan-500/50 transition-all group"
                whileHover={{ x: 5 }}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-800">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-2 sm:ml-4 text-gray-500 font-mono text-[10px] sm:text-xs md:text-sm truncate">~/career/{exp.company.toLowerCase().replace(' ', '-')}</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.title}</h3>
                    <div className="text-purple-400 font-mono text-xs sm:text-sm md:text-base">@ {exp.company}</div>
                  </div>
                  <span className="px-2 sm:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 text-[10px] sm:text-xs md:text-sm font-mono whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">{exp.description}</p>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase mb-2 sm:mb-3 md:mb-4">// Key Achievements</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-cyan-500 mt-0.5 sm:mt-1">▹</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase mb-2 sm:mb-3 md:mb-4 mt-4 md:mt-0">// Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 sm:py-1 bg-gray-800 rounded text-gray-400 text-[10px] sm:text-xs md:text-sm font-mono hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
// Terminal Window Component for Projects
const TerminalWindow = ({ project, index, isActive, onActivate }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [readyToOpen, setReadyToOpen] = useState(false);
  const terminalRef = useRef(null);

  const terminalContent = `$ cat ${project.folder}/README.md

# ${project.title}
${project.description}

$ ls tech/
${project.tech.join('  ')}

$ open --github`;

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isActive && showContent && readyToOpen) {
        window.open(project.link, '_blank');
      }
    };

    if (isActive) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, showContent, readyToOpen, project.link]);

  useEffect(() => {
    if (isActive && !showContent) {
      setIsTyping(true);
      setReadyToOpen(false);
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < terminalContent.length) {
          setDisplayedText(terminalContent.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          setShowContent(true);
          // Small delay before allowing Enter to open
          setTimeout(() => setReadyToOpen(true), 300);
          clearInterval(typeInterval);
        }
      }, 15);
      return () => clearInterval(typeInterval);
    }
  }, [isActive]);

  // Focus management for keyboard events
  useEffect(() => {
    if (isActive && terminalRef.current) {
      terminalRef.current.focus();
    }
  }, [isActive]);

  return (
    <motion.div
      ref={terminalRef}
      tabIndex={0}
      className={`relative group cursor-pointer outline-none ${isActive ? 'z-20' : 'z-10'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (!isActive) {
            onActivate();
          } else if (showContent && readyToOpen) {
            window.open(project.link, '_blank');
          }
        }
      }}
    >
      {/* Terminal Window */}
      <div className={`bg-gray-950 rounded-lg border ${isActive ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20' : 'border-gray-800'} overflow-hidden transition-all duration-300`}>
        
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2">
            {/* Traffic lights */}
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
            {/* Tab */}
            <div className="ml-2 sm:ml-4 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-950 rounded-t text-[10px] sm:text-xs font-mono text-gray-400">
              <Terminal size={10} className="text-cyan-500 sm:w-3 sm:h-3" />
              <span className="truncate max-w-[80px] sm:max-w-none">{project.folder}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-gray-600 font-mono">zsh</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm min-h-[180px] sm:min-h-[200px] relative">
          {/* Command prompt header */}
          <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mb-2 flex-wrap">
            <span className="text-green-500">➜</span>
            <span className="text-cyan-500">~/projects</span>
            <span className="text-yellow-500 hidden sm:inline">git:(main)</span>
            <span className="text-gray-600 hidden sm:inline">✗</span>
          </div>

          {isActive || showContent ? (
            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {displayedText || terminalContent}
              {isTyping && <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse" />}
            </pre>
          ) : (
            <div className="text-gray-500">
              <span className="text-cyan-400">$</span> ls {project.folder}/
              <div className="mt-2 text-gray-400">
                README.md  src/  requirements.txt  docker-compose.yml
              </div>
              <div className="mt-4 text-gray-600 text-xs">
                Click to explore...
              </div>
            </div>
          )}

          {/* Blinking cursor at end */}
          {!isTyping && (isActive || showContent) && (
            <div className="flex items-center gap-1 sm:gap-2 mt-4 text-gray-500 text-xs sm:text-sm">
              <span className="text-green-500">➜</span>
              <span className="text-cyan-500 truncate">~/{project.folder}</span>
              <motion.span 
                className="inline-block w-2 h-4 bg-cyan-500"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
          )}

          {/* Tech stack pills - shown when content is visible */}
          {(isActive || showContent) && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs border border-cyan-500/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Terminal Footer / Action Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-900/50 border-t border-gray-800 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            {readyToOpen && isActive ? (
              <motion.span 
                className="text-[10px] sm:text-xs font-mono flex items-center gap-1 flex-wrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <kbd className="px-1 sm:px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/50">↵</kbd>
                <span className="text-green-400 hidden sm:inline">to open GitHub</span>
                <span className="text-green-400 sm:hidden">open</span>
              </motion.span>
            ) : (
              <span className="text-[10px] sm:text-xs text-gray-600 font-mono">
                <span className="text-cyan-500">tap</span> to explore
              </span>
            )}
          </div>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded text-[10px] sm:text-xs font-mono transition-colors shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span className="hidden sm:inline">view source</span>
            <span className="sm:hidden">GitHub</span>
            <ArrowUpRight size={10} className="sm:w-3 sm:h-3" />
          </motion.a>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity -z-10`} />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      title: 'AI Resume Hunter',
      folder: 'ai-resume-hunter',
      description: 'Advanced recruiting system with Google Vertex AI.\nOCR + NLP for semantic matching.',
      tech: ['Vertex AI', 'Python', 'Django', 'Docker'],
      link: 'https://github.com/vishwaskv362/AI-Resume-Hunter',
    },
    {
      title: 'E-Comm Microservice',
      folder: 'ecommerce-fastapi',
      description: 'Scalable FastAPI backend with PostgreSQL.\nBuilt for high-volume transactions.',
      tech: ['FastAPI', 'PostgreSQL', 'JWT', 'Docker'],
      link: 'https://github.com/vishwaskv362/ecommerce_fast_api',
    },
    {
      title: 'URL Shortener',
      folder: 'url-shortener',
      description: 'Flask URL shortening with analytics.\nTracks clicks, geo, and referrers.',
      tech: ['Flask', 'PostgreSQL', 'Docker', 'Analytics'],
      link: 'https://github.com/vishwaskv362/url-shortener',
    },
    {
      title: 'Task Manager API',
      folder: 'task-manager-api',
      description: 'Comprehensive REST API with auth.\nModern Python with uv package manager.',
      tech: ['Flask', 'SQLite', 'REST API', 'Auth'],
      link: 'https://github.com/vishwaskv362/flask-task-manager-api',
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-32 relative px-4">
      <div className="container mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <span className="text-cyan-500 font-mono text-sm sm:text-base">02.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Projects</h2>
            <div className="flex-grow h-px bg-gray-800" />
          </div>
          
          {/* Terminal header */}
          <div className="mb-6 sm:mb-8 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-green-500">➜</span>
              <span className="text-cyan-500">~</span>
              <span className="text-white">ls -la projects/</span>
            </div>
            <div className="mt-2 text-gray-600 text-[10px] sm:text-xs">
              total {projects.length} repositories
            </div>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <TerminalWindow
              key={index}
              project={project}
              index={index}
              isActive={activeProject === index}
              onActivate={() => setActiveProject(activeProject === index ? null : index)}
            />
          ))}
        </div>

        {/* Footer command */}
        <FadeIn delay={0.5}>
          <div className="mt-6 sm:mt-8 font-mono text-xs sm:text-sm text-center">
            <span className="text-gray-600">$ </span>
            <span className="text-gray-400">echo "More projects on </span>
            <a 
              href="https://github.com/vishwaskv362" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              GitHub
            </a>
            <span className="text-gray-400">"</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const skillCategories = [
    { title: 'Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java'], icon: Code2 },
    { title: 'Frontend', skills: ['React', 'Next.js', 'Tailwind', 'HTML/CSS'], icon: Monitor },
    { title: 'Backend', skills: ['Django', 'FastAPI', 'Flask', 'Node.js'], icon: Server },
    { title: 'Cloud', skills: ['AWS', 'GCP', 'Azure', 'Docker', 'K8s'], icon: Cloud },
    { title: 'Database', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'], icon: Database },
    { title: 'Tools', skills: ['Git', 'Kafka', 'CI/CD', 'Linux', 'Terraform'], icon: Terminal },
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-32 relative px-4">
      <div className="container mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
            <span className="text-cyan-500 font-mono text-sm sm:text-base">03.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Skills</h2>
            <div className="flex-grow h-px bg-gray-800" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {skillCategories.map((category, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="p-4 sm:p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <category.icon className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <h3 className="text-white font-medium text-sm sm:text-base">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-gray-300 bg-white/5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 relative px-4">
      <div className="container mx-auto">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center px-2">
            <span className="text-cyan-500 font-mono text-xs sm:text-sm md:text-base">04. What's Next?</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6">Get In Touch</h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <MagneticButton>
                <a
                  href="mailto:vishwas.kv362@gmail.com"
                  className="group flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-3 sm:py-4 border-2 border-cyan-500 text-cyan-400 rounded font-mono text-sm sm:text-base hover:bg-cyan-500/10 transition-all"
                >
                  <Mail size={18} className="sm:w-5 sm:h-5" />
                  <span>Send Message</span>
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://linkedin.com/in/vishwaskv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded text-white font-mono text-sm sm:text-base"
                >
                  <Linkedin size={18} className="sm:w-5 sm:h-5" />
                  <span>Connect</span>
                </a>
              </MagneticButton>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mt-10 sm:mt-12 md:mt-16">
              {[
                { icon: Github, href: 'https://github.com/vishwaskv362', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/vishwaskv', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:vishwas.kv362@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="p-2.5 sm:p-3 md:p-4 border border-gray-800 rounded-lg text-gray-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-6 sm:py-8 border-t border-gray-900">
    <div className="container mx-auto px-4 text-center">
      <p className="text-gray-600 text-xs sm:text-sm font-mono">
        <span className="text-cyan-500">&lt;</span>
        Designed & Built by Vishwas K V
        <span className="text-cyan-500">/&gt;</span>
      </p>
      <p className="text-gray-700 text-xs font-mono mt-2">
        React • Three.js • Framer Motion
      </p>
    </div>
  </footer>
);

// Main App
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden md:cursor-none">
      {/* Custom Cursor */}
      <CustomCursor />

      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none z-[1]" />

      {/* Animated grid overlay */}
      <div className="fixed inset-0 grid-pattern-animated pointer-events-none z-[2]" />

      {/* Hex pattern overlay */}
      <div className="fixed inset-0 hex-pattern opacity-30 pointer-events-none z-[2]" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default App;
