document.addEventListener("DOMContentLoaded", () => {
  // Select all <ParamField> elements that have the "instructions" attribute
  const params = document.querySelectorAll('paramfield[instructions]');

  params.forEach(elem => {
    // Change cursor to pointer to show it is clickable
    elem.style.cursor = 'pointer';

    // Add click event listener
    elem.addEventListener('click', () => {
      // Get the "query" attribute value, e.g. TITLE
      const query = elem.getAttribute('query');
      if (!query) return;

      // Redirect to /instructions#query-in-lowercase
      window.location.href = `/instructions#${query.toLowerCase()}`;
    });
  });
});


console.log("Custom.js is loaded!");

