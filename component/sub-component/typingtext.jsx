import { useState, useEffect } from "react";

const TypingText = ({ text = "", speed = 150, delay = 1500 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // reset saat text berubah
    if (!text) return;

    let index = 0;
    let timeoutId;

    const startTyping = () => {
      const type = () => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index < text.length) {
          timeoutId = setTimeout(type, speed);
        }
      };
      type();
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  return (
    <p className="text-base md:text-xl font-bold text-[var(--teks-secondary)]">
      {displayedText || "\u00A0"}
    </p>
  );
};

export default TypingText;