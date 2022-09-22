import facepaint from "facepaint";

export const breakpoints = [769, 1025, 1200];

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp}px)`)
);

export const isMobile = window.innerWidth < 768;
