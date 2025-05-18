import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCode, FaGithub } from "react-icons/fa";

// Komponen animasi teks ketik
const TypingText = ({ text = "", speed = 150, delay = 1500 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // reset saat text berubah
    if (!text) return;

    let index = 0;
    let timeoutId;

    const startTyping = () => {
      const type = () => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index < text.length) {
          timeoutId = setTimeout(type, speed);
        }
      };
      type();
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  return (
    <p className="text-xl font-bold text-[var(--teks-secondary)]">
      {displayedText || "\u00A0"}
    </p>
  );
};

// Komponen layar loading
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
      <div className="flex gap-3 mb-4">
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

      {/* Teks "Portofolio Website" */}
      <div className="flex gap-3 mt-4">
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

      {/* Animasi teks ketik */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
        className="mt-4 absolute md:bottom-62 bottom-87"
      >
        <TypingText text="Athela09.vercel.app" speed={150} />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
