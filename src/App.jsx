import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight, Menu, X,
  Code2, Server, Database, Cloud, Globe, Terminal, Cpu, Braces,
  ChevronDown, Monitor
} from 'lucide-react';

import Scene3D from './components/Scene3D';
import { FadeIn, StaggerContainer, StaggerItem, MagneticButton } from './components/Animations';
import profilePic from './assets/profile-pic.png';

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
    <section id="experience" className="py-20 sm:py-32 relative px-4">
      <div className="container mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12 sm:mb-16">
            <span className="text-cyan-500 font-mono">01.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Experience</h2>
            <div className="flex-grow h-px bg-gray-800" />
          </div>
        </FadeIn>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <motion.div
                className="relative p-4 sm:p-6 md:p-8 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-cyan-500/50 transition-all group"
                whileHover={{ x: 10 }}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-4 text-gray-500 font-mono text-xs sm:text-sm">~/career/{exp.company.toLowerCase().replace(' ', '-')}</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.title}</h3>
                    <div className="text-purple-400 font-mono text-sm sm:text-base">@ {exp.company}</div>
                  </div>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 text-xs sm:text-sm font-mono">
                    {exp.period}
                  </span>
                </div>

                <p className="text-gray-400 mb-6 text-sm sm:text-base">{exp.description}</p>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-xs sm:text-sm font-mono text-gray-500 uppercase mb-3 sm:mb-4">// Key Achievements</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 sm:gap-3 text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-cyan-500 mt-1">▹</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-mono text-gray-500 uppercase mb-3 sm:mb-4">// Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 bg-gray-800 rounded text-gray-400 text-xs sm:text-sm font-mono hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
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
const ProjectsSection = () => {
  const projects = [
    {
      title: 'AI Resume Hunter',
      description: 'Advanced recruiting system with Google Vertex AI. OCR + NLP for semantic matching.',
      tech: ['Vertex AI', 'Python', 'Django', 'Docker'],
      link: 'https://github.com/vishwaskv362/AI-Resume-Hunter',
      icon: Cpu,
    },
    {
      title: 'E-Comm Microservice',
      description: 'Scalable FastAPI backend with PostgreSQL. Built for high-volume transactions.',
      tech: ['FastAPI', 'PostgreSQL', 'JWT', 'Docker'],
      link: 'https://github.com/vishwaskv362/ecommerce_fast_api',
      icon: Database,
    },
    {
      title: 'URL Shortener',
      description: 'Flask URL shortening with analytics. Tracks clicks, geo, and referrers.',
      tech: ['Flask', 'PostgreSQL', 'Docker', 'Analytics'],
      link: 'https://github.com/vishwaskv362/url-shortener',
      icon: Globe,
    },
    {
      title: 'Task Manager API',
      description: 'Comprehensive REST API with auth. Modern Python with uv package manager.',
      tech: ['Flask', 'SQLite', 'REST API', 'Auth'],
      link: 'https://github.com/vishwaskv362/flask-task-manager-api',
      icon: Braces,
    },
  ];

  return (
    <section id="projects" className="py-20 sm:py-32 relative px-4">
      <div className="container mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12 sm:mb-16">
            <span className="text-cyan-500 font-mono">02.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Projects</h2>
            <div className="flex-grow h-px bg-gray-800" />
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
                whileHover={{ y: -5 }}
              >
                <div className="h-full p-4 sm:p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-cyan-500/50 transition-all">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <project.icon size={24} />
                    </div>
                    <ExternalLink className="text-gray-600 group-hover:text-cyan-400 transition-colors" size={20} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-gray-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
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
    <section id="skills" className="py-20 sm:py-32 relative px-4">
      <div className="container mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12 sm:mb-16">
            <span className="text-cyan-500 font-mono">03.</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Skills</h2>
            <div className="flex-grow h-px bg-gray-800" />
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="p-4 sm:p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-cyan-500/30 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                    <category.icon className="text-cyan-400" size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white font-mono">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-1 bg-gray-800 rounded text-gray-400 text-xs sm:text-sm font-mono hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 sm:py-32 relative px-4">
      <div className="container mx-auto">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-cyan-500 font-mono text-sm sm:text-base">04. What's Next?</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mt-4 mb-6">Get In Touch</h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <a
                  href="mailto:vishwas.kv362@gmail.com"
                  className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-500 text-cyan-400 rounded font-mono hover:bg-cyan-500/10 transition-all"
                >
                  <Mail size={20} />
                  Send Message
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://linkedin.com/in/vishwaskv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded text-white font-mono"
                >
                  <Linkedin size={20} />
                  Connect
                </a>
              </MagneticButton>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 sm:gap-6 mt-12 sm:mt-16">
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
                  className="p-3 sm:p-4 border border-gray-800 rounded-lg text-gray-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <social.icon size={24} />
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
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none z-[1]" />

      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-[2]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

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
