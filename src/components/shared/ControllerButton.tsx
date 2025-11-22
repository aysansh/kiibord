import { motion } from 'motion/react';
import { Gamepad2, Trophy, Zap, Target } from 'lucide-react';

interface ControllerButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Gaming controller-style button component
 * Features PlayStation-inspired design with D-pad and action buttons
 */
export function ControllerButton({ 
  children, 
  type = 'button', 
  variant = 'primary',
  onClick,
  disabled = false 
}: ControllerButtonProps) {
  const variants = {
    primary: {
      bg: 'from-cyan-600 via-blue-600 to-cyan-600',
      shadow: 'shadow-cyan-500/50',
      glow: 'group-hover:shadow-cyan-500/80',
      icon: Gamepad2,
      accent: 'bg-cyan-400',
    },
    secondary: {
      bg: 'from-blue-600 via-purple-600 to-blue-600',
      shadow: 'shadow-blue-500/50',
      glow: 'group-hover:shadow-blue-500/80',
      icon: Trophy,
      accent: 'bg-blue-400',
    },
    success: {
      bg: 'from-green-600 via-emerald-600 to-green-600',
      shadow: 'shadow-green-500/50',
      glow: 'group-hover:shadow-green-500/80',
      icon: Zap,
      accent: 'bg-green-400',
    },
    warning: {
      bg: 'from-orange-600 via-yellow-600 to-orange-600',
      shadow: 'shadow-orange-500/50',
      glow: 'group-hover:shadow-orange-500/80',
      icon: Target,
      accent: 'bg-orange-400',
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Main controller body */}
      <div className={`relative bg-gradient-to-r ${config.bg} p-0.5 rounded-3xl shadow-xl ${config.shadow} ${disabled ? '' : config.glow} transition-all duration-300`}>
        {/* Inner button surface */}
        <div className="bg-slate-950/60 backdrop-blur-sm px-8 py-4 rounded-3xl relative overflow-hidden">
          {/* Animated scan line */}
          <motion.div
            className={`absolute inset-0 ${config.accent} opacity-20`}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
            style={{
              background: `linear-gradient(90deg, transparent, currentColor, transparent)`,
            }}
          />

          {/* Button content */}
          <div className="relative flex items-center justify-center gap-3">
            <motion.div
              animate={{ 
                rotate: disabled ? 0 : [0, 15, -15, 0],
                scale: disabled ? 1 : [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
            </motion.div>
            
            <span 
              className="text-white tracking-widest uppercase"
              style={{ fontWeight: 800, fontSize: '0.875rem' }}
            >
              {children}
            </span>

            <motion.div
              animate={{ 
                rotate: disabled ? 0 : [0, -15, 15, 0],
                scale: disabled ? 1 : [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>

          {/* Texture grips on sides */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white/20"></div>
            ))}
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white/20"></div>
            ))}
          </div>
        </div>
      </div>

      {/* D-pad (left side) */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10">
        <div className="relative w-full h-full opacity-60">
          {/* Vertical */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-8 bg-slate-800 rounded-sm border border-slate-700"></div>
          {/* Horizontal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-2.5 bg-slate-800 rounded-sm border border-slate-700"></div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
        </div>
      </div>

      {/* Action buttons (right side) - PlayStation style */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2">
        <div className="relative w-10 h-10">
          {/* Triangle (top) */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-green-500 opacity-70"
            animate={{ opacity: disabled ? 0.7 : [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          {/* Circle (right) */}
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-red-500 opacity-70"
            animate={{ opacity: disabled ? 0.7 : [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.25 }}
          />
          {/* X (bottom) */}
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 opacity-70"
            animate={{ opacity: disabled ? 0.7 : [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-blue-500 rotate-45 scale-75"></div>
          </motion.div>
          {/* Square (left) */}
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-pink-500 opacity-70"
            animate={{ opacity: disabled ? 0.7 : [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          />
        </div>
      </div>

      {/* Trigger indicators (top corners) */}
      <div className="absolute -top-2 left-8 flex gap-1">
        <div className="w-6 h-1 bg-slate-800 rounded-full border border-slate-700"></div>
      </div>
      <div className="absolute -top-2 right-8 flex gap-1">
        <div className="w-6 h-1 bg-slate-800 rounded-full border border-slate-700"></div>
      </div>
    </motion.button>
  );
}
