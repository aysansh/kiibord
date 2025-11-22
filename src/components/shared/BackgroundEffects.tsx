const PARTICLES = Array.from({ length: 15 }).map((_, index) => {
  const top = ((index * 37) % 100).toFixed(2);
  const left = ((index * 53 + 17) % 100).toFixed(2);
  const duration = (4 + (index % 4) + ((index * 13) % 7) / 10).toFixed(2);
  const delay = ((index % 5) * 0.45).toFixed(2);

  return {
    top: `${top}%`,
    left: `${left}%`,
    animation: `float ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  };
});

/**
 * Animated background effects for the application
 */
export function BackgroundEffects() {
  return (
    <>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Animated corner accents */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/10 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/10 dark:bg-orange-500/10 bg-orange-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "6s" }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 dark:bg-cyan-400 bg-blue-400 rounded-full"
            style={{
              top: particle.top,
              left: particle.left,
              animation: particle.animation,
              animationDelay: particle.animationDelay,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  );
}
