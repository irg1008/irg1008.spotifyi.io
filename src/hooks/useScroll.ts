import { useEffect } from "react";
import { animateScroll as animScroll } from "react-scroll";

const useScroll = (onScroll: () => void) => {
  useEffect(() => {
    // Call on load.
    onScroll();
    // Scroll listener => Scroll function.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    animScroll.scrollToTop({ duration: 800, smooth: "easeInOutQuint" });
    
  return { scrollToTop };
};

export default useScroll;
