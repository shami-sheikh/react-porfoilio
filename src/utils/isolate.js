export function isDisabled(key) {
  try {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('disable') || ''
    const set = new Set(raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean))
    return set.has(key.toLowerCase())
  } catch (e) {
    return false
  }
}

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaGithub, FaTwitter } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";
// import { FiMenu, FiX } from "react-icons/fi";

// // Header Component - ONLY handles navigation
// function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const handleNavClick = (sectionId) => {
//     // Close mobile menu
//     setIsOpen(false);
    
//     // Wait a bit for menu to close, then scroll
//     setTimeout(() => {
//       const element = document.querySelector(sectionId);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }, 100);
//   };

//   const navItems = [
//     { label: "Home", id: "#home" },
//     { label: "About", id: "#about" },
//     { label: "Project", id: "#project" },
//     { label: "Experience", id: "#experience" },
//     { label: "Contact", id: "#contact" },
//   ];

//   return (
//     <header className="fixed w-full z-50 bg-transparent backdrop-blur-md shadow-sm">
//       <div className="container mx-auto flex items-center justify-between p-4 lg:px-8 md:px-6">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <Link to="/" className="flex items-center">
//             <div className="h-10 w-10 rounded-full bg-violet-600 shadow-sm mr-2 flex items-center justify-center text-white font-bold">
//               S
//             </div>
//             <span className="font-semibold text-gray-800 dark:text-gray-100">
//               Sami Sheikh
//             </span>
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden lg:flex items-center gap-8">
//           {navItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => handleNavClick(item.id)}
//               className="text-gray-800 dark:text-gray-100 hover:text-violet-600 transition"
//             >
//               {item.label}
//             </button>
//           ))}

//           {/* Social Icons */}
//           <div className="flex items-center gap-4 ml-4">
//             <a
//               href="https://github.com/shami-sheikh"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-700 dark:text-gray-300 hover:text-violet-600"
//             >
//               <FaGithub />
//             </a>
//             <a
//               href="https://www.instagram.com/sami_sheikh0075/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-700 dark:text-gray-300 hover:text-violet-600"
//             >
//               <AiFillInstagram />
//             </a>
//             <a
//               href="https://x.com/sami_0078"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-700 dark:text-gray-300 hover:text-violet-600"
//             >
//               <FaTwitter />
//             </a>
//           </div>
//         </nav>

//         {/* Mobile Button */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-800 dark:text-gray-100"
//           >
//             {isOpen ? <FiMenu className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="lg:hidden bg-white dark:bg-gray-900 shadow-md">
//           <div className="flex flex-col p-4 space-y-3">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavClick(item.id)}
//                 className="text-gray-800 dark:text-gray-100 text-left"
//               >
//                 {item.label}
//               </button>
//             ))}

//             <div className="flex items-center gap-4 pt-2">
//               <a
//                 href="https://github.com/shami-sheikh"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-700 dark:text-gray-300 hover:text-violet-600"
//               >
//                 <FaGithub />
//               </a>
//               <a
//                 href="https://www.instagram.com/sami_sheikh0075/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-700 dark:text-gray-300 hover:text-violet-600"
//               >
//                 <AiFillInstagram />
//               </a>
//               <a
//                 href="https://x.com/sami_0078"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-700 dark:text-gray-300 hover:text-violet-600"
//               >
//                 <FaTwitter />
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// // Placeholder components (replace with your actual components)
// function Home() {
//   return (
//     <div id="home" className="min-h-screen bg-gradient-to-b from-violet-900 to-black flex items-center justify-center px-10">
//       <div className="text-center">
//         <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white">
//           Building Fast<br />Reliable Results
//         </h1>
//         <p className="text-xl text-violet-200 max-w-2xl mt-6 mx-auto">
//           I deliver robust, production-ready websites and web apps with speed and precision.
//         </p>
//       </div>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div id="about" className="min-h-screen bg-gray-900 flex items-center justify-center px-10">
//       <div className="max-w-4xl">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">About Me</h2>
//         <p className="text-lg text-gray-300">
//           Your about content goes here...
//         </p>
//       </div>
//     </div>
//   );
// }

// function Project() {
//   return (
//     <div id="project" className="min-h-screen bg-gray-800 flex items-center justify-center px-10">
//       <div className="max-w-4xl">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Projects</h2>
//         <p className="text-lg text-gray-300">
//           Your projects content goes here...
//         </p>
//       </div>
//     </div>
//   );
// }

// function Experience() {
//   return (
//     <div id="experience" className="min-h-screen bg-gray-900 flex items-center justify-center px-10">
//       <div className="max-w-4xl">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Experience</h2>
//         <p className="text-lg text-gray-300">
//           Your experience content goes here...
//         </p>
//       </div>
//     </div>
//   );
// }

// function Contact() {
//   return (
//     <div id="contact" className="min-h-screen bg-gray-800 flex items-center justify-center px-10">
//       <div className="max-w-4xl">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact</h2>
//         <p className="text-lg text-gray-300">
//           Your contact content goes here...
//         </p>
//       </div>
//     </div>
//   );
// }

// // Main App - Single page with all sections
// export default function App() {
//   return (
//     <div className="bg-black text-white">
//       <Header />
//       <Home />
//       <About />
//       <Project />
//       <Experience />
//       <Contact />
//     </div>
//   );
// }