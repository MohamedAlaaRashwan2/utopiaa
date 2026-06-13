import { useEffect, useRef } from "react";
import Styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let filled = false;

    const fillCanvas = () => {
      const w = canvas.width;
      const h = canvas.height;

      // الخلفية السوداء
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#2e2157";
      ctx.fillRect(0, 0, w, h);

      // النص في النص
      // ctx.font = "bold 72px 'Acumin Pro', sans-serif";
      // ctx.fillStyle = "#ffffff";
      // ctx.textAlign = "center";
      // ctx.textBaseline = "middle";
      // ctx.letterSpacing = "8px";
      // ctx.fillText("UTOPIA MARKETING", w / 2, h / 2);

      filled = true;
    };

    const ro = new ResizeObserver(() => {
      const w = section.offsetWidth;
      const h = section.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width  = w;
      canvas.height = h;
      fillCanvas();
      ro.disconnect();
    });

    ro.observe(section);

    const reveal = (x: number, y: number) => {
      if (!filled) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 80, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      reveal(e.clientX - rect.left, e.clientY - rect.top);
    };

    section.addEventListener("mousemove", handleMove);

    return () => {
      ro.disconnect();
      section.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const textStyle: React.CSSProperties = {
    position:      "absolute",
    bottom:        "-15px",
    left:          0,
    right:         0,
    textAlign:     "center",
    pointerEvents: "none",
  };

  return (
    <div
      ref={sectionRef}
      style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}
    >
      {/* z:1 — Aurora + النص الأبيض في نفس الطبقة */}
      {/* <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundColor: "#000" }}>
        <Aurora
          colorStops={["#2e2157", "#4f029d", "#28c8b6"]}
          amplitude={1}
          blend={0.5}
        />
      </div> */}
        <div style={{ ...textStyle, zIndex: 3 }}>
          <h1
            className={Styles.hero_h1}
            style={{ textTransform: "uppercase", color: "#fff" }}
          >
            Welcome to our world
          </h1>
        </div>

      {/* z:2 — الـ canvas الأسود بيغطي Aurora والنص الأبيض */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 2 }}
      />

    </div>
  );
}