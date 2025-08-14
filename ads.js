const script = document.createElement('script');
script.async = true;
script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5615292244322800";
script.crossOrigin = "anonymous";
script.onload = () => {
    console.log("Custom.js is loaded!");
};
document.head.appendChild(script);
