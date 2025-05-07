window.latexJsonp = window.latexJsonp || [];
window.latexJsonp.push((latex) => {
    window.addEventListener('load', function () {
        latex.run();
    });
});
