import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import React, { useRef, useEffect } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { imgapi } from "../imgapi/img";
// Better project data structure
const projects = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    title: "Web Dashboard",
    description: "A modern analytics dashboard with real-time data visualization and responsive design.",
    tech: ["React", "Tailwind", "Chart.js"],
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    title: "Mobile App",
    description: "Cross-platform mobile application with seamless user experience and native performance.",
    tech: ["React Native", "Node.js", "MongoDB"],
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management.",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
    title: "Portfolio Design",
    description: "Clean and modern portfolio website with smooth animations and dark mode support.",
    tech: ["React", "Framer Motion", "GSAP"],
    liveLink: "#",
    githubLink: "#"
  },
];

function Project() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger card animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { 
              y: 100, 
              opacity: 0,
              scale: 0.95
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.15
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="project"
      className="relative py-20 bg-black min-h-screen"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Featured <span className="text-violet-500">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and passion for creating exceptional digital experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {imgapi.map((project,index) => (
            <div
              key={project.id}
              ref={addToRefs}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Links on image hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full transition-colors duration-300"
                    aria-label="View live project"
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-300"
                    aria-label="View GitHub repository"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm md:text-base mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs md:text-sm hover:bg-cyan-700 bg-violet-600/20 text-violet-300 rounded-full border border-violet-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105"
          >
            View All Projects
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Project;