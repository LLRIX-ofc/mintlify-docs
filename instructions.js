document.addEventListener("DOMContentLoaded", function () {
    // Find all divs whose id starts with param-
    const paramDivs = document.querySelectorAll('div[id^="param-"]');

    paramDivs.forEach(div => {
        const id = div.id.replace("param-", "").trim();

        div.style.cursor = "pointer"; // make it look clickable

        div.addEventListener("click", function (e) {
            e.stopPropagation(); // prevent default behavior
            e.preventDefault();
            window.location.href = `/instructions#${id}`;
        });
    });
});


console.log("Custom.js is loaded!");

