import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const initialValue = localStorage.getItem("colorMode") && false;
    setDarkMode(initialValue);
  }, []);
  useEffect(() => {
    localStorage.setItem("colorMode", JSON.stringify(isDarkMode));
    document.body.setAttribute("class", isDarkMode ? "dark" : "");
  }, [isDarkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
