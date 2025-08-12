document.addEventListener("DOMContentLoaded", function () {
    // Select all parameter links
    const paramLinks = document.querySelectorAll('a[href^="#param-"]');

    paramLinks.forEach(link => {
        // Extract the query name from the href (#param-title -> title)
        const queryName = link.getAttribute("href").replace("#param-", "").trim();

        // Example condition: if the query name matches one you want to redirect
        // Here I’m assuming all params should go to /instructions#<queryName>
        link.setAttribute("href", `/instructions#${queryName}`);
        
        // Ensure the click behavior navigates there
        link.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = `/instructions#${queryName}`;
        });
    });
});


console.log("Custom.js is loaded!");

