document.querySelectorAll(".menu-toggle").forEach((button) => {
  const nav = document.getElementById(button.getAttribute("aria-controls"));

  if (!nav) {
    return;
  }

  const closeMenu = () => {
    button.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});


/* ================================
   BÜRO GALERIE SLIDER
================================ */

document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(
    "#buero-galerie .gallery-grid"
  );

  const prevButton = document.querySelector(
    "#buero-galerie .slider-prev"
  );

  const nextButton = document.querySelector(
    "#buero-galerie .slider-next"
  );

  if (!slider || !prevButton || !nextButton) return;

  function getScrollAmount() {
    const item = slider.querySelector(".gallery-item");

    if (!item) return 300;

    const gap = parseFloat(
      getComputedStyle(slider).columnGap
    ) || 0;

    return item.getBoundingClientRect().width + gap;
  }

  function updateButtons() {
    prevButton.disabled = slider.scrollLeft <= 2;

    nextButton.disabled =
      slider.scrollLeft + slider.clientWidth >=
      slider.scrollWidth - 2;
  }

  prevButton.addEventListener("click", () => {
    slider.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  nextButton.addEventListener("click", () => {
    slider.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

  slider.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  updateButtons();

});

/* ==================================
   GALERIE SLIDER - ALLE GALERIEN
================================== */

document.addEventListener("DOMContentLoaded", () => {

  const sliders = document.querySelectorAll(
    ".gallery-slider"
  );

  sliders.forEach(sliderContainer => {

    const track = sliderContainer.querySelector(
      ".gallery-grid"
    );

    const prevButton = sliderContainer.querySelector(
      ".slider-prev"
    );

    const nextButton = sliderContainer.querySelector(
      ".slider-next"
    );

    if (!track || !prevButton || !nextButton) {
      return;
    }

    function getScrollAmount() {
      const item = track.querySelector(".gallery-item");

      if (!item) return 300;

      const gap = parseFloat(
        getComputedStyle(track).gap
      ) || 0;

      return item.getBoundingClientRect().width + gap;
    }

    function updateButtons() {
      const maxScroll = track.scrollWidth - track.clientWidth;

      prevButton.disabled = track.scrollLeft <= 2;

      nextButton.disabled =
        track.scrollLeft >= maxScroll - 2;
    }

    prevButton.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });

    nextButton.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });

    track.addEventListener("scroll", updateButtons);

    window.addEventListener("resize", updateButtons);

    updateButtons();

  });

});


/* ==================================
   FOTO LIGHTBOX - GALERIE
================================== */

document.addEventListener("DOMContentLoaded", () => {

  const galleryItems = document.querySelectorAll(
    ".gallery-item"
  );

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImage || !closeButton) {
    console.warn("Lightbox HTML fehlt.");
    return;
  }

  let lastFocusedElement = null;

  function openLightbox(item) {
    const image = item.querySelector("img");

    const imageSource =
      item.dataset.image || image?.getAttribute("src");

    if (!imageSource) return;

    lastFocusedElement = item;

    lightboxImage.src = imageSource;
    lightboxImage.alt = image?.alt || "Galeriebild";

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
    lightboxImage.removeAttribute("src");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      openLightbox(item);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      lightbox.classList.contains("active")
    ) {
      closeLightbox();
    }
  });

});
