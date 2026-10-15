import Lenis from "lenis";

let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const scrollToId = (id) => {
  const el = document.querySelector(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -76, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
