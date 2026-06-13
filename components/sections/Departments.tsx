"use client";
import { motion } from "framer-motion";
import { departments } from "./Departments_data";

interface DepartmentsProps {
  activeIndex: number;
  onIndexChange?: (index: number) => void;
}

export default function Departments({
  activeIndex,
}: DepartmentsProps) {
  return (
    <section
      id="departments"
      className="h-screen bg-[#0A0A0A] overflow-hidden flex flex-col justify-center"
    >
      <div className="px-8 md:px-16 mb-12">
        <span className="uppercase tracking-[0.3em] text-zinc-400 text-sm">
          WE HELP YOU IN
        </span>
        <h2 className="text-white text-5xl md:text-7xl font-bold mt-4">
          Our Departments
        </h2>
      </div>
      {/* <div className="overflow-hidden max-w-[80vw] mx-auto"> */}
      <motion.div
  animate={{
    x: `calc(50vw - 190px - ${activeIndex * 396}px)`,
  }}
  transition={{
    duration: 0.8,
    ease: [0.77, 0, 0.18, 1],
  }}
  className="flex gap-4"
>
        {departments.map((item, index) => {
          const active = index === activeIndex;

          return (
            <motion.div
              key={item.id}
              animate={{
                scale: active ? 1 : 0.85,
                opacity: active ? 1 : 0.4,
              }}
              transition={{ duration: 0.5 }}
              className={`
                flex-shrink-0 w-[380px] h-[420px] rounded-[30px] p-8
                backdrop-blur-xl border relative overflow-hidden
                transition-all duration-500
                ${
                  active
                    ? "bg-white/10 border-purple-500/60 shadow-[0_0_60px_rgba(139,92,246,0.35)]"
                    : "bg-white/[0.03] border-white/10"
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div
                    className={`text-7xl font-bold ${
                      active ? "text-purple-400" : "text-zinc-700"
                    }`}
                  >
                    {item.id}
                  </div>

                  <h3 className="text-white text-2xl font-semibold mt-6">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="text-2xl text-purple-400">↗</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      {/* </div> */}

      <div className="flex justify-center gap-3 mt-12">
        {departments.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              activeIndex === index
                ? "w-12 bg-purple-500"
                : "w-2 bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </section>
  );
}