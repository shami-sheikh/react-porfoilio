import React, { useEffect, Suspense, lazy } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./components/Footer";

// Lazy load heavy components
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Project = lazy(() => import("./components/Project"));
const Contact = lazy(() => import("./components/Contact"));
const Experience = lazy(() => import("./components/Experience"));
const Cuetomcursor = lazy(() => import("./components/Cuetomcursor"));
const BackToTop = lazy(() => import("./components/BackToTop"));

// Loading fallback
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-900 to-black">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
    </div>
  );
}

// HomePage component contains all sections
function HomePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Home />
      <About />
      <Project />
      <Experience />
      <Contact />
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    // Only use GSAP on desktop for performance
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop) {
      gsap.registerPlugin(ScrollTrigger);
      
      // Optimize ScrollTrigger for performance
      ScrollTrigger.config({
        limitCallbacks: true, // Limit callback frequency
        syncInterval: 150, // Increase sync interval for better performance
      });
      
      ScrollTrigger.refresh();
    }
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Suspense fallback={null}>
          {/* Only load cursor on desktop */}
          {window.innerWidth >= 1024 && <Cuetomcursor />}
        </Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer/>
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;