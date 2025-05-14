// components/EmailButton.jsx
export default function EmailButton() {
  const handleEmail = () => {
    const email = "youremail@gmail.com"; // Ganti dengan email kamu
    const subject = encodeURIComponent("Pesan Otomatis");
    const body = encodeURIComponent("Halo, ini pesan otomatis dari tombol.");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <button
      onClick={handleEmail}
      className="bg-[var(--primarry)] text-[var(--teks)] hover:bg-[var(--primarry)]/20 px-6 py-3 rounded-lg font-medium transition-all w-full sm:w-auto"
    >
      Contact Me
    </button>
  );
}
