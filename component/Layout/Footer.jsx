"use client";

import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";
import { handleEmail } from "../sub-component/email";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="bg-[var(--background)] text-[var(--teks)] border-t border-solid border-[var(--primary)] py-10 px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-0"
      >
        {/* Logo (Desktop Only) */}
        <div className="hidden md:flex justify-center md:justify-start items-center border-b md:border-b-0 md:border-r border-solid border-[var(--teks-secondary)] px-0 md:px-16 pb-6 md:pb-0">
          <h1 className="text-3xl font-bold text-[var(--teks)] text-center md:text-left">
            Athela<span className="text-[var(--primary)]">09</span>.
          </h1>
        </div>

        {/* Menu + Contact */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-0 md:px-20 gap-10 md:gap-0">
          {/* Social Media */}
          <div className="flex flex-col gap-3 items-center order-2 md:order-2">
            <p className="font-bold text-2xl text-center">
              Social <span className="text-[var(--primary)]">Media</span>
            </p>
            <ul className="flex gap-6 text-2xl justify-center">
              <li>
                <a
                  href="https://www.instagram.com/athela_09?igsh=NnFzbXI2NmcyeXp3"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram className="hover:text-[var(--primary)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/syarkev?t=i42dxz9syYUCD3ykNb47qQ&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter className="hover:text-[var(--primary)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/muhamad-syarif-nurrohman-2988aa324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="hover:text-[var(--primary)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Athela19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] flex items-center space-x-2"
                >
                  <FaGithub />
                </a>
              </li>
              <li>
                <button
                  onClick={handleEmail}
                  type="button"
                  aria-label="Email"
                  className="hover:text-[var(--primary)]"
                >
                  <FaEnvelope />
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4 items-center text-center order-1 md:order-1">
            <ul className="flex flex-wrap gap-4 justify-center">
              <li>
                <a href="#home" className="hover:text-[var(--primary)]">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[var(--primary)]">
                  About
                </a>
              </li>
              <li>
                <a href="#skill" className="hover:text-[var(--primary)]">
                  Skill
                </a>
              </li>
              <li>
                <a href="#project" className="hover:text-[var(--primary)]">
                  Project
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[var(--primary)]">
                  Contact
                </a>
              </li>
            </ul>
            <p className="text-sm text-[var(--teks-secondary)]">
              &copy; 2023 Athela09
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
