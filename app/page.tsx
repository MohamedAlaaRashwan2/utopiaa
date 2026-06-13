"use client";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import LatestProjects from "@/components/sections/LatestProjects";
import Departments from "@/components/sections/Departments";
import { departments } from "@/components/sections/Departments_data";

import { FaInstagram, FaTiktok, FaLinkedin, FaFacebook } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import Nav from "@/components/ui/Nav";

const sections = [
  { id: "hero",            title: "HOME"            },
  { id: "we_help",         title: "WE HELP"         },
  { id: "philosophy",      title: "PHILOSOPHY"      },
  { id: "latest_projects", title: "LATEST PROJECTS" },
  { id: "departments",     title: "DEPARTMENTS"     },
  { id: "clients",         title: "CLIENTS"         },
  { id: "services",        title: "SERVICES"        },
  { id: "our_team",        title: "OUR TEAM"        },
  { id: "last_talk",       title: "LAST TALK"       },
  { id: "contact",         title: "CONTACT"         },
];

// index of the Departments section inside `sections`
const DEPARTMENTS_SECTION_IDX = 4;

const DRAG_THRESHOLD  = 200;
const DRAG_RESISTANCE = 1;

export default function Home() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const currentIdxRef  = useRef(0);
  const isScrollingRef = useRef(false);

  // tracks the active card index inside <Departments>
  const [departmentsIndex, setDepartmentsIndex] = useState(0);
  const mouseStartYRef = useRef(0);
  const isDraggingRef  = useRef(false);
  const dragOffsetRef  = useRef(0);
  const touchStartYRef = useRef(0);
  const [currentSection, setCurrentSection] = useState(0);
  const deptDragStartX = useRef(0);
  const isDeptDragging = useRef(false);

  // =========================
  // تحريك الـ container
  // =========================
  const setTransform = useCallback((offset: number, animated: boolean) => {
    if (!containerRef.current) return;
    const base = currentIdxRef.current * window.innerHeight;
    containerRef.current.style.transition = animated
      ? "transform 1s cubic-bezier(0.77, 0, 0.18, 1)"
      : "none";
    containerRef.current.style.transform = `translateY(${-(base - offset)}px)`;
  }, []);

  // =========================
  // الانتقال للسكشن
  // =========================
  const scrollToSection = useCallback((index: number) => {
    // if (index !== DEPARTMENTS_SECTION_IDX) {
    //   lastDepartmentsIndexRef.current = departmentsIndex;
    // }
    if (index < 0 || index >= sections.length) return;
    currentIdxRef.current = index;
    setCurrentSection(index);
    dragOffsetRef.current = 0;

    if (!containerRef.current) return;
    const base = index * window.innerHeight;
    containerRef.current.style.transition = "transform 1s cubic-bezier(0.77, 0, 0.18, 1)";
    containerRef.current.style.transform  = `translateY(${-base}px)`;

    isScrollingRef.current = true;
    const SCROLL_DURATION = 1000;

    isScrollingRef.current = true;
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, SCROLL_DURATION);
  }, []);

  // =========================
  // Wheel + Keyboard
  // =========================
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      console.log(
        "section:",
        currentIdxRef.current,
        "department:",
        departmentsIndex
      );
      console.log(currentIdxRef.current)
      if (isScrollingRef.current) return;
      const direction = e.deltaY > 0 ? 1 : -1;

      // لو كنا في سكشن الـ Departments
      if (currentIdxRef.current === DEPARTMENTS_SECTION_IDX) {
        if (direction === 1) {
          if (departmentsIndex < departments.length - 1) {
            setDepartmentsIndex((prev) => prev + 1);
            return;
          }
      
          // آخر كارت -> انزل للسكشن اللي بعده
          scrollToSection(currentIdxRef.current + 1);
          return;
        }
      
        if (direction === -1) {
          if (departmentsIndex > 0) {
            setDepartmentsIndex((prev) => prev - 1);
            return;
          }
      
          // أول كارت -> اطلع للسكشن اللي قبله
          scrollToSection(currentIdxRef.current - 1);
          return;
        }
      }

      e.preventDefault();
      scrollToSection(currentIdxRef.current + direction);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSection(currentIdxRef.current + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSection(currentIdxRef.current - 1);
      }
    };

    window.addEventListener("wheel",   handleWheel,   { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel",   handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollToSection, departmentsIndex]);

  // =========================
  // Mouse Drag for departments
  // =========================
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (currentIdxRef.current !== DEPARTMENTS_SECTION_IDX) return;
  
      isDeptDragging.current = true;
      deptDragStartX.current = e.clientX;
    };
  
    const handleMouseMove = () => {
      if (!isDeptDragging.current) return;
    };
  
    const handleMouseUp = (e: MouseEvent) => {
      if (!isDeptDragging.current) return;
  
      isDeptDragging.current = false;
  
      const diff = deptDragStartX.current - e.clientX;
  
      const threshold = 80; // حساسية السحب
  
      if (Math.abs(diff) < threshold) return;
  
      if (diff > 0) {
        // سحب لليسار -> next
        setDepartmentsIndex((prev) =>
          Math.min(prev + 1, departments.length - 1)
        );
      } else {
        // سحب لليمين -> prev
        setDepartmentsIndex((prev) => Math.max(prev - 1, 0));
      }
    };
  
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  
  // =========================
  // Mouse Drag
  // =========================
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (isScrollingRef.current) return;
      mouseStartYRef.current = e.clientY;
      isDraggingRef.current  = true;
      dragOffsetRef.current  = 0;
      if (containerRef.current)
        containerRef.current.style.transition = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const resistedDelta = (mouseStartYRef.current - e.clientY) * DRAG_RESISTANCE;
      dragOffsetRef.current = resistedDelta;
      setTransform(-resistedDelta, false);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const rawDelta = mouseStartYRef.current - e.clientY;
      if (Math.abs(rawDelta) >= DRAG_THRESHOLD) {
        const direction = rawDelta > 0 ? 1 : -1;
        scrollToSection(currentIdxRef.current + direction);
      } else {
        dragOffsetRef.current = 0;
        setTransform(0, true);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove, { passive: false });
    window.addEventListener("mouseup",   handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup",   handleMouseUp);
    };
  }, [scrollToSection, setTransform]);

  // =========================
  // Touch for departments
  // =========================
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (currentIdxRef.current !== DEPARTMENTS_SECTION_IDX) return;
  
      isDeptDragging.current = true;
      deptDragStartX.current = e.touches[0].clientX;
    };
  
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDeptDragging.current) return;
  
      isDeptDragging.current = false;
  
      const diff =
        deptDragStartX.current - e.changedTouches[0].clientX;
  
      const threshold = 80;
  
      if (Math.abs(diff) < threshold) return;
  
      if (diff > 0) {
        setDepartmentsIndex((prev) =>
          Math.min(prev + 1, departments.length - 1)
        );
      } else {
        setDepartmentsIndex((prev) => Math.max(prev - 1, 0));
      }
    };
  
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  // =========================
  // Touch
  // =========================
  useEffect(() => {

    const handleTouchStart = (e: TouchEvent) => {
      if (isScrollingRef.current) return;
      touchStartYRef.current = e.touches[0].clientY;
      if (containerRef.current)
        containerRef.current.style.transition = "none";
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const resistedDelta = (touchStartYRef.current - e.touches[0].clientY) * DRAG_RESISTANCE;
      setTransform(-resistedDelta, false);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const rawDelta = touchStartYRef.current - e.changedTouches[0].clientY;
      if (Math.abs(rawDelta) >= DRAG_THRESHOLD) {
        const direction = rawDelta > 0 ? 1 : -1;
        scrollToSection(currentIdxRef.current + direction);
      } else {
        setTransform(0, true);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    window.addEventListener("touchend",   handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove",  handleTouchMove);
      window.removeEventListener("touchend",   handleTouchEnd);
    };
  }, [scrollToSection, setTransform]);

  return (
    <>
      <Nav onNavigate={scrollToSection} />
      <nav
        aria-label="Page sections"
        className="fixed left-10 top-1/2 md:block hidden -translate-y-1/2 z-50"
      >
        <div className="flex flex-col">
          {sections.map((section, index) => {
            const active = currentSection === index;
            const passed = currentSection > index;
            return (
              <div key={section.id} className="flex items-start gap-5">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => scrollToSection(index)}
                    aria-label={`Go to ${section.title}`}
                    aria-current={active ? "true" : undefined}
                    className={`relative w-3 h-3 rounded-full border-[3px] transition-all duration-700
                      ${active
                        ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                        : "border-white/40 hover:border-white/70"
                      }`}
                  >
                    {active && (
                      <span className="absolute inset-0 rounded-full animate-ping border border-white/40" />
                    )}
                  </button>

                  {index !== sections.length - 1 && (
                    <div className="relative flex flex-col items-center">
                      <div className={`relative overflow-hidden rounded-full transition-all duration-700 w-[2px] bg-white/20 ${active ? "h-22" : "h-10"}`}>
                        <div className={`absolute bottom-0 left-0 w-full bg-white transition-all duration-1000 ${passed ? "h-full" : "h-0"}`} />
                      </div>
                      <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-700 ${passed ? "bg-white" : "bg-white/30"}`} />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollToSection(index)}
                  className={`uppercase cursor-pointer text-[10px] mt-[2px] min-w-[90px] text-left transition-all duration-700
                    ${active ? "text-white translate-x-2" : "text-white/35 hover:text-white/70"}`}
                >
                  {section.title}
                </button>
              </div>
            );
          })}
        </div>
      </nav>

      <ul className="flex gap-4 list-none p-0 m-0 absolute top-[98%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.35] z-[5]">
        <li><a className="hero_a" href="#"><FaInstagram /></a></li>
        <li><a className="hero_a" href="#"><FaTiktok /></a></li>
        <li><a className="hero_a" href="#"><FaLinkedin /></a></li>
        <li><a className="hero_a" href="#"><FaFacebook /></a></li>
      </ul>

      <div className="h-screen overflow-hidden select-none">
        <div ref={containerRef} style={{ willChange: "transform" }}>
          <section className="h-screen" aria-label="Home">
            <Hero />
          </section>
          <About />
          <Philosophy />
          <LatestProjects />
          <Departments
  activeIndex={departmentsIndex}
  onIndexChange={setDepartmentsIndex}
/>
          <section className="h-screen flex items-center justify-center bg-gray-500 text-white text-6xl" aria-label="Clients">Clients</section>
          <section className="h-screen flex items-center justify-center bg-gray-500 text-white text-6xl" aria-label="Services">Services</section>
          <section className="h-screen flex items-center justify-center bg-gray-500 text-white text-6xl" aria-label="Our Team">Our Team</section>
          <section className="h-screen flex items-center justify-center bg-gray-500 text-white text-6xl" aria-label="Last Talk">Last Talk</section>
          <section className="h-screen flex items-center justify-center bg-gray-500 text-white text-6xl" aria-label="Contact">Contact</section>
        </div>
      </div>
    </>
  );
}