"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Styles from "./About.module.css";

const paragraphs = [
  "At Utopia, we craft exceptional digital experiences that connect brands with people. Through innovative design, cutting-edge technology, and strategic thinking, we help businesses stand out in an ever-evolving digital world.",
  "We specialize in web development, mobile applications, branding, digital marketing, and custom business solutions. Every project we create is designed to be visually stunning, highly functional, and focused on delivering measurable results.",
  "Our mission is simple: transform ambitious ideas into meaningful digital experiences. Together, we build the future of your brand.",
];

const titleWords = "Discover the Story Behind Utopia.";
const titleLetters = titleWords.split("");

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);

  // Particles
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

  return (
    <section ref={sectionRef} className={Styles.section}>
      {/* Parallax BG */}
      <motion.div
        style={{ y }}
        className={`${Styles.bg} absolute inset-0 bg-cover bg-center scale-110`}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] opacity-40 pointer-events-none"
      />

      {/* Content */}
      <div className={`${Styles.content} relative z-10`}>

        {/* LEFT — iPhone Mockup */}
        <motion.div
          className={Styles.laptopWrapper}
          initial={{ opacity: 0, y: 500 }}          // ← يظهر من الأسفل عند scroll
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Floating wrapper */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className={Styles.phoneFloat}
            style={{ transformStyle: "preserve-3d" }} 
          >
            {/* iPhone Shell */}
            <div className={Styles.iphone}>

              {/* Side buttons */}
              <div className={Styles.btnVolUp} />
              <div className={Styles.btnVolDown} />
              <div className={Styles.btnPower} />

              {/* Screen */}
              <div className={Styles.screen}>
                {/* Dynamic Island */}
                <div className={Styles.dynamicIsland} />

                {/* Reel Video */}
                <video
                  className={Styles.reelVideo}
                  src="about.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>

            {/* Glow under phone */}
            <div className={Styles.phoneGlow} />
          </motion.div>
        </motion.div>

        {/* RIGHT — Text */}
        <div className={Styles.textBlock}>
          <motion.div
            className={Styles.label}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className={Styles.labelLine} />
            <span>about us</span>
          </motion.div>

          <h2
  className={Styles.bigTitle}
  aria-label="Our clients are more than customers."
>
  {titleLetters.map((char, i) => (
    <motion.span
      key={i}
      className={Styles.titleLetter}
      initial={{
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.4,
        delay: 0.5 + i * 0.03,
        ease: "easeOut",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</h2>

          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={Styles.paragraph}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.1 + i * 0.2, ease: "easeOut" }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}