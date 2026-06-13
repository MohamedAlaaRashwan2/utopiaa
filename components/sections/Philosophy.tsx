"use client";

import { motion } from "framer-motion";
import Styles from "./Philosophy.module.css"
import { useEffect, useRef } from "react";
import Image from "next/image";

const nodes = [
{
title: "Mission",
subtitle: "Building Digital Excellence",
x: "-translate-x-[340px] translate-y-[120px]",
},
{
title: "Vision",
subtitle: "Transforming Ideas",
x: "-translate-y-[250px]",
},
{
title: "Future",
subtitle: "Designing Tomorrow",
x: "translate-x-[340px] translate-y-[120px]",
},
];

export default function Philosophy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);


return ( <section
   id="philosophy"
   className= {`${Styles.bg} relative h-screen overflow-hidden flex items-center justify-center`}
 >
{/* Background Glow */} 
<div className="absolute inset-0 bg-black/50" />

    <div className="absolute inset-0"> 
    <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

    <div className="absolute right-0 top-0 h-[400px] w-[400px] bg-purple-500/10 blur-[150px]" />

    <div className="absolute bottom-0 left-0 h-[300px] w-[300px] bg-blue-500/10 blur-[120px]" />
   </div>
         {/* Particles */}
         <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] opacity-40 pointer-events-none"
      />

  {/* SVG Connections */}
  <svg
    className="absolute inset-0 h-full w-full"
    viewBox="0 0 1920 1080"
  >
    <line
      x1="960"
      y1="540"
      x2="620"
      y2="650"
      stroke="rgba(255,255,255,.12)"
      strokeWidth="2"
    />

    <line
      x1="960"
      y1="540"
      x2="960"
      y2="290"
      stroke="rgba(255,255,255,.12)"
      strokeWidth="2"
    />

    <line
      x1="960"
      y1="540"
      x2="1300"
      y2="650"
      stroke="rgba(255,255,255,.12)"
      strokeWidth="2"
    />
  </svg>

  {/* Center Orb */}
  <motion.div
    initial={{
      scale: 0,
      opacity: 0,
    }}
    whileInView={{
      scale: 1,
      opacity: 1,
    }}
    transition={{
      duration: 1.2,
    }}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 3, 0, -3, 0],
    }}
    className="relative"
  >
    <div className="h-44 w-44 rounded-full border border-cyan-400/40 bg-cyan-500/10 backdrop-blur-xl" />

    <div className="absolute inset-0 animate-ping rounded-full border border-cyan-400/20" />

    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-xl opacity-70"/>
    <Image width={100} height={100} src="/logo1.png" alt="" className={Styles.imgut} />
  </motion.div>

  {/* Nodes */}
  {nodes.map((node, index) => (
    <motion.div
      key={node.title}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: index * 0.5,
      }}
      className={`absolute ${node.x}`}
    >
      <div className="flex flex-col items-center">
        <div className="h-5 w-5 rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.8)]" />

        <h3 className="mt-6 text-xl font-semibold text-white">
          {node.title}
        </h3>

        <p className="mt-2 text-sm text-white/50">
          {node.subtitle}
        </p>
      </div>
    </motion.div>
  ))}

  {/* Bottom Content */}
  <motion.div
    initial={{
      opacity: 0,
      y: 40,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      delay: 0.5,
      duration: 1,
    }}
    className="absolute bottom-24 max-w-4xl text-center px-6"
  >
    <span className="uppercase tracking-[0.4em] text-white/40 text-xs">
      Philosophy
    </span>

    <h2 className="mt-6 text-4xl md:text-3xl font-bold text-white leading-tight">
      Building the future through
      <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        innovation, strategy & design
      </span>
    </h2>

    <p className="mt-6 text-white/50 max-w-2xl mx-auto">
      We help businesses thrive in the digital world by combining
      cutting-edge technology, exceptional design and strategic thinking.
    </p>
  </motion.div>
</section>
);
}
