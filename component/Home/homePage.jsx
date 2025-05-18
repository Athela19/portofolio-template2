"use client";
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  const roles = ["Frontend Developer", "Backend Developer", "Fullstack Developer"];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState([]);
  const [done, setDone] = useState(false);

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-_=+[]{};:<>?/";

  useEffect(() => {
    let target = roles[index];
    let iterations = 0;
    setDone(false);

    const interval = setInterval(() => {
      setDisplayed((prev) => {
        return target.split("").map((char, i) => {
          if (i < iterations) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        });
      });

      iterations++;
      if (iterations > target.length) {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % roles.length);
        }, 2000); // waktu diam sebelum kalimat baru
      }
    }, 75);

    return () => clearInterval(interval);
  }, [index]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <div
      className="flex flex-col md:flex-row-reverse md:justify-between items-center min-h-screen px-6 md:px-28 py-24 bg-[var(--background)]"
      id="home"
    >
      {/* Kanan */}
      <motion.div
        ref={ref}
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative w-70 h-70 md:w-115 md:h-115 border-4 border-[var(--primary)] rounded-full overflow-hidden shadow-lg"
      >
        <Image
          src="/foto/syarif.jpg"
          alt="Foto Profil"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Kiri */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center md:text-left max-w-xl mt-0"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mt-4 leading-tight">
          Hi, I'm
        </h1>
        <h1 className="text-3xl md:text-[40px] font-bold text-[var(--teks)] mb-2 leading-tight">
          Muhammad Syarif Nurrohman
        </h1>

        <div className="h-10 text-xl md:text-2xl font-mono text-[var(--primary)] mt-2 whitespace-nowrap overflow-hidden tracking-wide">
          {displayed.join("")}
        </div>

        <p className="text-md md:text-lg text-[var(--teks)] mt-6 mb-6">
         Creating revolutionary digital solutions with interactive frontends and scalable backends for a seamless and innovative user experience.
        </p>
        <div className="flex gap-4 items-center justify-center md:justify-start">
          <Link
            href="#contact"
            className=" border-2 border-solid border-[var(--primary)] bg-[var(--primary)] text-[var(--teks)] py-4 px-3 rounded-xl font-semibold hover:bg-[var(--background)]"
          >
            Contact Me
          </Link>
          <a
            href="/CV_MUHAMAD SYARIF NURROHMAN.pdf"
            download
            className="border-2 border-solid border-[var(--primary)] bg-[var(--background)] text-[var(--teks)] py-4 px-6 rounded-xl font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
          >
            Download CV
          </a>
        </div>
      </motion.div>
    </div>
  );
}
