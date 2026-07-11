"use client";

import { motion } from "framer-motion";
import { journey } from "@/data/content";

export function Journey() {
  return (
    <section
      id="journey"
      className="py-24 sm:py-32 px-6 bg-transparent w-full relative"
      aria-labelledby="journey-heading"
    >
      <div className="max-w-2xl mx-auto">
        {/* هيدر القسم المتناسق */}
        <div className="mb-16 flex flex-col gap-2">
          <div className="mb-1 flex items-center gap-3 select-none">
            <span className="font-mono text-xs text-blue-400">[04]</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Journey</span>
          </div>
          <h2
            id="journey-heading"
            className="text-4xl font-black text-white tracking-tight font-display"
          >
            How I{" "}
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]">
              got here.
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* 💡 لمسة احترافية 1: خط عمودي متدرج يبدأ من إضاءة زرقاء وينتهي بشفافية تامة لتأثير متلاشي أنيق */}
          <div
            className="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/40 via-white/10 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <ol className="space-y-8" role="list">
            {journey.map((m, i) => (
              <motion.li
                key={m.period}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-14 group"
              >
                {/* النقاط الجانبية للتايم لاين بـ Glassmorphism معزز */}
                <span
                  className={`absolute left-0 top-1.5 size-10 rounded-full bg-[#070614]/80 border flex items-center justify-center transition-all duration-500 backdrop-blur-xl select-none ${
                    m.active
                      ? "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.25)] ring-1 ring-blue-500/20"
                      : "border-white/[0.06] group-hover:border-white/20"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`size-2.5 rounded-full transition-all duration-500 ${
                      m.active
                        ? "bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"
                        : "bg-white/20 group-hover:bg-blue-400/60"
                    }`}
                  />
                </span>

                {/* 💡 لمسة احترافية 2: الكارت الزجاجي الشفاف الكامل المتناسق مع الهوية الجديدة للموقع */}
                <div 
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-500 p-5 sm:p-6 backdrop-blur-xl ${
                    m.active 
                      ? "border-blue-500/20 bg-white/[0.04] shadow-[0_15px_35px_-15px_rgba(59,130,246,0.15)]" 
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {/* إضاءة نيون خلفية ناعمة جداً تظهر فقط داخل الكارت النشط */}
                  {m.active && (
                    <div 
                      className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-transparent pointer-events-none"
                      style={{ filter: "blur(10px)" }}
                    />
                  )}

                  <time
                    dateTime={m.period}
                    className={`text-xs font-mono tracking-widest block mb-2 font-bold transition-colors duration-300 ${
                      m.active ? "text-blue-400" : "text-white/40 group-hover:text-blue-400/80"
                    }`}
                  >
                    {m.period}
                  </time>
                  
                  <h3 className="text-white/95 group-hover:text-white transition-colors duration-300 text-lg font-bold tracking-tight mb-2 font-display">
                    {m.title}
                  </h3>
                  
                  <p className="text-sm text-white/60 leading-relaxed font-sans font-normal transition-colors duration-300 group-hover:text-white/70">
                    {m.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}