import { motion } from 'framer-motion';

export default function AnimatedCar() {
  return (
    <div className="relative w-full py-20 overflow-hidden bg-neutral-900/50 border-y border-neutral-800">
      
      {/* Background Neon Glow to match your new theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-red-500/10 blur-[100px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
        
        {/* Text Side */}
        <div className="md:w-1/3 mb-10 md:mb-0 z-20">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-white mb-4"
          >
            Precision <span className="text-red-400">Engineered</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-lg"
          >
            Our parts don't just fit. They perform. Experience the difference of true automotive excellence.
          </motion.p>
        </div>

        {/* The Car Side (The Magic) */}
        <div className="md:w-2/3 relative w-full h-75 flex items-center justify-end">
          
          {/* The Floor/Shadow Line to "ground" the car */}
          <div className="absolute bottom-10 left-10 right-0 h-1 bg-linear-to-r from-transparent via-red-500/30 to-transparent blur-sm" />

          {/* The Animated Car */}
          <motion.img
            src="https://raw.githubusercontent.com/framer/motion/main/packages/framer-motion/sandbox/public/car.png" 
            alt="Performance Sports Car"
            className="relative z-10 w-150 object-contain drop-shadow-2xl"
            
            /* --- THE PHYSICS ENGINE --- */
            initial={{ x: '100vw', opacity: 0 }} // Starts completely off-screen to the right
            whileInView={{ x: 0, opacity: 1 }}   // Drives to its resting position
            viewport={{ once: true, margin: "-100px" }} // Triggers right before user scrolls to it
            transition={{ 
              type: "spring", 
              stiffness: 40,  // How fast it accelerates
              damping: 12,    // The "brakes" - lower number means more bounce, higher means heavy stop
              mass: 1.5       // Makes the car feel heavy and realistic
            }}
          />
        </div>
      </div>
    </div>
  );
}