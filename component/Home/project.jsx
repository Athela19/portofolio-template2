"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import ProjectModal from "@/component/sub-component/projectModal";
import CommitHeatmap from "../sub-component/github";

const projects = [
  {
    name: "FastKnuck",
    images: [
      "/project/fastknuck/1.png",
      "/project/fastknuck/2.png",
      "/project/fastknuck/3.png",
      "/project/fastknuck/4.png",
    ],
    link: "https://github.com/Athela19/fastknuck",
    deskripsi:
      "FastKnuck is a simple social media website I created for a school project, inspired by Facebook. This website allows users to log in, create posts, and interact within an intuitive and responsive interface.",
    teknologi: ["/skill/Next.png", "/skill/Tailwind.png", "/skill/Postgre.png"],
  },
];

const ITEMS_PER_PAGE = 3;

export default function Project() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <div className="flex flex-col items-center py-24 px-4" id="project">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="flex flex-col md:flex-row items-center w-full max-w-6xl gap-12 mb-12">
          <div className="px-12">
            <h1 className="text-5xl font-bold md:mb-4 text-left">
              <span className="inline md:block text-[var(--primary)]">My</span>{" "}
              <span className="inline md:block text-[var(--teks)]">
                Projects
              </span>
            </h1>
          </div>

          <div className="md:border-l border-solid border-[var(--primary)] md:pl-12">
            <CommitHeatmap />
          </div>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {paginatedProjects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
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

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

function ProjectCard({ project, onClick }) {
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
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
              aria-label="Previous Image"
            >
              &#8249;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
              aria-label="Next Image"
            >
              &#8250;
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
