"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", title: "HOME" },
  { id: "we_help", title: "WE HELP" },
  { id: "philosophy", title: "PHILOSOPHY" },
  { id: "latest_projects", title: "LATEST PROJECTS" },
  { id: "departments", title: "DEPARTMENTS" },
  { id: "clients", title: "CLIENTS" },
  { id: "services", title: "SERVICES" },
  { id: "our_team", title: "OUR TEAM" },
  { id: "last_talk", title: "LAST TALK" },
  { id: "contact", title: "CONTACT" },
];

type NavbarProps = {
  onNavigate: (index: number) => void;
};

export default function Navbar({ onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (index: number) => {
    onNavigate(index);
    setOpen(false);
  };

  // ❗ منع السكروول لما المنيو مفتوح
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[72px]">
        <div className="h-full flex items-center justify-between px-6">

          {/* left side {Logo} */}
          <div className="flex items-center gap-4 text-white ">
            <div className="font-black text-sm uppercase leading-tight tracking-wide">
              <Image src="/logo.png" width={100} height={100} alt="logo" className="w-25 h-25" />
            </div>
            <div className="w-px h-8 bg-white/20 md:hidden" />
          </div>
          <div className="hidden md:block flex items-center gap-1 text-white">
          <a href="#"
              onClick={(e) => { e.preventDefault(); onNavigate(0); }}
              className="flex cursor-pointer font-black items-center gap-2 text-[2rem] uppercase tracking-widest"
            >
              <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              Home
            </a>
          </div>
          <div className=" md:block hidden flex items-center gap-6 text-white">
            <span
              onClick={() => onNavigate(9)}
              className="font-black text-2xl uppercase cursor-pointer"
            >
              Hire Us
            </span>
          </div>

          {/* HAMBURGER → X */}
          <button
            onClick={() => setOpen(!open)}
            className="relative cursor-pointer w-10 h-10 md:hidden"
          >
            <span
              className={`absolute left-0 w-8 h-[2px] bg-white transition-all duration-300
              ${open ? "rotate-45 top-1/2" : "top-2"}`}
            />

            <span
              className={`absolute left-0 w-8 h-[2px] bg-white transition-all duration-300 top-1/2
              ${open ? "opacity-0 scale-0" : "opacity-100"}`}
            />

            <span
              className={`absolute left-0 w-8 h-[2px] bg-white transition-all duration-300
              ${open ? "-rotate-45 top-1/2" : "bottom-2"}`}
            />
          </button>
        </div>
      </div>

      {/* BACKDROP (glass blur + fade) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-all duration-500
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* CURTAIN MENU */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[85%] md:w-[40%]
          bg-black/90 backdrop-blur-xl text-white z-50
          flex flex-col justify-center items-center

          transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* MENU ITEMS (stagger animation) */}
        <div className="flex flex-col gap-6 text-center">
          {sections.map((item, index) => (
            <span
              key={item.id}
              onClick={() => handleNavigate(index)}
              className={`
                text-2xl md:text-3xl font-black tracking-[0.3em]
                cursor-pointer transition-all duration-500
                hover:text-gray-400 hover:tracking-[0.5em]

                ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
              `}
              style={{
                transitionDelay: open ? `${index * 60}ms` : "0ms",
              }}
            >
              {item.title}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}