"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Skillpage() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, {
    once: true,
    threshold: 0.3,
  });

  const skills = [
    { name: "HTML", image: "/skill/Html.png" },
    { name: "CSS", image: "/skill/Css.png" },
    { name: "Node.js", image: "/skill/Node.png" },
    { name: "React", image: "/skill/React.png" },
    { name: "Next.js", image: "/skill/Next.png" },
    { name: "Tailwind", image: "/skill/Tailwind.png" },
    { name: "MySQL", image: "/skill/Mysql.png" },
    { name: "PostgreSQL", image: "/skill/Postgre.png" },
  ];

  return (
    // 👇 ID di section terpisah, pakai scroll-mt agar tidak tertutup navbar
    <section id="skill" className="scroll-mt-2">
      <motion.div
        ref={containerRef}
        initial={{ y: 100, opacity: 0 }}
        animate={isContainerInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-6 md:gap-10 px-4 py-28"
      >
        <h1 className="text-5xl font-bold mb-4 text-[var(--primary)]">
          What I <span className="text-[var(--teks)]">Use?</span>
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
          {skills.map((skill, index) => {
            const itemRef = useRef(null);
            const isInView = useInView(itemRef, {
              once: true,
              threshold: 0.3,
            });

            return (
              <motion.div
                key={index}
                ref={itemRef}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center bg-[#1f1f1f] rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 min-h-[200px]"
              >
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <p className="text-[var(--teks)] mt-4 font-semibold text-lg text-center">
                  {skill.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
