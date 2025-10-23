export function initTheme() {
  const themeToggle = document.querySelector("#theme-toggle");

  let theme =
    localStorage.getItem("theme") ||
    (window.matchMedia("prefers-color-scheme: dark").matches
      ? "dark"
      : "light");

  if (theme === "dark") document.documentElement.classList.add("dark");

  themeToggle.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark");
  });
}
