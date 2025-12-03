import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import profilePic from './assets/profile-pic.png';
import Scene3D from './components/Scene3D';
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
  GlowingOrb,
  FloatingCard,
  GradientBorderCard,
  AnimatedText,
} from './components/Animations';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Cloud,
  Terminal,
  Cpu,
  Layers,
  ArrowUpRight,
  Sparkles,
  Zap,
  Globe,
  Server,
  Braces,
  Menu,
  X,
} from 'lucide-react';

// Loading screen
const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-16 h-16 border-4 border-cyan-500/20 rounded-full" />
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" />
    </motion.div>
  </motion.div>
);

// Navbar
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
        className={`fixed w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a
            href="#"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            VKV
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
            <MagneticButton>
              <a
                href="mailto:vishwas.kv362@gmail.com"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow"
              >
                Let's Talk
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
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
            className="fixed inset-0 z-30 bg-slate-950/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl text-white font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Glowing orbs */}
      <GlowingOrb color="cyan" size="400px" className="top-20 -left-40" />
      <GlowingOrb color="purple" size="300px" className="bottom-20 -right-20" />

      <motion.div style={{ y, opacity }} className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <FadeIn delay={0.2}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="text-cyan-400" size={16} />
                <span className="text-slate-300 text-sm">Available for opportunities</span>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Vishwas
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h2 className="text-xl md:text-2xl text-slate-400 mb-6">
                Full Stack Engineer & Cloud Architect
              </h2>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-slate-500 text-lg max-w-xl mb-8 leading-relaxed">
                I craft scalable backend systems, orchestrate cloud infrastructure, and transform
                complex data into powerful digital solutions. Passionate about clean code and
                innovative technologies.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <MagneticButton>
                  <a
                    href="https://linkedin.com/in/vishwaskv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    <Linkedin size={20} />
                    Connect with me
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="https://github.com/vishwaskv362"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
                  >
                    <Github size={20} />
                    View GitHub
                  </a>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>

          {/* Profile Image */}
          <FadeIn delay={0.4} direction="left" className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
                style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500/20"
                style={{ width: '140%', height: '140%', left: '-20%', top: '-20%' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Profile card */}
              <motion.div
                className="relative w-72 h-72 md:w-96 md:h-96"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-30" />
                <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 overflow-hidden">
                  <img
                    src={profilePic}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://ui-avatars.com/api/?name=Vishwas+K+V&background=0f172a&color=22d3ee&size=512";
                    }}
                    alt="Vishwas K V"
                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status badge */}
                  <motion.div
                    className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">Open to work</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Wells Fargo',
      period: '2022 - Present',
      description: 'Spearheading the architecture of the internal Model Risk Management platform. Deployed critical microservices handling sensitive financial data.',
      achievements: [
        'Optimized API latency by 400% (8s → 2s) via Redis caching & query tuning',
        'Engineered PySpark pipelines for ETL of economic data from FRED/NetApp',
        'Integrated Google Gemini (GenAI) for automated document summarization',
      ],
      tech: ['Django', 'FastAPI', 'React', 'Kafka', 'Kubernetes', 'GCP'],
      color: 'cyan',
    },
    {
      title: 'DevOps Engineer Intern',
      company: 'Hitachi Vantara',
      period: 'Jan 2022 - Jul 2022',
      description: 'Orchestrated automated deployment pipelines (CI/CD) for microservices. Managed Azure Kubernetes Service (AKS) clusters and implemented OAuth2 security layers.',
      achievements: [
        'Built CI/CD pipelines reducing deployment time by 60%',
        'Implemented Keycloak OAuth2 for secure authentication',
        'Managed container orchestration with Kubernetes',
      ],
      tech: ['Azure DevOps', 'Docker', 'Keycloak', 'Terraform', 'AKS'],
      color: 'purple',
    },
  ];

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Experience</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </div>
        </FadeIn>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <GradientBorderCard>
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Server size={16} className={`text-${exp.color}-400`} />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <span className={`px-4 py-1 bg-${exp.color}-500/10 border border-${exp.color}-500/30 rounded-full text-${exp.color}-400 text-sm font-medium mt-4 md:mt-0`}>
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-slate-400 mb-6 leading-relaxed">{exp.description}</p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Key Achievements</h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3 text-slate-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Zap className={`text-${exp.color}-400 mt-1 flex-shrink-0`} size={16} />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className={`px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-sm hover:bg-${exp.color}-500/10 hover:border-${exp.color}-500/30 transition-colors cursor-default`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GradientBorderCard>
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
      description: 'Advanced recruiting system utilizing Google Vertex AI. Performs OCR on resumes and matches them against job descriptions using NLP for semantic relevance scoring.',
      tech: ['Vertex AI', 'Python', 'Django', 'Docker'],
      link: 'https://github.com/vishwaskv362/AI-Resume-Hunter',
      icon: Cpu,
      color: 'cyan',
    },
    {
      title: 'E-Comm Microservice',
      description: 'Scalable backend architecture for high-volume retail. Built with FastAPI for asynchronous performance, managed via Docker Compose with PostgreSQL persistence.',
      tech: ['FastAPI', 'PostgreSQL', 'JWT Auth', 'Docker'],
      link: 'https://github.com/vishwaskv362/ecommerce_fast_api',
      icon: Database,
      color: 'purple',
    },
    {
      title: 'URL Shortener & Analytics',
      description: 'Flask-powered URL shortening service with PostgreSQL backend. Tracks click analytics with comprehensive metadata including geolocation and referrer data.',
      tech: ['Flask', 'PostgreSQL', 'Docker', 'Analytics'],
      link: 'https://github.com/vishwaskv362/url-shortener',
      icon: Globe,
      color: 'emerald',
    },
    {
      title: 'Task Manager REST API',
      description: 'Comprehensive Flask REST API for task management with user authentication and SQLite persistence. Modern Python development using uv package manager.',
      tech: ['Flask', 'SQLite', 'REST API', 'Auth'],
      link: 'https://github.com/vishwaskv362/flask-task-manager-api',
      icon: Braces,
      color: 'orange',
    },
  ];

  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40 group-hover:text-cyan-400',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 hover:border-purple-500/40 group-hover:text-purple-400',
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 group-hover:text-emerald-400',
    orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/20 hover:border-orange-500/40 group-hover:text-orange-400',
  };

  return (
    <section id="projects" className="py-32 relative">
      <GlowingOrb color="purple" size="300px" className="top-40 -right-20" />

      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A collection of projects showcasing my expertise in full-stack development, cloud architecture, and AI integration.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <FloatingCard className="h-full">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${colorClasses[project.color].split(' ').slice(0, 2).join(' ')} border ${colorClasses[project.color].split(' ').slice(2, 4).join(' ')} transition-all duration-300`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-xl bg-white/5 ${colorClasses[project.color].split(' ').pop()}`}>
                        <project.icon size={28} />
                      </div>
                      <ExternalLink
                        className="text-slate-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                        size={24}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/5 rounded-md text-slate-400 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </FloatingCard>
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
    {
      title: 'Languages',
      skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java'],
      icon: Code2,
    },
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
      icon: Globe,
    },
    {
      title: 'Backend',
      skills: ['Django', 'FastAPI', 'Flask', 'Node.js', 'REST APIs'],
      icon: Server,
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
      icon: Cloud,
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
      icon: Database,
    },
    {
      title: 'Tools',
      skills: ['Git', 'Kafka', 'CI/CD', 'Linux', 'Agile'],
      icon: Terminal,
    },
  ];

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Skills & Technologies</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                    <category.icon className="text-cyan-400" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-slate-800 rounded-lg text-slate-300 text-sm hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
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
    <section id="contact" className="py-32 relative">
      <GlowingOrb color="cyan" size="400px" className="bottom-20 left-20" />

      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="text-cyan-400" size={16} />
              <span className="text-slate-300 text-sm">Get in touch</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let's Build Something{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, innovative projects, or just having a chat about technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <a
                  href="mailto:vishwas.kv362@gmail.com"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <Mail size={20} />
                  Send me an email
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://linkedin.com/in/vishwaskv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
                >
                  <Linkedin size={20} />
                  Connect on LinkedIn
                </a>
              </MagneticButton>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-16">
              {[
                { icon: Github, href: 'https://github.com/vishwaskv362', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/vishwaskv', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:vishwas.kv362@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
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
const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <p className="text-slate-500 text-sm">
          © 2025 Vishwas K V. Built with React, Three.js & Framer Motion
        </p>
      </div>
    </footer>
  );
};

// Main App
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Gradient overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950 pointer-events-none z-[1]" />

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