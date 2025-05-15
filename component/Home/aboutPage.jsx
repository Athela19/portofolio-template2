"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Aboutpage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const gambar = [
    "/nft/kensa1.png",
    "/nft/kensa2.png",
    "/nft/kensa3.png",
    "/nft/kensa4.png",
  ];

  const [positions, setPositions] = useState(Array(gambar.length).fill(0)); // [0, 0, 0, 0]

  useEffect(() => {
    if (isInView) {
      // Setelah animasi masuk (1 detik), geser satu per satu
      const timers = gambar.map(
        (_, index) =>
          setTimeout(() => {
            setPositions((prev) => {
              const newPos = [...prev];
              newPos[index] = index % 2 === 0 ? -24 : 24; // naik/turun bergantian
              return newPos;
            });
          }, 1000 + index * 300) // jeda antar animasi 0.3 detik
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  return (
    <div
      className="flex flex-col md:flex-row md:justify-between items-center min-h-screen px-6 md:px-28 py-16 bg-[var(--background)]"
      id="about"
    >
      {/* kiri: gambar-gambar NFT */}
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

      {/* kanan: teks/konten */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="mt-12 md:mt-0 md:ml-16 text-center md:text-left"
      >
        <h1 className="text-5xl font-bold mb-4 text-[var(--teks)]">
          About <span className="text-[var(--primary)]">Me</span>
        </h1>
        <p className="text-[var(--teks)] max-w-md">
          Saya adalah seorang web developer dengan keahlian di bidang frontend
          dan backend, menguasai teknologi seperti React, Next, Node.js, HTML, MySQL,
          MongoDB, dan PostgreSQL.Selain itu, saya juga seorang NFT creator yang bersemangat
          mengeksplorasi dunia digital. 
        </p>
        <p className="text-[var(--teks)] max-w-md mt-4">
          Di luar pengembangan web, menggambar
          adalah salah satu hobi saya yang memberikan inspirasi dalam setiap
          proyek yang saya kerjakan. Saat ini, saya masih melanjutkan studi di
          SMKN 1 Cimahi dan berusaha untuk terus berkembang dan menciptakan
          karya inovatif di dunia web dan NFT.
        </p>
      </motion.div>
    </div>
  );
}
