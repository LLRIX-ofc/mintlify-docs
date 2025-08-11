document.addEventListener("DOMContentLoaded", () => {
  const anchors = document.querySelectorAll('paramfield a[href^="#param-"]');

  anchors.forEach(anchor => {
    const originalHref = anchor.getAttribute('href'); // e.g. "#param-TITLE"
    if (!originalHref) return;

    // Extract the query part after "#param-"
    const query = originalHref.replace('#param-', '').toLowerCase();

    // Replace href to /instructions#query
    anchor.setAttribute('href', `/instructions#${query}`);
  });
});



console.log("Custom.js is loaded!");

