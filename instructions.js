document.addEventListener("DOMContentLoaded", () => {
  // Select all <a> elements with href starting with "#param-"
  document.querySelectorAll('a[href^="#param-"]').forEach(link => {
    const paramName = link.getAttribute("href").replace("#param-", ""); // e.g., "title"
    
    // Only change if we want it to go to instructions
    // (You can change the condition below if you want it only for some params)
    link.setAttribute("href", `/instructions#${paramName}`);
    
    // Optional: open in same tab
    link.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = `/instructions#${paramName}`;
    });
  });
});
