import React from "react";
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function Home() {
  return (
    <div id="home" className="flex h-screen bg-gradient-to-b from-violet-900 to-black xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative">
      {/* left wala */}
      <div className="z-40 mb-[20%] xl:mb-0">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.3,
            duration: 1.5,
          }}
          className="text-5xl md:text-6xl lg:text-8xl font-bold z-10"
        >
          Building Fast <br /> Reliable Result
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 25,
            delay: 1.8,
            duration: 1.5,
            stiffness: 40
          }}
          className="text-xl lg:2xl: text-violet-200 max-w-2xl mt-3"
        >
          I deliver robust, production ready website and web app with the speed and precisions. Every project backed by 
          clean code clear comunication, and a commitment to getting it done, on time, every time.
        </motion.p>
      </div>
      {/* right wala */}
      <Spline className="absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0" scene="https://prod.spline.design/bViu2TFz692hAoE4/scene.splinecode" />
    </div>
  );
}

export default Home;