"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Aura Identity",
    tag: "Branding",
    description:
      "A futuristic visual ecosystem designed for a next-gen FinTech conglomerate.",
    image:
      "/about1.jpg",
  },
  {
    title: "Nexus OS",
    tag: "Web Design",
    description:
      "An immersive, award-winning SaaS e-commerce interface built for fluid conversions.",
    image:
    "/about1.jpg",
},
  {
    title: "Vortex Growth",
    tag: "Marketing Campaign",
    description:
      "Hyper-targeted digital expansion achieving a 340% increase in cross-platform engagement.",
    image:
    "/about1.jpg",
},
];

export default function LatestProjects() {
  return (
    <section className="relative flex justify-center items-center h-screen py-28 px-6 bg-[#0b0b0f] text-white overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto flex flex-col gap-15">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto animate-fadeUp">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text">
            Latest Projects
          </h2>
          <p className="text-zinc-400 mt-4">
            Discover our most recent creative work and successful campaigns
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-3 animate-fadeUp">
          {projects.map((project, i) => (
            <motion.div
            key={i}
            initial={{
              x: 200,
              opacity: 0,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 3, 0, -3, 0],
            }}
            >
            <Link
              href="#"
              key={i}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-xl transition-all duration-500 group-hover:shadow-indigo-500/10 group-hover:border-indigo-500/30">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition" />
              </div>

              {/* Meta */}
              <div className="mt-5 flex flex-col gap-2">
                <span className="self-start text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition">
                  {project.tag}
                </span>

                <h3 className="text-xl font-semibold group-hover:text-indigo-400 transition">
                  {project.title}
                </h3>

                <p className="text-sm text-zinc-400 truncate">
                  {project.description}
                </p>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 hover:bg-white hover:text-black transition group"
          >
            View All Projects
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>
      </div>

      {/* animation */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 1s ease forwards;
        }
      `}</style>
    </section>
  );
}