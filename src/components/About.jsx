import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sami from "../assets/sami.jpg";

function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      [titleRef.current, introRef.current],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.5,
        ease: "power3.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
        },
      }
    );

    starsRef.current.forEach((star, i) => {
      gsap.to(star, {
        x: (i % 2 === 0 ? 1 : -1) * (50 + i * 10),
        y: (i % 2 === 0 ? 1 : -1) * (30 + i * 5),
        rotate: 360,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative bg-gradient-to-b from-black to-[#9a74cf50] flex items-center"
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (starsRef.current[i] = el)}
            className="absolute rounded-full bg-white"
            style={{
              width: `${6 + i * 2}px`,
              height: `${6 + i * 2}px`,
              opacity: 0.3 + Math.random(),
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 ref={titleRef} className="text-5xl font-bold text-white mb-6">
          About Me
        </h1>

        <div
          ref={introRef}
          className="flex flex-col md:flex-row items-center gap-10 px-6 w-full"
        >
          <p className="text-purple-200 text-lg max-w-xl">
            Hi — I'm Sami, a React developer focused on speed and clean UI.
            I build apps using React, Tailwind and modern JS, making sure
            everything feels fast and polished.
          </p>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-xl opacity-40 group-hover:opacity-80 transition-all duration-500"></div>

            <img
              src={sami}
              alt="Sami"
              className="relative md:h-[27rem] h-[20rem] rounded-xl shadow-xl object-cover transition-all duration-500 group-hover:scale-105 group-hover:rotate-[-1.5deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
