import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Cpu, 
  Code, 
  Database, 
  Server, 
  Terminal, 
  Globe, 
  Layers,
  Activity,
  Lock,
  ExternalLink,
  Cloud // Added missing import
} from 'lucide-react';

// --- CYBER CURSOR COMPONENT ---
const CyberCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Efficient hover check
      const target = e.target;
      const isClickable = target.matches('a, button, input, textarea, [role="button"]') || 
                          target.closest('a, button');

      // Direct DOM updates for performance
      if (cursorRef.current) {
        const scale = isClickable ? 1.5 : 1;
        cursorRef.current.style.transform = `translate(${clientX - 16}px, ${clientY - 16}px) scale(${scale})`;
        
        if (isClickable) {
          cursorRef.current.classList.add('bg-cyan-500/10');
        } else {
          cursorRef.current.classList.remove('bg-cyan-500/10');
        }
      }
      
      if (dotRef.current) {
        // Inner dot is instant (no lag)
        dotRef.current.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return createPortal(
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500 rounded-full pointer-events-none z-[9999] transition-all duration-100 ease-out mix-blend-difference"
      >
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[9999]"
      ></div>
    </>,
    document.body
  );
};

// --- HACKER TEXT COMPONENT ---
const HackerText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  const scramble = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className={`cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
};

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`perspective-1000 ${className}`}
      onMouseMove={(e) => { setIsHovered(true); handleMouseMove(e); }}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="transition-all duration-100 ease-out transform-style-3d w-full h-full"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono selection:bg-cyan-500/30 perspective-origin-center perspective-1000">
      <CyberCursor />
      
      {/* --- ANIMATED BACKGROUND GRID --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Moving Grid Floor */}
        <div className="absolute bottom-0 w-full h-[50vh] bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-30 animate-grid-flow"></div>
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 rounded-full blur-[100px]"></div>
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[size:100%_2px,3px_100%] pointer-events-none"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyan-900/50 py-4' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-purple-500 animate-pulse">&lt;</span>
            <span className="text-white text-shadow-neon">VKV_SYSTEMS</span>
            <span className="text-purple-500 animate-pulse">/&gt;</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest">
             {['Core', 'Modules', 'Deployments'].map((item) => (
               <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors hover:text-shadow-neon uppercase">
                 <HackerText text={item} />
               </a>
             ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        
        {/* --- HERO SECTION --- */}
        <section id="core" className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-16 mb-32">
          
          {/* Text Content */}
          <div className={`space-y-6 lg:w-1/2 transform transition-all duration-1000 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="inline-block px-4 py-2 border border-cyan-500/30 bg-cyan-950/30 rounded text-cyan-400 font-mono text-xs tracking-widest mb-4">
              <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75 mr-2"></span>
              SYSTEM ONLINE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tighter mix-blend-screen mb-4">
              <span className="glitch-wrapper" data-text="VISHWAS">VISHWAS</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-gradient">K V</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-cyan-500/80 font-mono border-l-4 border-purple-500 pl-4">
              Full Stack Engineer & <br/> Cloud Architect
            </h2>
            
            <p className="text-slate-400 max-w-lg leading-relaxed text-lg">
              Executing high-performance backend logic. <br/>
              Orchestrating scalable cloud infrastructure. <br/>
              <span className="text-purple-400">Transforming data into digital reality.</span>
            </p>

            <div className="flex gap-6 pt-4">
              <button onClick={() => window.open('https://linkedin.com', '_blank')} className="group relative px-8 py-3 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500/20 transition-all overflow-hidden">
                <div className="absolute inset-0 w-0 bg-cyan-500 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                <span className="relative flex items-center gap-3 text-cyan-400 font-bold tracking-wider group-hover:text-white">
                  <Linkedin size={18} /> CONNECT
                </span>
              </button>
              <button onClick={() => window.open('https://github.com', '_blank')} className="group relative px-8 py-3 bg-purple-500/10 border border-purple-500/50 hover:bg-purple-500/20 transition-all">
                 <span className="relative flex items-center gap-3 text-purple-400 font-bold tracking-wider group-hover:text-white">
                  <Github size={18} /> GITHUB
                </span>
              </button>
            </div>
          </div>

          {/* 3D Floating Profile Card */}
          <div className={`lg:w-1/2 flex justify-center transform transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <TiltCard className="w-80 h-96 md:w-96 md:h-[500px]">
              <div className="relative w-full h-full bg-black border border-cyan-500/30 rounded-xl overflow-hidden group shadow-[0_0_50px_rgba(8,145,178,0.2)] flex items-center justify-center">
                
                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 z-20 pointer-events-none group-hover:opacity-75 transition-opacity"></div>
                
                {/* Tech Ring Animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-dashed border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite] z-0 opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dotted border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse] z-0 opacity-50"></div>

                {/* Image */}
                <img 
                  src="/profile-pic.png"  
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://ui-avatars.com/api/?name=Vishwas+K+V&background=000&color=22d3ee&size=512";
                  }}
                  alt="Profile"
                  className="relative z-10 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />

                {/* Data Points */}
                <div className="absolute bottom-6 left-6 z-30">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-1">
                    <Activity size={12} className="animate-pulse" />
                    STATUS: ACTIVE
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tighter">
                    LVL. 3 ENGINEER
                  </div>
                </div>
                
                {/* Floating Elements (Simulated Z-Depth) */}
                <div className="absolute top-6 right-6 z-30 transform translate-z-10">
                  <Cpu className="text-cyan-400 animate-pulse" size={32} />
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* --- EXPERIENCE "MODULES" --- */}
        <section id="modules" className="mb-32">
          <div className="flex items-end gap-4 mb-16 border-b border-cyan-900/50 pb-4">
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              EXPERIENCE_LOG
            </h2>
            <span className="text-purple-500 font-mono text-xl mb-2 animate-pulse">/// READ_ONLY</span>
          </div>

          <div className="space-y-12">
            {/* Job Node 1 */}
            <TiltCard>
              <div className="relative bg-slate-900/40 border-l-4 border-cyan-500 p-8 md:p-12 backdrop-blur-sm hover:bg-slate-900/60 transition-colors group">
                <div className="absolute -right-4 -top-4 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-xl group-hover:border-cyan-400 transition-colors"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">Software Engineer</h3>
                    <div className="flex items-center gap-2 text-purple-400 font-mono">
                      <Server size={16} />
                      <span>WELLS FARGO</span>
                    </div>
                  </div>
                  <div className="px-4 py-1 bg-cyan-950/50 border border-cyan-500/30 rounded text-cyan-300 font-mono text-sm mt-4 md:mt-0">
                    2022 - PRESENT
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 text-slate-300 leading-relaxed space-y-4 font-sans">
                    <p>
                      Spearheading the architecture of the internal Model Risk Management platform. Deployed critical microservices handling sensitive financial data.
                    </p>
                    <ul className="space-y-2 list-none">
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-500 mt-1">»</span>
                        <span>Optimized API latency by <strong className="text-white">400% (8s → 2s)</strong> via Redis caching & query tuning.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-500 mt-1">»</span>
                        <span>Engineered PySpark pipelines for ETL of economic data from FRED/NetApp.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-500 mt-1">»</span>
                        <span>Integrated Google Gemini (GenAI) for automated document summarization.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-6 rounded border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Tech Matrix</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Django', 'FastAPI', 'React', 'Kafka', 'Kubernetes', 'GCP'].map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-cyan-900/20 text-cyan-400 border border-cyan-900/50 rounded hover:bg-cyan-500/20 cursor-default transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Job Node 2 */}
            <TiltCard>
              <div className="relative bg-slate-900/40 border-l-4 border-purple-600 p-8 md:p-12 backdrop-blur-sm hover:bg-slate-900/60 transition-colors group">
                <div className="absolute -left-1 -bottom-1 w-4 h-4 bg-purple-600"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">DevOps Engineer Intern</h3>
                    <div className="flex items-center gap-2 text-purple-400 font-mono">
                      <Cloud size={16} />
                      <span>HITACHI VANTARA</span>
                    </div>
                  </div>
                  <div className="px-4 py-1 bg-purple-950/50 border border-purple-500/30 rounded text-purple-300 font-mono text-sm mt-4 md:mt-0">
                    JAN 2022 - JUL 2022
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6 font-sans max-w-3xl">
                  Orchestrated automated deployment pipelines (CI/CD) for microservices. Managed Azure Kubernetes Service (AKS) clusters and implemented OAuth2 security layers using Keycloak.
                </p>
                  
                <div className="flex flex-wrap gap-3">
                   {['Azure DevOps', 'Docker', 'Keycloak', 'Terraform', 'AKS'].map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-purple-900/20 text-purple-400 border border-purple-900/50 rounded">
                      <Terminal size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* --- PROJECTS "DEPLOYMENTS" --- */}
        <section id="deployments" className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-widest text-center">
              PROJECT_DEPLOYMENTS
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Project 1 */}
            <TiltCard className="h-full">
              <div className="h-full bg-black border border-slate-800 relative overflow-hidden group rounded-xl">
                <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
                <div className="p-8 relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <Cpu className="text-cyan-400" size={32} />
                    </div>
                    <ExternalLink className="text-slate-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">AI Resume Hunter</h3>
                  <p className="text-slate-400 mb-8 flex-grow font-sans text-sm leading-relaxed">
                    Advanced recruiting system utilizing Google Vertex AI. Performs OCR on resumes and matches them against job descriptions using NLP for semantic relevance scoring.
                  </p>

                  <div className="space-y-4">
                    <div className="h-1 w-full bg-slate-900 rounded overflow-hidden">
                      <div className="h-full bg-cyan-500 w-3/4 animate-pulse"></div>
                    </div>
                    <div className="flex gap-4 text-xs font-mono text-cyan-600">
                      <span>VERTEX_AI</span>
                      <span>PYTHON_DJANGO</span>
                      <span>DOCKER</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Project 2 */}
            <TiltCard className="h-full">
              <div className="h-full bg-black border border-slate-800 relative overflow-hidden group rounded-xl">
                <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
                <div className="p-8 relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <Database className="text-purple-400" size={32} />
                    </div>
                    <ExternalLink className="text-slate-600 group-hover:text-white transition-colors" size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">E-Comm Microservice</h3>
                  <p className="text-slate-400 mb-8 flex-grow font-sans text-sm leading-relaxed">
                    Scalable backend architecture for high-volume retail. Built with FastAPI for asynchronous performance, managed via Docker Compose with PostgreSQL persistence.
                  </p>

                  <div className="space-y-4">
                    <div className="h-1 w-full bg-slate-900 rounded overflow-hidden">
                      <div className="h-full bg-purple-500 w-1/2 animate-pulse"></div>
                    </div>
                    <div className="flex gap-4 text-xs font-mono text-purple-600">
                      <span>FAST_API</span>
                      <span>POSTGRES</span>
                      <span>JWT_AUTH</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* --- SKILLS GRID (3D CUBES CONCEPT) --- */}
        <section className="mb-32">
           <h2 className="text-2xl font-bold text-slate-500 mb-8 text-center tracking-[0.5em]">SYSTEM_CAPABILITIES</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Python', icon: <Code /> },
                { name: 'React', icon: <Globe /> },
                { name: 'AWS / GCP', icon: <Cloud /> },
                { name: 'Docker', icon: <Layers /> },
                { name: 'SQL / NoSQL', icon: <Database /> },
                { name: 'Kafka', icon: <Activity /> },
                { name: 'Security', icon: <Lock /> },
                { name: 'DevOps', icon: <Terminal /> },
              ].map((skill, idx) => (
                <div key={idx} className="bg-slate-900/30 border border-slate-800 p-6 flex flex-col items-center justify-center gap-4 hover:bg-cyan-900/20 hover:border-cyan-500/50 transition-all duration-300 group">
                   <div className="text-slate-500 group-hover:text-cyan-400 transition-colors group-hover:scale-110 transform duration-300">
                     {skill.icon}
                   </div>
                   <span className="font-bold text-slate-400 group-hover:text-white">{skill.name}</span>
                </div>
              ))}
           </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="border-t border-cyan-900/30 pt-12 pb-6 text-center relative overflow-hidden">
          <div className="relative z-10">
             <div className="flex justify-center gap-8 mb-8">
               <a href="mailto:vishwas.kv362@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                 <Mail size={24} />
               </a>
               <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                 <Linkedin size={24} />
               </a>
               <a href="#" className="text-slate-400 hover:text-white transition-colors">
                 <Github size={24} />
               </a>
             </div>
             <p className="text-slate-600 text-sm font-mono">
               SYSTEM ARCHITECT: VISHWAS K V <br/>
               <span className="text-cyan-900">© 2025 ALL RIGHTS RESERVED</span>
             </p>
          </div>
        </footer>

      </main>
      
      <style jsx global>{`
        @keyframes grid-flow {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(4rem); }
        }
        .animate-grid-flow {
          animation: grid-flow 2s linear infinite;
        }
        .text-shadow-neon {
          text-shadow: 0 0 5px rgba(6,182,212,0.5), 0 0 20px rgba(6,182,212,0.3);
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .translate-z-10 {
          transform: translateZ(20px);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;