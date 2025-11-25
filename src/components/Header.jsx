  import React, { useState } from "react";
  import { motion,AnimatePresence } from "framer-motion";
  import { Link } from "react-router-dom";
  import { FaGithub, FaTwitter } from "react-icons/fa";
  import { AiFillInstagram } from "react-icons/ai";
  import { FiMenu, FiX } from "react-icons/fi";
  import {toast} from 'react-hot-toast'
  function Header() {

    const [isopen, setisopen] = useState(false);
    const [contactform, setcontactform] = useState(false);
    const opencontactform = () => {
      setcontactform(true);
    };
    const cloosecontactform = () => {
      setcontactform(false);
    };
    const toggalemenu = () => {
      setisopen(!isopen);
    };

    const navItems = [
      { label: "Home", link: "/" },
      { label: "About", link: "/About" },
      { label: "Project", link: "/Project" },
      { label: "Experience", link: "/Experience" },
      { label: "Contact", link: "/Contact" },
    ];
  //msg section
  const [loading,setloading]=useState(false)
  const [inputfield,setinputfield]=useState({
    email:"",
    name:"",
    Message:""
  })
  const handleinput=(e)=>{
    const {name,value}=e.target;
    setinputfield((prev)=>({...prev,[name]:value}))
  }
  const onSubmit = async (event) => {
      event.preventDefault();
  const {email,Message,name}=inputfield;
  if(!email||!Message||!name){
     toast.error("Please fill all fields");
  return;
  }
  setloading(true)
    try {
        const formData = new FormData(event.target);
      formData.append("access_key", "8888c6f9-191a-4a8c-ac3d-1f1931abf1d7");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
       toast.success('massage has  sent succefully✅')
        event.target.reset();
      } else {
        toast.error("abe gandu error hai");
      }
    } catch (error) {
      console.log(error);
      
    } finally {
      setloading(false);
    }
    };

  return (
    <header className="absolute w-full z-50 transition-all duration-300">
      <div className="container flex justify-between p-4 lg:px-8 md:px-6 items-center">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
          className="flex items-center"
        >
          <div className="h-10 w-10 cursor-pointer bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center rounded-lg font-bold text-purple-600 text-xl mr-3">
            S
          </div>
          <span className="bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            Sami Sheikh
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="lg:flex hidden items-center space-x-8">
          {/* Nav Items */}
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                damping: 20,
                stiffness: 100,
                delay: 0.6 + index * 0.15,
                duration: 1.2,
                type: "spring",
              }}
            >
              <Link
                to={item.link}
                className="relative text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute w-0 h-0.5 bottom-0 left-0 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-6 ml-4">
            <motion.a
              href="https://github.com/shami-sheikh"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-gray-700 dark:text-gray-300 text-2xl hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              <FaGithub />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/sami_sheikh0075/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-gray-700 dark:text-gray-300 text-2xl hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              <AiFillInstagram />
            </motion.a>

            <motion.a
              href="https://x.com/sami_0078"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-gray-700 dark:text-gray-300 text-2xl hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              <FaTwitter />
            </motion.a>

            <motion.button
              onClick={opencontactform}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                delay: 1.6,
                duration: 0.8,
                stiffness: 100,
                damping: 15,
              }}
              className=" px-4 py-2 transition-all duration-400 rounded-lg bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 hover:from-violet-700 hover:to-purple-700  hover:text-white  font-medium shadow-sm hover:shadow  "
            >
              Hire Me
            </motion.button>
          </div>
        </div>
        {/* for mobile menu btn */}
        <div className="md:hidden flex items-center ">
          <motion.button
            onClick={toggalemenu}
            whileTap={{ scale: 0.7 }}
            className="text-gray-300"
          >
            {isopen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>
      {/* for mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isopen ? 1 : 0, height: isopen ? "auto" : 0 }}
        transition={{
          duration: 0.5,
        }}
        className="flex flex-col md:hidden overflow-hidden shadow-lg bg-white px-4 py-5 space-y-5 dark:bg-gray-900"
      >
        <nav className="flex  flex-col space-y-4">
          {navItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.link}
                className="relative  text-gray-300 font-medium "
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* mobile icon */}

        <div className="md:hidden flex items-center space-x-6 ml-4">
          <a
            href="https://github.com/shami-sheikh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 text-2xl hover:text-violet-600 dark:hover:text-violet-400 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.instagram.com/sami_sheikh0075/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 text-2xl hover:text-violet-600 dark:hover:text-violet-400 transition"
          >
            <AiFillInstagram />
          </a>

          <a
            href="https://x.com/sami_0078"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 text-2xl hover:text-violet-600 dark:hover:text-violet-400 transition"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Hire Me Button */}
        <button
          onClick={opencontactform}
          className="px-4 py-2 rounded-lg font-medium text-violet-700
             bg-gradient-to-r from-gray-400 to-gray-100
             hover:from-violet-700 hover:to-purple-700 hover:text-white
             shadow-sm hover:shadow transition-all duration-300"
        >
          Hire Me
        </button>
      </motion.div>
      {/* hire me conatct form */}
      <AnimatePresence>
        {contactform && (
        <motion.div
       
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={cloosecontactform}
          className="fixed flex justify-center items-center text-current inset-0 bg-black/50 backdrop-blur-sm z-50 p-4"
        >
          <motion.div 
          initial={{opacity:0,scale:0.8,y:30}}
          animate={{opacity:1,scale:1,y:0}}
          exit={{opacity:0,scale:0.8,y:30}}
          transition={{
            type:'spring',
            damping:30,
            stiffness:200,
            duration:0.8
          }}
          onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex mb-4 justify-between px-6">
              <h1 className="text-2xl font-bold text-gray-300 ">
                Get In Touch
              </h1>
              <button onClick={cloosecontactform}>
                <FiX className="w-5 h-5 font-extrabold " />
              </button>
            </div>
            {/* input form */}
            <form onSubmit={onSubmit}>

              <div>
                <label
                  className="block text-sm font-medium text-gray-300 mb-1"
                  htmlFor="name"
                >
                  name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder=" your name"
                  value={inputfield.name}
                  onChange={handleinput}
                  className="w-full py-2 px-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 "
                />
              </div>
              <div className="py-4">
                <label
                  className="block text-sm font-medium text-gray-300 mb-1"
                  htmlFor="name"
                >
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder=" your email"
                  onChange={handleinput}
                  value={inputfield.email}
                  className="w-full py-2 px-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 "
                />
              </div>
              <div className="">
                <label
                  className="block text-sm font-medium text-gray-300 mb-1"
                  htmlFor="name"
                >
                  Message
                </label>
                <textarea
                 id="Message"
                 name="Message"
                 value={inputfield.Message}
                 onChange={handleinput}
                 rows={4}
                  placeholder=" how can i help you"
                  className="w-full py-2 px-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 "
                />
              </div>
              <motion.button
             
              whileHover={{scale:1.03}}
              whileTap={{scale:0.97}}
              
              className={loading?'bg-gray-700 text-white rounded-lg mt-3 w-full px-4 py-2':'rounded-lg mt-3 w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 shadow-md  hover:shadow-violet-600'}>
                {loading? 'sending message...':'send message'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
