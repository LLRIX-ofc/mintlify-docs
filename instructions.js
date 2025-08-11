document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".param-field").forEach(field => {
    const textContent = field.innerText.toLowerCase();

    if (textContent.includes("instructions")) {
      field.style.cursor = "pointer";

      // Extract first word as the query key (you can adjust this)
      const queryKey = field.innerText.split("\n")[0].trim();

      field.addEventListener("click", () => {
        window.location.href = `/instructions#${encodeURIComponent(queryKey)}`;
      });
    }
  });
});
