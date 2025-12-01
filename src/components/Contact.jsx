import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
function Contact() {
  const circleRef = useRef(null);
  const sectionRef = useRef(null);
  const finaltextref = useRef(null);
  const initialref = useRef(null);
const navigate=useNavigate()
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Reset states
      gsap.set(circleRef.current, { scale: 1 });
      gsap.set(initialref.current, { opacity: 1 });
      gsap.set(finaltextref.current, { opacity: 0, scale: 0.5 });

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Increased for smoother animation
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Phase 1: Initial circle grow + color shift
      tl.to(circleRef.current, {
        scale: 8,
        backgroundColor: "#9333EA",
        duration: 1,
        ease: "power2.inOut"
      })
      
      // Fade out initial text during first growth
      .to(initialref.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "<0.2")
      
      // Phase 2: Make the circle huge
      .to(circleRef.current, {
        scale: 20,
        boxShadow: "0 0 120px rgba(186, 148, 255, 0.6)",
        duration: 1.5,
        ease: "power2.inOut"
      })
      
      // Phase 3: Fade in final text AFTER circle is large
      .to(finaltextref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden"
    >
      <div
        ref={circleRef}
        className="absolute w-24 md:w-32 h-24 md:h-32 rounded-full flex items-center justify-center bg-white shadow-xl"
        style={{ transformOrigin: "center center" }}
      >
        <p
          ref={initialref}
          className="absolute text-black font-semibold text-sm md:text-lg pointer-events-none"
        >
          scroll down
        </p>
      </div>
      
      <div 
        ref={finaltextref} 
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
          step into the future with sami sheikh
        </h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
          react-native  developer building fast, responsive and polished web
          experiences using React, Tailwind, GSAP and Framer Motion.
        </p>
        <button onClick={(e)=>navigate("")} className="py-3 px-8 bg-black text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold">
          contact me
        </button>
      </div>
    </section>
  );
}

export default Contact;