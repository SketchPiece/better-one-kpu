import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "./icons";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisibility() {
    if (
      document.documentElement.scrollTop > 300 ||
      document.body.scrollTop > 300
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="rounded-full border bg-white p-2.5 text-black shadow-lg transition-colors hover:bg-gray-100 dark:border-[#2E2E2E] dark:bg-dark-background dark:text-dark-accent dark:hover:bg-[#2E2E2E]"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
          >
            <Icons.arrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ScrollToTopButton;
