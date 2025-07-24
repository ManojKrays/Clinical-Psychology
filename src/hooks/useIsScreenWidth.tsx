import { useEffect, useState } from "react";

function useIsScreenWidth(targetWidth: number): boolean {
  const [matches, setMatches] = useState<boolean>(
    typeof window !== "undefined" && window.innerWidth === targetWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.innerWidth === targetWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [targetWidth]);

  return matches;
}

export default useIsScreenWidth;
