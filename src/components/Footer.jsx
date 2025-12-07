import { useState, useEffect } from 'react';
import { FaInstagram, FaGithub, FaTwitter, FaRocket, FaFire, FaBolt, FaHeart, FaCode } from 'react-icons/fa';

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 3 + 2
        }
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  const socialLinks = [
    { icon: FaInstagram, url: "https://www.instagram.com/sami_sheikh0075/", color: "from-purple-600 to-pink-600", label: "INSTA" },
    { icon: FaGithub, url: "https://github.com/shami-sheikh", color: "from-gray-600 to-gray-900", label: "CODE" },
    { icon: FaTwitter, url: "https://x.com/sami_0078", color: "from-blue-400 to-blue-600", label: "TWEET" }
  ];

  const floatingIcons = [FaRocket, FaFire, FaBolt, FaHeart, FaCode];

  return (
    <footer className="relative w-full overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-600 via-cyan-600 to-green-600 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Particle system */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}

      {/* Floating icons */}
      {floatingIcons.map((Icon, i) => (
        <Icon
          key={i}
          className="absolute text-white opacity-10 animate-bounce"
          style={{
            fontSize: `${Math.random() * 40 + 30}px`,
            left: `${(i + 1) * 18}%`,
            top: `${Math.random() * 80}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${Math.random() * 2 + 3}s`
          }}
        />
      ))}

      {/* Mouse trail glow */}
      <div
        className="absolute w-96 h-96 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      <div className="relative z-10 py-16 lg:py-24">
        <div className="md:flex justify-between items-start p-6 lg:p-12 px-4 md:px-8 gap-12">
          
          {/* Profile section with extreme effects */}
          <div className="flex flex-col space-y-6 flex-1">
            <div className="flex gap-4 items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full blur-xl group-hover:blur-2xl transition-all animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" 
                  alt="profile" 
                  className={`relative w-20 h-20 rounded-full border-4 border-white shadow-2xl transform group-hover:scale-110 transition-all duration-300 ${glitchActive ? 'animate-pulse' : ''}`}
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-black animate-ping"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-black"></div>
              </div>
              <div>
                <h1 className={`text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl ${glitchActive ? 'animate-pulse' : ''}`}>
                  SAMI SHEIKH
                </h1>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse">DEVELOPER</span>
                  <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}>DESIGNER</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                React Native Developer
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Building <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text font-bold">INSANE</span> UI experiences that make eyes <span className="text-transparent bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text font-bold">EXPLODE</span> 🔥
              </p>
              
              <div className="flex gap-2 flex-wrap">
                {['React', 'Native', 'JavaScript', 'UI/UX', '🚀'].map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 text-sm font-bold bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all hover:scale-110 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social links with extreme styling */}
          <div className="flex flex-col gap-6 mt-8 md:mt-0">
            <h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2">
              CONNECT NOW
            </h3>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${social.color} blur-xl group-hover:blur-2xl transition-all opacity-50`}></div>
                <div className={`relative flex items-center gap-4 px-8 py-4 bg-gradient-to-r ${social.color} rounded-2xl shadow-2xl transform group-hover:scale-110 group-hover:-rotate-2 transition-all duration-300 border-2 border-white/20`}>
                  <social.icon className="text-4xl animate-bounce" style={{ animationDuration: '2s' }} />
                  <div>
                    <div className="text-xs font-bold opacity-70">{social.label}</div>
                    <div className="text-xl font-black">FOLLOW ME</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Extreme divider */}
        <div className="relative my-12 px-6">
          <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-black">
            <FaBolt className="text-yellow-400 text-3xl animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Bottom bar with extreme effects */}
        <div className="px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <p className="text-lg font-bold">
                © {new Date().getFullYear()} 
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text"> SAMI SHEIKH</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-400 font-semibold">All rights reserved</p>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final extreme touch */}
        <div className="text-center mt-8">
          <p className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text animate-pulse">
            🔥
          </p>
        </div>
      </div>
    </footer>
  );
}