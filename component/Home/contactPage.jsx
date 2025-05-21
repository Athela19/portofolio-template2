import React, { useRef } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { handleEmail } from "../sub-component/email";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <div ref={ref} className="min-h-screen w-screen flex items-center justify-center bg-[var(--background)]" id="contact">
  <div className="flex flex-col md:flex-row w-full h-full px-8 md:px-24 py-12 md:py-0">
    
    {/* Gambar (Mobile: atas, Desktop: kiri) */}
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex justify-center items-center mb-8 md:mb-0 md:w-1/2"
    >
      <Image
        src="/foto/kontak.svg"
        alt="Contact"
        width={300}
        height={300}
        className="w-[250px] h-auto md:w-[500px]"
      />
    </motion.div>

    {/* Konten Teks */}
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex flex-col justify-center w-full md:w-1/2 text-left space-y-6"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--teks)]">
        Get <span className="text-[var(--primary)]">in Touch</span>
      </h1>
      <p className="flex flex-col gap-4 max-w-xl">
        <span className="inline-block w-30 h-0.5 bg-[var(--primary)]"></span>
        <span className="ml-8 inline-block w-30 h-0.5 bg-[var(--primary)]"></span>
      </p>
      <p className="text-base md:text-lg text-[var(--teks)] max-w-xl">
        Whether you have a question, a project idea, or just want to connect—
        I'd love to hear from you! Reach out via email or follow me on social
        media below.
      </p>
      <div className="flex gap-4 text-[var(--teks-secondary)] text-2xl">
        {/* Social Links */}
        <a href="https://www.instagram.com/athela_09?igsh=NnFzbXI2NmcyeXp3" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)]"><FaInstagram /></a>
        <a href="https://x.com/syarkev?t=i42dxz9syYUCD3ykNb47qQ&s=09" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)]"><FaTwitter /></a>
        <a href="https://www.linkedin.com/in/muhamad-syarif-nurrohman-2988aa324" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)]"><FaLinkedin /></a>
        <a href="https://github.com/Athela19" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)]"><FaGithub /></a>
        <button onClick={handleEmail} className="hover:text-[var(--primary)]"><FaEnvelope /></button>
      </div>
    </motion.div>
  </div>
</div>

  );
}
