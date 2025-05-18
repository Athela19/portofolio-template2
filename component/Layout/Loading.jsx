import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCode, FaGithub } from "react-icons/fa";
import TypingText from "../sub-component/typingtext";
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 5 }}
      className="fixed inset-0 z-50 bg-[var(--background)] flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      {/* Baris ikon */}
      <div className="flex gap-3 mb-2">
        {[FaCode, FaUser, FaGithub].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.3 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--teks-secondary)] text-[var(--teks-secondary)]"
          >
            <Icon className="text-2xl" />
          </motion.div>
        ))}
      </div>

      {/* Teks "Welcome To My" */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0 }}
        className="flex gap-2"
      >
        <h1 className="md:text-5xl text-2xl font-bold text-[var(--teks)]">Welcome</h1>
        {["To", "My"].map((word, i) => (
          <motion.div
            key={word}
            initial={{ x: -75, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 + i * 0.3 }}
          >
            <h1 className="md:text-5xl text-2xl font-bold text-[var(--teks)]">{word}</h1>
          </motion.div>
        ))}
      </motion.div>

      {/* Container untuk "Portofolio Website" dan teks typing */}
      <div className="flex flex-col items-center">
        {/* Teks "Portofolio Website" */}
        <div className="flex gap-3 md:mt-2 mt-1">
          {["Portofolio", "Website"].map((word, i) => (
            <motion.div
              key={word}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 + i * 0.3 }}
            >
              <h1 className="md:text-4xl text-2xl font-bold text-[var(--primary)]">{word}</h1>
            </motion.div>
          ))}
        </div>

        {/* Animasi teks ketik - sekarang menjadi bagian dari flow normal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
          className="md:mt-5 mt-3"
        >
          <TypingText text="athela09.vercel.app" speed={150} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
