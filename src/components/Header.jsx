import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/sami.jpg";
import toast from "react-hot-toast";

function Header() {
  const [loading, setloading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [opencontactform, setcontactform] = useState(false);
  
  const openform = () => setcontactform(true);
  const closeform = () => setcontactform(false);
  
  const navItems = [
    { label: "Home", link: "#home" },
    { label: "About", link: "#about" },
    { label: "Project", link: "#project" },
    { label: "Experience", link: "#experience" },
    { label: "Contact", link: "#contact" },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const [isemail, setemail] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleinput = (e) => {
    const { name, value } = e.target;
    setemail((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const { email, message, name } = isemail;

    // Validation
    if (!email || !message || !name) {
      toast.error("All fields are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setloading(true);

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
        setemail({ email: "", message: "", name: "" });
        toast.success("Message sent successfully! 🎉");
        closeform();
      } else {
        console.error("API Error:", data);
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto flex items-center justify-between p-4 lg:px-8 md:px-6"
      >
        {/* Logo + Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ rotate: 2, scale: 1.05 }}
        >
          <img src={logo} alt="Sami Sheikh" className="h-10 w-10 rounded-full shadow-md" />
          <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Sami Sheikh
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, delay: 0.3 },
            },
          }}
          className="hidden lg:flex items-center gap-8"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.link}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              onClick={() => handleNavClick(item.link)}
              className="relative text-gray-800 dark:text-gray-100 hover:text-violet-500 transition 
                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
                after:bg-violet-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </motion.button>
          ))}

          {/* Social Icons */}
          <motion.div
            className="flex items-center gap-4 ml-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="https://github.com/shami-sheikh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.instagram.com/sami_sheikh0075/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              <AiFillInstagram size={20} />
            </a>
            <a
              href="https://x.com/sami_0078"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              <FaTwitter size={20} />
            </a>
          </motion.div>

          {/* Hire Button */}
          <motion.button
            onClick={openform}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md hover:shadow-lg transition"
          >
            Hire Me
          </motion.button>
        </motion.nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-2xl text-gray-900 dark:text-gray-100"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </motion.div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden bg-white/20 dark:bg-black/30 backdrop-blur-md shadow-lg p-4 space-y-6"
          >
            {navItems.map((item) => (
              <button
                key={item.link}
                onClick={() => handleNavClick(item.link)}
                className="text-gray-900 dark:text-gray-100 block text-lg hover:text-violet-500 transition"
              >
                {item.label}
              </button>
            ))}

            <div className="flex items-center gap-4 justify-center">
              <a href="https://github.com/shami-sheikh" target="_blank" rel="noopener noreferrer">
                <FaGithub size={22} className="hover:text-violet-500 cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/sami_sheikh0075/" target="_blank" rel="noopener noreferrer">
                <AiFillInstagram size={22} className="hover:text-violet-500 cursor-pointer" />
              </a>
              <a href="https://x.com/sami_0078" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={22} className="hover:text-violet-500 cursor-pointer" />
              </a>
            </div>

            <motion.button
              onClick={openform}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md hover:shadow-lg transition"
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {opencontactform && (
          <div
            className="fixed text-white font-semibold inset-0 z-50 backdrop-blur-md bg-black/40 flex items-center justify-center p-4"
            onClick={closeform}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full mt-[32rem] max-w-md bg-gradient-to-br from-gray-900 to-black backdrop-blur-md
                rounded-2xl shadow-xl border border-white/10 p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Get in touch</h1>
                  <p className="text-sm text-gray-400">
                    Let's build something amazing.
                  </p>
                </div>

                <FiX
                  onClick={closeform}
                  className="text-gray-300 hover:text-red-500 cursor-pointer text-2xl transition"
                />
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleinput}
                    value={isemail.name}
                    placeholder="Your name"
                   
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleinput}
                    value={isemail.email}
                    placeholder="your.email@example.com"
                
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-300">Message</label>
                  <textarea
                    name="message"
                    value={isemail.message}
                    onChange={handleinput}
                    placeholder="Your message..."
                
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-violet-600 to-indigo-500 hover:shadow-lg hover:shadow-violet-500/50"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
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
    </header>
  );
}

export default Header;