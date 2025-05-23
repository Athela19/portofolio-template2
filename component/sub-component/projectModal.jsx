"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjectModal({ project, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-[var(--background)] rounded-xl p-6 w-full max-w-4xl relative text-[var(--teks)] shadow-lg flex flex-col md:flex-row gap-6">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold text-[var(--teks)] hover:text-red-400"
        >
          &times;
        </button>

        {/* Gambar kiri */}
        <div className="w-full md:w-1/2 relative">
          <Image
            src={project.images[imageIndex]}
            alt={`${project.name} image ${imageIndex + 1}`}
            width={600}
            height={400}
            className="rounded-lg w-full h-auto object-cover"
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
                aria-label="Previous Image"
              >
                &#8249;
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
                aria-label="Next Image"
              >
                &#8250;
              </button>
            </>
          )}
        </div>

        {/* Deskripsi kanan */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left text-[var(--primary)]">
            {project.name}
          </h2>
          <p className="mb-4 text-sm text-justify">{project.deskripsi}</p>

          {/* Daftar teknologi/alat */}
          <div className="flex gap-3 mb-4 justify-center md:justify-start">
            {project.teknologi?.map((teknologiSrc, idx) => (
              <Image
                key={idx}
                src={teknologiSrc}
                alt="Teknologi"
                width={40}
                height={40}
                className="object-contain"
                priority={false}
              />
            ))}
          </div>

          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center md:text-left border-2 border-[var(--primary)] bg-[var(--primary)] text-[var(--teks)] py-2 px-4 rounded-xl font-semibold hover:bg-[var(--background)] transition-colors duration-300 w-full md:w-fit"
          >
            {project.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
