"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { handleEmail } from "../sub-component/email";

export default function Homepage() {
  const roles = ["Frontend Developer", "Backend Developer", "NFT Creator"];
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

  return (
    <div
      className="flex flex-col md:flex-row-reverse md:justify-between items-center min-h-screen px-6 md:px-28 py-16 bg-[var(--background)]"
      id="home"
    >

      {/* Kanan */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-70 h-70 md:w-100 md:h-100 border-4 border-[var(--primary)] rounded-full overflow-hidden shadow-lg"
      >
        <Image
          src="/syarif.jpg"
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
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-2 mt-4 leading-tight">
          Hi, I'm <span className="text-[var(--teks)]">Muhammad Syarif</span>
        </h1>

        <div className="h-10 text-xl md:text-2xl font-mono text-[var(--primary)] mt-2 whitespace-nowrap overflow-hidden tracking-wide">
          {displayed.join("")}
        </div>

        <p className="text-md md:text-lg text-[var(--teks)] mt-6 mb-6">
          Menyelami dunia web modern, membangun sistem backend yang tangguh, dan
          menciptakan karya NFT yang unik
        </p>
        <p className="text-md md:text-lg text-[var(--teks-secondary)] mt-6 mb-6">
          Meski baru memulai, semangat untuk terus belajar tak pernah padam!
        </p>
        <button
          onClick={handleEmail}
          className=" border-2 border-solid border-[var(--primary)] bg-[var(--primary)] text-[var(--teks)] py-2 px-3 rounded-xl text-semibold hover:bg-[var(--background)]"
        >
          Contact Me
        </button>
      </motion.div>
    </div>
  );
}
