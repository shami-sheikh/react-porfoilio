import React from 'react';
import experienceapi from '../imgapi/img';
import { motion } from "framer-motion";

function Experience() {
  return (
    <section className='flex justify-center py-16 bg-gray-900 text-white'>
      <div className='container mx-auto px-6'>
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            delay: 0.3,
            duration: 0.5
          }}
          className='text-3xl md:text-4xl font-bold text-center mb-12'
        >
          Experience
        </motion.h2>

        <div className='max-w-4xl mx-auto space-y-6'>
          {experienceapi.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: index * 0.15,
                duration: 0.8
              }}
              whileHover={{ scale: 1.02 }}
              className='p-6 md:p-8 bg-gray-800 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300'
            >
              <div className='text-left'>
                <h3 className='text-2xl font-bold text-blue-400 mb-2'>
                  {item.title}
                </h3>
                <p className='text-lg text-gray-300 mb-1'>
                  {item.company}
                </p>
                <p className='text-sm text-gray-400 mb-4'>
                  {item.duration}
                </p>
                <p className='text-gray-200 leading-relaxed mb-4'>
                  {item.description}
                </p>
              </div>

              <div className='flex flex-wrap gap-2 mt-4'>
                {item.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1 rounded-full transition-colors duration-200'
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;