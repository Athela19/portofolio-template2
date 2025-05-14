"use client";

import {
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const handleEmail = () => {
    const email = "syarkev@gmail.com";
    const subject = encodeURIComponent("Pesan untuk Muhammad Syarif Nurrohman");
    const body = encodeURIComponent(
      "Halo, saya tertarik dengan anda, bisakah kita membicarakan lebih lanjut?"
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="bg-[var(--background)] text-[var(--teks)] border-t border-solid border-[var(--primary)] py-10 px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-0">
      {/* Logo */}
      <div className="flex justify-center md:justify-start items-center border-b md:border-b-0 md:border-r border-solid border-[var(--teks-secondary)] px-0 md:px-16 pb-6 md:pb-0 hidden md:flex">
        <h1 className="text-3xl font-bold text-[var(--teks)] text-center md:text-left">
          Athela<span className="text-[var(--primary)]">09</span>.
        </h1>
      </div>

      {/* Menu + Contact */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-0 md:px-20 gap-10 md:gap-0">

        {/* Social Icons */}
        <div className="flex flex-col gap-3 items-center order-1 md:order-2">
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
                href="https://x.com/Athela09?t=o6hWu-2GvvGWNhbYkZ1SOw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="hover:text-[var(--primary)]" />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6283821390354"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="hover:text-[var(--primary)]" />
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
        <div className="flex flex-col gap-4 items-center text-center order-2 md:order-1">
          <ul className="flex flex-wrap gap-4 justify-center">
            <li>
              <a href="#" className="hover:text-[var(--primary)]">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary)]">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary)]">
                Skill
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary)]">
                Project
              </a>
            </li>
          </ul>
          <p className="text-sm text-[var(--teks-secondary)]">
            &copy; 2023 Athela09
          </p>
        </div>
      </div>
    </div>
  );
}
