"use client";
// import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-[var(--background)] text-[var(--teks)] border-b border-solid border-[var(--primary)] py-4 px-8 fixed w-full z-50">
      {/* Logo */}

      <h1 className="text-3xl font-bold text-[var(--teks)]">
        Athela<span className="text-[var(--primary)]">09</span>.
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center">
        <li className="group">
          <a
            href="#"
            className="text-[var(--teks)] group-hover:text-[var(--primary)]"
          >
            Home
          </a>
          <span className="h-[3px] bg-[var(--primary)] block w-0 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group">
          <a
            href="#"
            className="text-[var(--teks)] group-hover:text-[var(--primary)]"
          >
            About
          </a>
          <span className="h-[3px] bg-[var(--primary)] block w-0 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group">
          <a
            href="#"
            className="text-[var(--teks)] group-hover:text-[var(--primary)]"
          >
            Skill
          </a>
          <span className="h-[3px] bg-[var(--primary)] block w-0 transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="group">
          <a
            href="#"
            className="text-[var(--teks)] group-hover:text-[var(--primary)]"
          >
            Project
          </a>
          <span className="h-[3px] bg-[var(--primary)] block w-0 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden text-2xl z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-1/2 h-screen bg-[var(--background)] text-[var(--teks)] pt-24 px-6 flex flex-col gap-6 transition-transform duration-500 items-center ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 text-xl">
          <li>
            <a href="#" onClick={() => setMenuOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setMenuOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setMenuOpen(false)}>
              Skill
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setMenuOpen(false)}>
              Project
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
