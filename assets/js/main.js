'use strict';

document.documentElement.classList.add('js');

const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sections = navLinks.reduce((result, link) => {
  const target = document.querySelector(link.getAttribute('href'));

  if (target instanceof HTMLElement && !result.includes(target)) {
    result.push(target);
  }

  return result;
}, []);

if (navLinks.length > 0 && sections.length > 0 && 'IntersectionObserver' in window) {
  const navLinkById = new Map(navLinks.map((link) => [link.getAttribute('href').slice(1), link]));

  const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const initialSectionId = navLinkById.has(window.location.hash.slice(1))
    ? window.location.hash.slice(1)
    : sections[0].id;

  setActiveLink(initialSectionId);

  const observer = new IntersectionObserver(
    (entries) => {
      const isNearPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      if (isNearPageBottom) {
        setActiveLink(sections[sections.length - 1].id);
        return;
      }
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleSections.length > 0) {
        setActiveLink(visibleSections[0].target.id);
        return;
      }

      const passedSections = sections.filter(
        (section) => section.getBoundingClientRect().top <= window.innerHeight * 0.35
      );

      if (passedSections.length > 0) {
        setActiveLink(passedSections[passedSections.length - 1].id);
      }
    },
    {
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0, 0.15, 0.4]
    }
  );

  sections.forEach((section) => observer.observe(section));

  window.addEventListener('hashchange', () => {
    const sectionId = window.location.hash.slice(1);

    if (navLinkById.has(sectionId)) {
      setActiveLink(sectionId);
    }
  });
}
