"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        link.classList.remove('active'); // On nettoie d'abord
        const page = link.dataset.page;
        if (page && currentPath.includes(page)) {
            link.classList.add('active'); // On active celui qui correspond
        }
    });
});
