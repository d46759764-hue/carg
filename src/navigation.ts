document.addEventListener('DOMContentLoaded', () => {
  const currentPath: string = window.location.pathname;
  const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nav-link');

  navLinks.forEach((link: HTMLAnchorElement) => {
    link.classList.remove('active'); // On nettoie d'abord

    const page: string | undefined = link.dataset.page;
    if (page && currentPath.includes(page)) {
      link.classList.add('active'); // On active celui qui correspond
    }
  });
});
