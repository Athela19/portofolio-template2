"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";

const projects = [
  {
    name: "NFT Marketplace",
    images: [
      "/nft/kensa1.png", "/nft/kensa2.png", "/nft/kensa3.png", "/nft/kensa4.png",
      "/nft/kensa5.png", "/nft/kensa6.png", "/nft/kensa7.png", "/nft/kensa7.png"
    ],
    link: "https://rarible.com/athela09",
    deskripsi: "Kensa adalah koleksi NFT bertema karakter orisinal yang saya gambar sendiri menggunakan aplikasi Ibis Paint X. Koleksi ini terdiri dari berbagai versi karakter utama bernama Kensa, masing-masing memiliki tema dan nuansa berbeda, mulai dari gaya futuristik hingga sentuhan alam."
  },
  {
    name: "FastKnuck",
    images: [
      "/project/fastknuck/1.png", "/project/fastknuck/2.png", 
      "/project/fastknuck/3.png", "/project/fastknuck/4.png"
    ],
    link: "https://github.com/Athela19/fastknuck",
    deskripsi: "FastKnuck adalah website media sosial sederhana yang saya buat untuk tugas sekolah, terinspirasi dari Facebook. Website ini memungkinkan pengguna untuk login, membuat postingan, dan berinteraksi dalam tampilan yang intuitif dan responsif."
  },
];

const ITEMS_PER_PAGE = 3;

export default function Project() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 py-28 px-4" id="project">
      <h1 className="text-5xl font-bold mb-4 text-[var(--primary)] text-center">
        My <span className="text-[var(--teks)]">Portofolio</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {paginatedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      <div className="flex gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`w-8 h-8 rounded-full border font-semibold ${
              idx === currentPage
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--teks)]"
            }`}
            onClick={() => setCurrentPage(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
{selectedProject && (
  <div className="fixed inset-0 backdrop-blur-md bg-opacity-40 flex items-center justify-center z-50 px-4">
    <div className="bg-[var(--background)] rounded-xl p-6 w-full max-w-md relative text-[var(--teks)] shadow-lg">
      <button
        onClick={() => setSelectedProject(null)}
        className="absolute top-2 right-2 text-xl font-bold text-[var(--teks)]"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-2 text-center">{selectedProject.name}</h2>
      <p className="mb-4 text-sm text-justify">{selectedProject.deskripsi}</p>
      <Link
        href={selectedProject.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center border-2 border-solid border-[var(--primary)] bg-[var(--primary)] text-[var(--teks)] py-2 px-4 rounded-xl font-semibold hover:bg-[var(--background)] transition-colors duration-300"
      >
        Kunjungi Project
      </Link>
    </div>
  </div>
)}


    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const [imageIndex, setImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const nextImage = () => setImageIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className="cursor-pointer relative flex flex-col justify-between items-center bg-[#1f1f1f] rounded-xl p-6 shadow-lg min-h-[280px] hover:scale-105 transition-transform duration-300"
    >
      <div className="relative w-full h-40 flex items-center justify-center">
        <Image
          src={project.images[imageIndex]}
          alt={project.name}
          width={400}
          height={400}
          className="object-contain max-h-full"
        />

        {project.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
            >
              &lt;
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      <p className="text-[var(--teks)] mt-4 font-semibold text-lg text-center">
        {project.name}
      </p>
    </motion.div>
  );
}
