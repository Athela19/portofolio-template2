"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const projects = [

  {
    name: "NFT Marketplace",
    images: ["/nft/kensa1.png", "/nft/kensa2.png", "/nft/kensa3.png", "/nft/kensa4.png",
    "/nft/kensa5.png", "/nft/kensa6.png", "/nft/kensa7.png", "/nft/kensa7.png"]
  },
 
];

const ITEMS_PER_PAGE = 3;

export default function Project() {
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 py-28 px-4" id="project">
      <h1 className="text-5xl font-bold mb-4 text-[var(--primary)] text-center">
        My <span className="text-[var(--teks)]">Portofolio</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {paginatedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* Pagination Global */}
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
    </div>
  );
}

function ProjectCard({ project }) {
  const [imageIndex, setImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const nextImage = () =>
    setImageIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () =>
    setImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );

  return (
    <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
    className="relative flex flex-col justify-between items-center bg-[#1f1f1f] rounded-xl p-6 shadow-lg min-h-[280px]"
  >
    {/* Wrapper gambar (tinggi tetap) */}
    <div className="relative w-full h-40 flex items-center justify-center">
      <Image
        src={project.images[imageIndex]}
        alt={project.name}
        width={200}
        height={400}
        className="object-contain max-h-full"
      />
  
      {project.images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
          >
            &lt;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  
    {/* Teks nama selalu di bawah */}
    <p className="text-[var(--teks)] mt-4 font-semibold text-lg text-center">
      {project.name}
    </p>
  </motion.div>
  
  );
}
