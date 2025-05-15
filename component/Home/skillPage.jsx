"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Skillpage() {
  const skills = [
    { name: "HTML", image: "/skill/Html.png" },
    { name: "Css", image: "/skill/Css.png" },
    { name: "Node.js", image: "/skill/Node.png" },
    { name: "React", image: "/skill/React.png" },
    { name: "Next.js", image: "/skill/Next.png" },
    { name: "Tailwind", image: "/skill/Tailwind.png" },
    { name: "Bulma", image: "/skill/Bulma.png" },
    { name: "MySql", image: "/skill/Mysql.png" },
    { name: "Postgre Sql", image: "/skill/Postgre.png" },
    { name: "MongoDB", image: "/skill/Mongo.png" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="flex flex-col items-center gap-6 md:gap-10 py-28 px-4"
      id="skill"
    > 
      <h1 className="text-5xl font-bold mb-4 text-[var(--primary)]">
          What I <span className="text-[var(--teks)]">Use?</span>
        </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
        {skills.map((skill, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, threshold: 0.3 });

          const direction = index % 2 === 0 ? -50 : 50;

          return (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, x: direction }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center bg-[#1f1f1f] rounded-xl p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 min-h-[200px]"
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
  );
}
