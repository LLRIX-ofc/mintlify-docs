document.addEventListener("DOMContentLoaded", () => {
  // Find all ParamField rendered containers
  document.querySelectorAll('[data-param-query]').forEach(el => {
    const queryValue = el.getAttribute('data-param-query');
    
    // We only target ones where you want instructions behavior
    // This checks for a keyword in the query or your own condition
    if (queryValue && el.innerText.toLowerCase().includes('instructions')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        window.location.href = `/instructions#${queryValue}`;
      });
    }
  });
});
