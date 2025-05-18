"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Aboutpage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 1.0 });

  const gambar = [
    "/nft/kensa1.png",
    "/nft/kensa2.png",
    "/nft/kensa3.png",
    "/nft/kensa4.png",
  ];

  const [positions, setPositions] = useState(Array(gambar.length).fill(0));

  useEffect(() => {
    if (isInView) {
      const timers = gambar.map((_, index) =>
        setTimeout(() => {
          setPositions((prev) => {
            const newPos = [...prev];
            newPos[index] = index % 2 === 0 ? -24 : 24;
            return newPos;
          });
        }, 1000 + index * 300)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  return (
    <div
      className="flex flex-col md:flex-row md:justify-between items-center min-h-screen px-6 md:px-28 md:py-16 pt-24 bg-[var(--background)]"
      id="about"
    >
      {/* Heading (untuk mobile) */}
      <motion.div
        ref={ref}
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="mb-6 md:hidden"
      >
        <h1 className="text-4xl font-bold mb-6 text-[var(--teks)]">
          My <span className="text-[var(--primary)]">Journey</span>
        </h1>
      </motion.div>

      {/* Kiri: Gambar-gambar NFT */}
      <motion.div
        ref={ref}
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="grid grid-cols-4 gap-1"
      >
        {gambar.map((src, index) => (
          <motion.div
            key={index}
            initial={{ y: 0, opacity: 0 }}
            animate={
              isInView
                ? {
                    y: positions[index],
                    opacity: 1,
                  }
                : {}
            }
            transition={{ duration: 0.6 }}
            className="relative w-22 h-40 md:w-40 md:h-80 overflow-hidden rounded-xl shadow-lg transition-transform duration-500"
          >
            <Image
              src={src}
              alt={`Kensa #${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Kanan: Teks konten */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 md:mt-0 text-center md:text-left"
      >
        {/* Heading (untuk desktop) */}
        <h1 className="hidden md:block text-4xl md:text-5xl font-bold mb-6 text-[var(--teks)]">
          My <span className="text-[var(--primary)]">Journey</span>
        </h1>

        <div className="space-y-4 text-[var(--text)] max-w-md">
          <p>
            I am a <strong>full-stack developer</strong> focused on building
            responsive web applications using modern technologies such as{" "}
            <strong>React, Next.js, and Node.js</strong>.
          </p>
          <p>
            Every project I work on starts from real needs, and I always strive
            to complete it with clean code and user-friendly interfaces.
          </p>
          <p>
            Besides writing code, I also enjoy drawing. This hobby is not only a
            means of creative expression but also greatly helps me in designing
            UI that is aesthetic and intuitive. Many interface designs in my
            projects originate from hand sketches or visual ideas I create
            myself.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
