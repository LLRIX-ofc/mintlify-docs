document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".param-name a").forEach(link => {
    // Extract the param name from href like '#param-TITLE'
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#param-")) return;

    const paramName = href.replace("#param-", "");

    // Override click to redirect to your desired URL
    link.addEventListener("click", event => {
      event.preventDefault();
      window.location.href = `/instructions#${paramName.toLowerCase()}`;
    });

    // Optional: update href for SEO/fallback
    link.setAttribute("href", `/instructions#${paramName.toLowerCase()}`);

    // Make sure cursor indicates it's clickable
    link.style.cursor = "pointer";
  });
});

console.log("Custom.js is loaded!");

