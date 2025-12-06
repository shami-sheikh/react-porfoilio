import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

function Contact() {
  const circleRef = useRef(null);
  const sectionRef = useRef(null);
  const finaltextref = useRef(null);
  const initialref = useRef(null);
 
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
          end: "+=300%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      tl.to(circleRef.current, {
        scale: 8,
        backgroundColor: "#9333EA",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(initialref.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "<0.2")
      .to(circleRef.current, {
        scale: 20,
        boxShadow: "0 0 120px rgba(186, 148, 255, 0.6)",
        duration: 1.5,
        ease: "power2.inOut"
      })
      .to(finaltextref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [contactformopen, setcontactformopen] = useState(false);
  const [isloading, setisloading] = useState(false);
  
  const isopenform = () => setcontactformopen(true);
  const iscloseform = () => setcontactformopen(false);
  
  const [inputfield, setinputfield] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleinput = (e) => {
    const { name, value } = e.target;
    setinputfield((prev) => ({ ...prev, [name]: value }));
  };

  const Submitbtn = async (event) => {
    event.preventDefault();
    
    const { name, email, message } = inputfield;
    
    // Validation
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setisloading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8888c6f9-191a-4a8c-ac3d-1f1931abf1d7",
          name: name,
          email: email,
          message: message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully! 🎉");
        
        // FIXED: Reset form fields properly
        setinputfield({
          name: "",
          email: "",
          message: ""
        });
        
        // Close modal after success
        setTimeout(() => {
          iscloseform();
        }, 1500);
      } else {
        console.error("API Error:", data);
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setisloading(false);
    }
  };

  return (
    <>
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
            Step into the future with Sami Sheikh
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
            React Native developer building fast, responsive and polished web
            experiences using React, Tailwind, GSAP and Framer Motion.
          </p>
          <button 
            onClick={isopenform} 
            className="py-3 px-8 bg-black text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold"
          >
            Contact Me
          </button>
        </div>
      </section>
 
      {/* Contact Form Modal */}
      <AnimatePresence>
        {contactformopen && (
          <div 
            onClick={iscloseform} 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut", damping: 10, type: "spring", stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg w-full max-w-md p-6 border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Get in Touch</h1>
                  <p className="text-sm text-gray-400 mt-1">Let's create something amazing</p>
                </div>
                <FiX 
                  onClick={iscloseform} 
                  className="text-2xl text-gray-400 hover:text-red-500 cursor-pointer transition"
                />
              </div>

              <form onSubmit={Submitbtn} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    onChange={handleinput} 
                    name="name" 
                    value={inputfield.name} 
                    placeholder="p.diddy" 
                   
                    className="bg-white/10 border border-white/20 rounded-lg w-full p-3 outline-none text-white placeholder-gray-500 focus:border-violet-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    onChange={handleinput} 
                    name="email" 
                    value={inputfield.email} 
                    placeholder="p.diddy@lotion.com" 
                  
                    className="bg-white/10 border border-white/20 rounded-lg w-full p-3 outline-none text-white placeholder-gray-500 focus:border-violet-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Message</label>
                  <textarea 
                    onChange={handleinput} 
                    name="message" 
                    value={inputfield.message} 
                    rows={4}  
                    placeholder="diddy's message..." 
                 
                    className="bg-white/10 border border-white/20 rounded-lg w-full p-3 outline-none text-white placeholder-gray-500 focus:border-violet-500 transition resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isloading}
                  className={`w-full p-3 rounded-lg font-semibold transition-all ${
                    isloading 
                      ? "bg-gray-600 cursor-not-allowed" 
                      : "bg-gradient-to-r from-violet-600 to-indigo-500 hover:shadow-lg hover:shadow-violet-500/50"
                  }`}
                >
                  {isloading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending message to diddy ...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Contact;