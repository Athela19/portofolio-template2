 export const handleEmail = () => {
    const email = "syarkev@gmail.com";
    const subject = encodeURIComponent("Pesan untuk Muhammad Syarif Nurrohman");
    const body = encodeURIComponent(
      "Halo, saya tertarik dengan anda, bisakah kita membicarakan lebih lanjut?"
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };
