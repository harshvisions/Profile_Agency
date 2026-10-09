import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Layout, Smartphone, Globe, ExternalLink } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Stars, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { initialProjects, type Project } from '../data/projects';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} ref={meshRef} scale={1.5}>
        <MeshDistortMaterial 
          color="#4f46e5" 
          attach="material" 
          distort={0.5} 
          speed={2} 
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      <Sphere args={[0.2, 32, 32]} position={[2.5, 1.5, -1]}>
        <MeshDistortMaterial color="#ec4899" distort={0.2} speed={3} />
      </Sphere>
      <Sphere args={[0.3, 32, 32]} position={[-2, -1.5, 0]}>
        <MeshDistortMaterial color="#06b6d4" distort={0.3} speed={2} />
      </Sphere>
    </Float>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('agencify_projects_v2');
    if (saved) {
      let savedProjects = JSON.parse(saved);
      // Automatically add any new projects from code to the user's local storage
      const newProjects = initialProjects.filter(ip => !savedProjects.find((sp: Project) => sp.id === ip.id));
      if (newProjects.length > 0) {
        savedProjects = [...savedProjects, ...newProjects];
        localStorage.setItem('agencify_projects_v2', JSON.stringify(savedProjects));
      }
      setProjects(savedProjects);
    } else {
      setProjects(initialProjects);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white">
      {/* Hero Section with 3D Canvas */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-80">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
            <AnimatedSphere />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          </Canvas>
        </div>

        {/* Foreground Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 pointer-events-none">
          <motion.div 
            style={{ y }}
            className="flex flex-col items-center md:items-start max-w-4xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] font-black tracking-tighter text-white uppercase drop-shadow-2xl"
            >
              Building <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 italic pr-4">Digital</span> <br/>
              Futures.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-xl md:text-2xl text-gray-300 font-light max-w-2xl"
            >
              We are a premium digital agency specializing in high-performance web applications, beautiful UI/UX, and immersive 3D web experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pointer-events-auto flex gap-4"
            >
              <a href="#work" className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold inline-flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                View Our Work <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About & Stats Section */}
      <section id="about" className="py-32 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Who we are</h2>
              <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                VeloCore is more than a development shop. We are creative technologists who merge cutting-edge engineering with high-end aesthetic design to deliver scalable market solutions.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                From startup MVP architecture to enterprise digital transformation, our data-driven approach ensures your project not only looks incredible but performs perfectly.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: "7+", label: "Projects Completed" },
                { number: "99%", label: "Client Satisfaction" },
                { number: "24/7", label: "Premium Support" }
              ].map((stat, i) => (
                <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center hover:bg-[#1a1a1a] transition-colors">
                  <h3 className="text-4xl md:text-5xl font-black text-indigo-400 mb-2">{stat.number}</h3>
                  <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 relative z-10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 md:w-2/3"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tighter">Our Expertise</h2>
            <p className="text-gray-400 text-xl">We offer full-cycle development services, ensuring your vision becomes a scalable reality.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Layout, title: "UI/UX Design", desc: "Crafting beautiful, intuitive interfaces that drive conversion." },
              { icon: Code, title: "Web Development", desc: "Building blazing fast React, Next.js, and Go applications." },
              { icon: Smartphone, title: "Mobile First", desc: "Responsive, app-like experiences across all devices." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111] p-10 rounded-3xl border border-white/10 hover:border-indigo-500/50 hover:bg-[#151515] transition-all duration-300 group"
              >
                <div className="bg-indigo-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <service.icon className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wide">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="work" className="py-32 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div>
              <h2 className="text-4xl md:text-7xl font-black mb-6 text-white uppercase tracking-tighter">Selected <br/>Works</h2>
              <p className="text-gray-400 text-xl max-w-xl">A showcase of our latest digital products and client partnerships.</p>
            </div>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Scroll to explore</p>
          </motion.div>

          <div className="flex flex-col gap-24">
            {projects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group relative flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Visual Preview */}
                <div className={`w-full md:w-2/3 aspect-[16/9] rounded-3xl overflow-hidden relative bg-[#111] border border-white/10 ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                  {project.thumbnailUrl ? (
                    <img src={project.thumbnailUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" alt={project.title} />
                  ) : project.videoUrl ? (
                    <video src={project.videoUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" autoPlay loop muted playsInline />
                  ) : (
                    <div className="w-full h-full relative pointer-events-none overflow-hidden">
                      <iframe 
                        src={project.websiteUrl} 
                        className="absolute top-0 left-0 w-[400%] h-[400%] scale-[0.25] origin-top-left border-none pointer-events-none opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[0.26]" 
                        title={`${project.title} preview`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}
                  {/* Overlay Link */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm z-10 pointer-events-none">
                     <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="pointer-events-auto bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all shadow-2xl flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0">
                       Visit Project <ExternalLink className="w-5 h-5" />
                     </a>
                  </div>
                </div>

                {/* Project Details */}
                <div className={`w-full md:w-1/3 flex flex-col justify-center ${i % 2 !== 0 ? 'md:items-end md:text-right' : ''}`}>
                  <h3 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">{project.title}</h3>
                  <p className="text-xl text-gray-400 mb-8">{project.description}</p>
                  <a 
                    href={project.websiteUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 text-indigo-400 hover:text-white font-bold tracking-widest uppercase transition-colors"
                  >
                    <Globe className="w-5 h-5" /> Live Site
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 relative z-10 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-white">Ready to start?</h2>
          <p className="text-2xl text-indigo-200 mb-12">Let's build something extraordinary together.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="https://wa.me/919027105727" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#25D366] text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white hover:text-[#25D366] transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 w-full sm:w-auto justify-center group"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="group-hover:text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg> WhatsApp
            </a>
            
            <a 
              href="mailto:harsh902710@gmail.com" 
              className="bg-white text-indigo-600 px-10 py-5 rounded-full font-black text-lg hover:bg-[#EA4335] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 w-full sm:w-auto justify-center group"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
              Email Us
            </a>
          </div>
          
          <div className="mt-12 flex flex-col items-center gap-3 text-indigo-200 font-medium">
            <p className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg> 
              +91 7906215614
            </p>
            <p className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg> 
              harsh902710@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
