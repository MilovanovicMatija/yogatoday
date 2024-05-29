let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

let animation;
let isTransitioningToLocations = false;
let isTransitioningToHero = false;
let loopAnimation;

// Sections
let heroSection = document.querySelector(".home-page .main-wrapper .hero");
let locationsSection = document.querySelector(".home-page .main-wrapper .locations");
let instructorsSection = document.querySelector(".home-page .main-wrapper .instructors");
let classesSection = document.querySelector(".home-page .main-wrapper .classes");
let posesSection = document.querySelector(".home-page .main-wrapper .yoga-poses");
let blogSection = document.querySelector(".home-page .main-wrapper .blog-widget");
let followSection = document.querySelector(".home-page .main-wrapper .follow-us");
let footerSection = document.querySelector(".footer");

// Subsections
let classesContent = document.querySelector(".classes-content");
let blogContent = document.querySelector(".blog-widget-content");
let followHeading = document.querySelector(".follow-heading");
let followImages = document.querySelector(".instagram-feed");
let followSocial = document.querySelector(".follow-social-links");
let footerContent = document.querySelector(".footer-content");
let footerHeading = document.querySelector(".footer-heading");
let footerRow = document.querySelector(".footer-row");
let footerBottom = document.querySelector(".footer-bottom");

// Transitions
let transitions = document.querySelector(".transitions");
let heroImage = document.querySelector(".hero-ph-image");
let originalHeroHeight = getComputedStyle(heroImage).height;
let originalHeroWidth = getComputedStyle(heroImage).width;
let heroBubbleWrap = document.querySelector(".hero-bubble-wrap");
let originalHeroBubbleWrapWidth = getComputedStyle(heroBubbleWrap).width;
let locationToInstructorsTransition = document.querySelector(".locations-to-instructors");
let locToInstContainer = document.querySelector(".loc-to-inst-container");
let locToInstBubble = document.querySelector(".loc-to-inst-bubble");
let locToInstBubbleBackground = document.querySelector(".loc-to-inst-bubble-background");
let locToInstBubbleWrap = Snap(".loc-to-inst-bubble-wrap");
let locToInstBubblePath = locToInstBubbleWrap.select("path");
let locToSlideBackground = document.querySelector(".loc-to-inst-slide-background");
let yogaPosesBubble = document.querySelector("#transition-3-bubble");
let blogWidgetBubble = document.querySelector(".yoga-to-blog-shape");
let blogWidgetImage = document.querySelector(".blog-widget-heading-image");
let blogWidgetImageHeight = getComputedStyle(blogWidgetImage).height;
let blogWidgetImageWidth = parseFloat(blogWidgetImageHeight) * 1.2 + "px";
let blogWidgetImageLeft = viewportWidth - parseFloat(blogWidgetImageHeight) * 1.2 + "px";
let blogWidgetImageBottom = viewportHeight - parseFloat(blogWidgetImageHeight) + "px";
let followWidgetBubble = document.querySelector(".blog-to-follow-shape");

let overlayTransitions = document.querySelector(".overlay-bg");

const sections = document.querySelectorAll(".home-page .main-wrapper > section");
const totalSections = sections.length;

const mainWrapper = document.querySelector(".main-wrapper");
let currentSectionIndex = 1;

let currentSlide = 0;
let numSlides = $("#slider .w-slide").length;

if (window.innerWidth >= 768) {
  let isScrolling = true;
} else {
  let isScrolling = false;
}

function initApp() {
  if (window.innerWidth >= 768) {
    setTimeout(function () {
      isScrolling = false;
    }, 100);

    // Recalculate on resize
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    originalHeroHeight = getComputedStyle(heroImage).height;
    originalHeroWidth = getComputedStyle(heroImage).width;
    originalHeroBubbleWrapWidth = getComputedStyle(heroBubbleWrap).width;

    blogWidgetImageHeight = getComputedStyle(blogWidgetImage).height;
    blogWidgetImageWidth = parseFloat(blogWidgetImageHeight) * 1.2 + "px";
    blogWidgetImageLeft = viewportWidth - parseFloat(blogWidgetImageHeight) * 1.2 + "px";
    blogWidgetImageBottom = viewportHeight - parseFloat(blogWidgetImageHeight) + "px";

    if (window.innerWidth <= 991) {
      lottiePath = "https://uploads-ssl.webflow.com/649c2309433fb54b2b5ba65c/64cff6576b645b27d64f9c25_yoga-hero-mob.json";
    } else {
      lottiePath = "https://uploads-ssl.webflow.com/649c2309433fb54b2b5ba65c/64c903e188a12c56d2150117_yoga-hero-main.json";
    }

    instructorsBubblePosition();
  }
}

blogBubbleSetup();
heroAnimation();

function scrollingToSections(targetSection) {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
  targetSection.classList.add("active");
}

function enableScroll() {
  setTimeout(function () {
    isScrolling = false;
  }, 1000);
}

function resetStates() {
  gsap.set([overlayTransitions, transitions, heroBubbleWrap, yogaPosesBubble, locToInstBubble], { opacity: "", zIndex: "" });

  locToInstContainer.removeAttribute("style");

  document.querySelectorAll(".locations-bubble-fill").forEach((element) => {
    element.style.opacity = "0";
    element.style.display = "none";
  });

  let instructors3elements = document.querySelectorAll(".instructors-slide:nth-child(-n+3)");
  instructors3elements.forEach((element) => {
    element.style.opacity = "";
  });

  locationToInstructorsTransition.classList.remove("gray-background");
  overlayTransitions.classList.remove("gray-background");
}

document.addEventListener("DOMContentLoaded", function () {
  function menuLinks(event) {
    const href = event.currentTarget.getAttribute("href");

    if (window.innerWidth > 768) {
      switch (href) {
        case "/#locations-slider":
          const targetSection1 = document.querySelector(`.main-wrapper [scroll-index="2"]`);
          scrollingToSections(targetSection1);
          currentSectionIndex = 2;
          resetStates();
          break;
        case "/#meet-the-instructors":
          const targetSection2 = document.querySelector(`.main-wrapper [scroll-index="3"]`);
          scrollingToSections(targetSection2);
          currentSectionIndex = 3;
          resetStates();

          gsap.set(overlayTransitions, { opacity: "1" });
          gsap.set(locToInstBubble, { opacity: "1" });

          if (window.innerWidth > 768) {
            var locToInstBubbleNewPath =
              "M-60,-11C-60,-11,-60,280,-60,280C-60,280,337,280,337,280C337,280,337,-11,337,-11C337,-11,-60,-11,-60,-11C-60,-11,-60,-11,-60,-11M174.02,211.768C131.853,234.24,90.096,240.85399999999998,60.43900000000001,229.186C30.123999999999995,217.26,21.283999999999992,172.589,38.43,120.747C55.57699999999999,68.906,94.945,29.334000000000003,154.335,44.793000000000006C201.657,57.11300000000001,232.289,86.571,243.077,112.054C260.283,152.693,219.531,187.518,174.02,211.768C174.02,211.768,174.02,211.768,174.02,211.768";
          } else {
            var locToInstBubbleNewPath =
              "M-59,-11C-59,-11,-59,280,-59,280C-59,280,340,280,340,280C340,280,340,-11,340,-11C340,-11,-59,-11,-59,-11C-59,-11,-59,-11,-59,-11M220.848,229.186C191.192,240.852,149.43200000000002,234.239,107.26600000000002,211.768C61.755000000000024,187.518,21.002000000000024,152.69400000000002,38.20800000000001,112.056C48.99600000000001,86.57300000000001,79.62800000000001,57.114000000000004,126.95000000000002,44.794C186.34000000000003,29.334999999999997,225.70800000000003,68.907,242.85500000000002,120.74799999999999C260.001,172.589,251.162,217.26,220.848,229.186C220.848,229.186,220.848,229.186,220.848,229.186";
          }

          locToInstBubblePath.animate({ d: locToInstBubbleNewPath }, 100, mina.easeinout);

          gsap.set(locToInstContainer, {
            width: transitionBubbleWidth,
            top: transitionBubbleTop,
            left: transitionBubbleLeft,
          });

          break;
        case "/#classes":
          const targetSection3 = document.querySelector(`.main-wrapper [scroll-index="4"]`);
          scrollingToSections(targetSection3);
          currentSectionIndex = 4;
          resetStates();

          var locToInstBubbleNewPath =
            "M-60,-11C-60,-11,-60,280,-60,280C-60,280,340,280,340,280C340,280,340,-11,340,-11C340,-11,-60,-11,-60,-11C-60,-11,-60,-11,-60,-11M336.395,276.063C335.166,278.825,-52.18800000000005,279.27,-56.32400000000001,275.063C-60,271.324,-56.27000000000001,-6,-56.269999999999996,-6C-50.748999999999995,-10.771999999999998,75.34699999999998,-6.455000000000002,81.24499999999998,-6.6129999999999995C90,-6.849000000000004,335.066,-7.498000000000005,336.461,-4.771000000000001C338.182,-1.4050000000000011,339.057,270.077,336.395,276.063C336.395,276.063,336.395,276.063,336.395,276.063";

          locToInstBubblePath.animate({ d: locToInstBubbleNewPath }, 100, mina.easeout);

          overlayTransitions.classList.add("gray-background");
          locationToInstructorsTransition.classList.add("gray-background");

          var startingTop = (viewportHeight - yogaPosesBubble.offsetHeight) / 2;
          var startingLeft = (viewportWidth - yogaPosesBubble.offsetWidth) / 2;

          var yogaPosesBubbleFinalTop = viewportHeight * 0.9;

          gsap.set(yogaPosesBubble, { top: viewportHeight, opacity: 1 });

          if (window.innerWidth > 768) {
            gsap.set(yogaPosesBubble, {
              top: yogaPosesBubbleFinalTop,
              width: "150%",
              left: "-25%",
              right: "-25%",
            });
          } else {
            gsap.set(yogaPosesBubble, {
              top: yogaPosesBubbleFinalTop,
              width: "300%",
              left: "-125%",
              right: "-125%",
            });
          }

          break;
        case "/#yoga-poses":
          const targetSection4 = document.querySelector(`.main-wrapper [scroll-index="5"]`);
          scrollingToSections(targetSection4);
          currentSectionIndex = 5;
          resetStates();
          overlayTransitions.classList.add("gray-background");
          locationToInstructorsTransition.classList.add("gray-background");

          if (window.innerWidth > 768) {
            gsap.set(yogaPosesBubble, {
              top: "70px",
              width: "150%",
              left: "-25%",
              right: "-25%",
              opacity: "1",
            });
          } else {
            gsap.set(yogaPosesBubble, {
              top: "70px",
              width: "300%",
              left: "-125%",
              right: "-125%",
              opacity: "1",
            });
          }

          break;
        default:
          break;
      }
    }
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", menuLinks);
  });

  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const link = document.querySelector(`.nav-link[href="/#${hash}"]`);
    if (link) {
      link.click();
    }
  } else {
    gsap.to(heroBubbleWrap, { opacity: "1", duration: 0.5 });
  }
});

function heroAnimation() {
  if (animation) {
    animation.destroy();
  }

  let lottiePath;
  if (window.innerWidth <= 991) {
    lottiePath = "https://uploads-ssl.webflow.com/649c2309433fb54b2b5ba65c/64cff6576b645b27d64f9c25_yoga-hero-mob.json";
  } else {
    lottiePath = "https://uploads-ssl.webflow.com/649c2309433fb54b2b5ba65c/64c903e188a12c56d2150117_yoga-hero-main.json";
  }

  animation = bodymovin.loadAnimation({
    container: document.getElementById("lottie-bubble-wrap"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: lottiePath,
  });

let animationM = bodymovin.loadAnimation({
  container: document.getElementById("lottie-bubble-wrap-m"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: lottiePath,
});

  loopAnimation = gsap.to(
    { frame: 0 },
    {
      frame: 598,
      duration: 14,
      repeat: -1,
      ease: "none",
      onUpdate: function () {
        animation.goToAndStop(Math.round(this.targets()[0].frame), true);
      },
      onRepeat: function () {
        this.targets()[0].frame = 0;
      },
    }
  );
}

const meetTheInstructorsBtn = document.querySelector("#meet-the-instructors-btn");

meetTheInstructorsBtn.addEventListener("click", function () {
  const targetSection2 = document.querySelector(`.main-wrapper [scroll-index="3"]`);
  scrollingToSections(targetSection2);
  currentSectionIndex = 3;

  // Reset
  gsap.set([overlayTransitions, transitions, heroBubbleWrap, yogaPosesBubble, locToInstBubble], { opacity: "", zIndex: "" });

  locToInstContainer.removeAttribute("style");

  document.querySelectorAll(".locations-bubble-fill").forEach((element) => {
    element.style.opacity = "0";
    element.style.display = "none";
  });

  let instructors3elements = document.querySelectorAll(".instructors-slide:nth-child(-n+3)");
  instructors3elements.forEach((element) => {
    element.style.opacity = "";
  });

  locationToInstructorsTransition.classList.remove("gray-background");
  overlayTransitions.classList.remove("gray-background");

  gsap.set(overlayTransitions, { opacity: "1" });
  gsap.set(locToInstBubble, { opacity: "1" });

  if (window.innerWidth > 768) {
    var locToInstBubbleNewPath =
      "M-60,-11C-60,-11,-60,280,-60,280C-60,280,337,280,337,280C337,280,337,-11,337,-11C337,-11,-60,-11,-60,-11C-60,-11,-60,-11,-60,-11M174.02,211.768C131.853,234.24,90.096,240.85399999999998,60.43900000000001,229.186C30.123999999999995,217.26,21.283999999999992,172.589,38.43,120.747C55.57699999999999,68.906,94.945,29.334000000000003,154.335,44.793000000000006C201.657,57.11300000000001,232.289,86.571,243.077,112.054C260.283,152.693,219.531,187.518,174.02,211.768C174.02,211.768,174.02,211.768,174.02,211.768";
  } else {
    var locToInstBubbleNewPath =
      "M-59,-11C-59,-11,-59,280,-59,280C-59,280,340,280,340,280C340,280,340,-11,340,-11C340,-11,-59,-11,-59,-11C-59,-11,-59,-11,-59,-11M220.848,229.186C191.192,240.852,149.43200000000002,234.239,107.26600000000002,211.768C61.755000000000024,187.518,21.002000000000024,152.69400000000002,38.20800000000001,112.056C48.99600000000001,86.57300000000001,79.62800000000001,57.114000000000004,126.95000000000002,44.794C186.34000000000003,29.334999999999997,225.70800000000003,68.907,242.85500000000002,120.74799999999999C260.001,172.589,251.162,217.26,220.848,229.186C220.848,229.186,220.848,229.186,220.848,229.186";
  }

  locToInstBubblePath.animate({ d: locToInstBubbleNewPath }, 100, mina.easeinout);

  gsap.set(locToInstContainer, {
    width: transitionBubbleWidth,
    top: transitionBubbleTop,
    left: transitionBubbleLeft,
  });
});

function instructorsBubblePosition() {
  if (window.innerWidth > 768) {
    var secondBubbleElement = document.querySelectorAll(".instructors .w-slide:not([aria-hidden='true'])")[1];
    var bubbleFromClasses = secondBubbleElement.querySelector("svg");
  } else {
    var secondBubbleElement = document.querySelectorAll(".instructors .w-slide:not([aria-hidden='true'])")[0];
    var bubbleFromClasses = secondBubbleElement.querySelector("svg");
  }

  let instructors = document.querySelector(".instructors");
  let bubbleRect = bubbleFromClasses.getBoundingClientRect();
  let instructorsRect = instructors.getBoundingClientRect();
  let topSpace = bubbleRect.top - instructorsRect.top;
  let leftSpace = bubbleRect.left - instructorsRect.left;

  let = transitionBubbleWidth = `${bubbleRect.width}px`;
  let = transitionBubbleTop = transitionBubbleLocToInst = `${topSpace}px`;
  let = transitionBubbleLeft = `${leftSpace}px`;
}

function getCurrentBackground() {
  // Grab current slide picture
  let currentSlide = document.querySelector('#slider .w-slide:not([aria-hidden="true"])');
  let currentSlideStyle = window.getComputedStyle(currentSlide);
  let currentSlideImageURL = currentSlideStyle.backgroundImage.slice(4, -1).replace(/"/g, "");

  locToInstBubbleBackground.style.backgroundImage = "url(" + currentSlideImageURL + ")";

  // Get current classes slide
  if (window.innerWidth > 768) {
    var secondVisibleElement = document.querySelectorAll(".instructors .w-slide:not([aria-hidden='true'])")[1];
    var currentInsctructorBubble = secondVisibleElement.querySelector(".instructors-image");
  } else {
    var secondVisibleElement = document.querySelectorAll(".instructors .w-slide:not([aria-hidden='true'])")[0];
    var currentInsctructorBubble = secondVisibleElement.querySelector(".instructors-image");
  }

  let currentInstructorsSlideStyle = window.getComputedStyle(currentInsctructorBubble);
  let currentInstructorsBackgroundImageURL = currentInstructorsSlideStyle.backgroundImage.slice(4, -1).replace(/"/g, "");

  locToSlideBackground.style.backgroundImage = "url(" + currentInstructorsBackgroundImageURL + ")";
}

function blogBubbleSetup() {
  gsap.set(followWidgetBubble, {
    height: blogWidgetImageHeight,
    width: blogWidgetImageWidth,
    top: 0,
    right: 0,
  });
}

function heroToLocations() {
  setTimeout(function () {
    gsap.set(transitions, { zIndex: 3 });
  }, 300);

  gsap.to(".hero-info", { opacity: 0, y: "-50px", duration: 0.2 });
  gsap.set([".slide-info", ".meet-the-insctrutors"], { opacity: 0 });

  if (isTransitioningToLocations) return;
  isTransitioningToLocations = true;

  gsap.to(heroBubbleWrap, { maxWidth: viewportWidth, duration: 0.6 });
  gsap.to(".hero-ph-image", { width: "100%", height: "100%", duration: 0.7 });
  gsap.to(".hero-ph-info", { width: "0%", duration: 0.3 });
  gsap.to(".hero-ph-pad", { delay: 0.2, width: "0%", duration: 0.3 });
  gsap.to(".bubble-fill", { delay: 0.45, opacity: 0, duration: 0.3 });

  if (window.innerWidth > 991) {
  } else {
    gsap.to(overlayTransitions, { delay: 0.5, opacity: 0, duration: 0.3 });
    gsap.to(".hero-ph-image", { maxHeight: viewportHeight, duration: 0.7 });
    gsap.to(".hero-ph-pad", { delay: 0.2, height: "0%", duration: 0.3 });
  }

  loopAnimation.pause();

  gsap
    .to(
      { frame: 599 },
      {
        frame: 669,
        duration: 0.7,
        ease: "none",
        onUpdate: function () {
          animation.goToAndStop(Math.round(this.targets()[0].frame), true);
        },
        onComplete: function () {
          animation.pause();
          isTransitioningToLocations = false;
        },
      }
    )
    .play();

  gsap.to([".slide-info", ".meet-the-insctrutors"], {
    delay: 0.8,
    opacity: 1,
    duration: 0.3,
    onComplete: function () {
      gsap.set([".slide-info", ".meet-the-insctrutors"], { opacity: "" });
    },
  });

  // Reset values
  setTimeout(function () {
    gsap.set(heroBubbleWrap, { opacity: "", maxWidth: "" });
    gsap.set(overlayTransitions, { opacity: "" });
    gsap.set(transitions, { zIndex: "" });
  }, 800);

  setTimeout(function () {
    const targetSection = document.querySelector(`.main-wrapper [scroll-index="2"]`);
    scrollingToSections(targetSection);
  }, 400);

  enableScroll();
}

function locationsToHero() {
  gsap.to(transitions, { zIndex: 3, duration: 0 });

  gsap.to(".hero-info", { delay: 0.75, opacity: 1, y: 0, duration: 0.3 });

  overlayTransitions.style.opacity = "1";
  gsap.set(heroBubbleWrap, { opacity: 1 });

  if (isTransitioningToHero) return;
  isTransitioningToHero = true;

  gsap.to(".hero-bubble-wrap", { maxWidth: originalHeroBubbleWrapWidth, duration: 0.6 });
  gsap.to(".hero-ph-info", { delay: 0.3, width: "46%", duration: 0.3 });
  gsap.to(".hero-ph-pad", { delay: 0.2, width: "14%", duration: 0.3 });

  if (window.innerWidth > 991) {
    gsap.to(".hero-ph-image", { width: "40%", height: originalHeroHeight, duration: 0.6 });
  } else {
    gsap.to(".hero-ph-image", { maxHeight: originalHeroWidth, duration: 0.6 });
    gsap.to(".hero-ph-pad", { delay: 0.2, height: "14vw", duration: 0.3 });
  }

  document.querySelector(".hero-bubble-wrap").style.opacity = "1";
  document.querySelectorAll(".bubble-fill").forEach((element) => {
    element.style.opacity = "1";
  });

  gsap
    .to(
      { frame: 669 },
      {
        frame: 720,
        duration: 0.7,
        ease: "none",
        onUpdate: function () {
          animation.goToAndStop(Math.round(this.targets()[0].frame), true);
        },
        onComplete: function () {
          loopAnimation.restart();
          isTransitioningToHero = false;
        },
      }
    )
    .play();

  // Reset values
  setTimeout(function () {
    gsap.set(heroBubbleWrap, { maxWidth: "" });
    gsap.set(overlayTransitions, { opacity: "" });
    gsap.set(transitions, { zIndex: "" });
  }, 800);

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="1"]`);
  scrollingToSections(targetSection);

  enableScroll();
}

function locationsToInstructors() {
  gsap.set(heroBubbleWrap, { opacity: "0" });
  gsap.set(overlayTransitions, { opacity: "1" });
  gsap.set(transitions, { zIndex: 3 });
  gsap.set(locToInstBubble, { opacity: "1" });

  getCurrentBackground();

  document.querySelectorAll(".locations-bubble-fill").forEach((element) => {
    element.style.opacity = "0";
    element.style.display = "none";
  });

  gsap.to(".locations-bubble-fill", {
    opacity: 1,
    onComplete: function () {
      gsap.to(".locations-bubble-fill", {
        delay: 0.3,
        onComplete: function () {
          gsap.set(".locations-bubble-fill", { display: "none", opacity: "" });
        },
      });
    },
  });

  instructorsBubblePosition();

  let instructors3elements = document.querySelectorAll(".instructors-slide:nth-child(-n+3)");
  instructors3elements.forEach((element) => {
    element.style.opacity = "0";
  });

  if (window.innerWidth > 768) {
    var locToInstBubbleNewPath =
      "M-60,-11C-60,-11,-60,280,-60,280C-60,280,337,280,337,280C337,280,337,-11,337,-11C337,-11,-60,-11,-60,-11C-60,-11,-60,-11,-60,-11M174.02,211.768C131.853,234.24,90.096,240.85399999999998,60.43900000000001,229.186C30.123999999999995,217.26,21.283999999999992,172.589,38.43,120.747C55.57699999999999,68.906,94.945,29.334000000000003,154.335,44.793000000000006C201.657,57.11300000000001,232.289,86.571,243.077,112.054C260.283,152.693,219.531,187.518,174.02,211.768C174.02,211.768,174.02,211.768,174.02,211.768";
  } else {
    var locToInstBubbleNewPath =
      "M-59,-11C-59,-11,-59,280,-59,280C-59,280,340,280,340,280C340,280,340,-11,340,-11C340,-11,-59,-11,-59,-11C-59,-11,-59,-11,-59,-11M220.848,229.186C191.192,240.852,149.43200000000002,234.239,107.26600000000002,211.768C61.755000000000024,187.518,21.002000000000024,152.69400000000002,38.20800000000001,112.056C48.99600000000001,86.57300000000001,79.62800000000001,57.114000000000004,126.95000000000002,44.794C186.34000000000003,29.334999999999997,225.70800000000003,68.907,242.85500000000002,120.74799999999999C260.001,172.589,251.162,217.26,220.848,229.186C220.848,229.186,220.848,229.186,220.848,229.186";
  }

  let locToInstBubbleWrap = Snap(".loc-to-inst-bubble-wrap");
  let locToInstBubblePath = locToInstBubbleWrap.select("path");

  locToInstBubblePath.animate({ d: locToInstBubbleNewPath }, 400, mina.easeinout);

  gsap.to(locToInstBubbleBackground, { delay: 0.2, opacity: 0, duration: 0.6 });

  gsap.to(locToInstContainer, {
    width: transitionBubbleWidth,
    top: transitionBubbleTop,
    left: transitionBubbleLeft,
    duration: 0.7,
    delay: 0.2,
    ease: "power1.out",
    onComplete: function () {
      gsap.to(overlayTransitions, {
        opacity: 0,
        delay: 0.2,
        onComplete: function () {
          gsap.set(overlayTransitions, { opacity: "" });
        },
      });
      gsap.to(locToInstBubble, { delay: 0.5, opacity: 0 });
      gsap.set(".instructors-slide:nth-child(2)", { opacity: 1 });
      gsap.to(".instructors-slide:nth-child(1)", { delay: 0.2, opacity: 1, duration: 0.3 });
      gsap.to(".instructors-slide:nth-child(3)", { delay: 0.2, opacity: 1, duration: 0.3 });
    },
  });

  // Reset values
  setTimeout(function () {
    gsap.set(overlayTransitions, { opacity: "" });
    gsap.set(transitions, { zIndex: "" });
  }, 900);

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="3"]`);
  scrollingToSections(targetSection);

  setTimeout(function () {
    enableScroll();
  }, 900);
}

function instructorsToLocations() {
  gsap.set(transitions, { zIndex: 3 });
  setTimeout(function () {
    gsap.set(transitions, { zIndex: 1 });
  }, 900);

  getCurrentBackground();

  locToInstBubble.style.opacity = "1";
  overlayTransitions.style.opacity = "1";

  let instructors3elements = document.querySelectorAll(".instructors-slide:nth-child(-n+3)");
  instructors3elements.forEach((element) => {
    element.style.opacity = "0";
  });

  var locToInstBubbleNewPath =
    "M-60,-11C-60,-11,-60,280,-60,280C-60,280,340,280,340,280C340,280,340,-11,340,-11C340,-11,-60,-11,-60,-11C-60,-11,-60,-11,-60,-11M336.395,276.063C335.166,278.825,-52.18800000000005,279.27,-56.32400000000001,275.063C-60,271.324,-56.27000000000001,-6,-56.269999999999996,-6C-50.748999999999995,-10.771999999999998,75.34699999999998,-6.455000000000002,81.24499999999998,-6.6129999999999995C90,-6.849000000000004,335.066,-7.498000000000005,336.461,-4.771000000000001C338.182,-1.4050000000000011,339.057,270.077,336.395,276.063C336.395,276.063,336.395,276.063,336.395,276.063";

  let locToInstBubbleWrap = Snap(".loc-to-inst-bubble-wrap");
  let locToInstBubblePath = locToInstBubbleWrap.select("path");

  setTimeout(function () {
    locToInstBubblePath.animate({ d: locToInstBubbleNewPath }, 400, mina.easeout);
  }, 450);

  setTimeout(function () {
    document.querySelectorAll(".locations-bubble-fill").forEach((element) => {
      element.style.display = "block";
      element.style.opacity = "1";
    });
  }, 800);

  gsap.to(locToInstBubbleBackground, { opacity: 1, duration: 0.7 });

  gsap.to(locToInstContainer, {
    width: viewportWidth,
    top: "0",
    left: "0",
    duration: 0.7,
    //delay: 0.1,
    ease: "power1.out",
    onComplete: function () {
      gsap.to(overlayTransitions, { delay: 0.3, opacity: 0 });
      gsap.to(locToInstBubble, { delay: 0.2, opacity: 0 });
    },
  });

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="2"]`);
  scrollingToSections(targetSection);

  setTimeout(function () {
    enableScroll();
  }, 400);
}

function instructorsToClasses() {
  gsap.to(transitions, { zIndex: 3, duration: 0 });
  gsap.to(transitions, { delay: 0.9, zIndex: 1, duration: 0 });
  gsap.set(classesContent, { opacity: 0 });

  gsap.set(locToInstBubble, { opacity: 1 });
  gsap.set(locToInstBubbleBackground, { opacity: 0 });

  instructorsBubblePosition();

  if (window.innerWidth > 768) {
    var secondVisibleElement = document.querySelectorAll(".instructors .w-slide:not([aria-hidden='true'])")[1];
    var currentInsctructorBubble = secondVisibleElement.querySelector(".instructors-image");
  } else {
    var secondVisibleElement = document.querySelectorAll(".instructors .w-slide:not([aria-hidden='true'])")[0];
    var currentInsctructorBubble = secondVisibleElement.querySelector(".instructors-image");
  }

  let currentInstructorsSlideStyle = window.getComputedStyle(currentInsctructorBubble);
  let currentInstructorsSlideImageURL = currentInstructorsSlideStyle.backgroundImage.slice(4, -1).replace(/"/g, "");

  locToSlideBackground.style.backgroundImage = "url(" + currentInstructorsSlideImageURL + ")";

  var locToInstBubbleNewPath =
    "M-60,-11C-60,-11,-60,280,-60,280C-60,280,340,280,340,280C340,280,340,-11,340,-11C340,-11,-60,-11,-60,-11C-60,-11,-60,-11,-60,-11M336.395,276.063C335.166,278.825,-52.18800000000005,279.27,-56.32400000000001,275.063C-60,271.324,-56.27000000000001,-6,-56.269999999999996,-6C-50.748999999999995,-10.771999999999998,75.34699999999998,-6.455000000000002,81.24499999999998,-6.6129999999999995C90,-6.849000000000004,335.066,-7.498000000000005,336.461,-4.771000000000001C338.182,-1.4050000000000011,339.057,270.077,336.395,276.063C336.395,276.063,336.395,276.063,336.395,276.063";

  let locToInstBubbleWrap = Snap(".loc-to-inst-bubble-wrap");
  let locToInstBubblePath = locToInstBubbleWrap.select("path");

  setTimeout(function () {
    locToInstBubblePath.animate({ d: locToInstBubbleNewPath }, 400, mina.easeout);
  }, 450);

  setTimeout(function () {
    overlayTransitions.classList.add("gray-background");
  }, 700);

  gsap.to(locToSlideBackground, { opacity: 1, duration: 0.7 });

  gsap.to(locToInstContainer, {
    width: viewportWidth,
    top: "0",
    left: "0",
    duration: 0.6,
    delay: 0.1,
    ease: "power1.out",
    onComplete: function () {
      locationToInstructorsTransition.classList.add("gray-background");
      gsap.set(locToInstContainer, { opacity: "" });
      gsap.to(classesContent, {
        delay: 0.4,
        opacity: 1,
        duration: 0.4,
        onComplete: function () {
          gsap.set(classesContent, { opacity: "" });
          gsap.set(locToInstBubble, { opacity: "" });
          gsap.set(locToInstBubbleBackground, { opacity: "" });
          gsap.set(locToSlideBackground, { opacity: "" });
        },
      });
    },
  });

  gsap.to(locToInstBubble, { delay: 0.4, opacity: 0, duration: 0.4 });

  var startingTop = (viewportHeight - yogaPosesBubble.offsetHeight) / 2;
  var startingLeft = (viewportWidth - yogaPosesBubble.offsetWidth) / 2;

  var yogaPosesBubbleFinalTop = viewportHeight * 0.9;

  gsap.set(yogaPosesBubble, { top: viewportHeight, opacity: 1 });

  if (window.innerWidth > 768) {
    gsap.to(yogaPosesBubble, {
      width: "150%",
      left: "-25%",
      right: "-25%",
      duration: 0.6,
      ease: "power1.out",
      onComplete: function () {
        gsap.to(yogaPosesBubble, { delay: 0.3, top: yogaPosesBubbleFinalTop, duration: 0.3 });
      },
    });
  } else {
    gsap.to(yogaPosesBubble, {
      width: "300%",
      left: "-125%",
      right: "-125%",
      duration: 0.6,
      ease: "power1.out",
      onComplete: function () {
        gsap.to(yogaPosesBubble, { delay: 0.3, top: yogaPosesBubbleFinalTop, duration: 0.3 });
      },
    });
  }

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="4"]`);
  scrollingToSections(targetSection);

  setTimeout(function () {
    enableScroll();
  }, 800);
}

function classesToInstructors() {
  gsap.set(transitions, { zIndex: 3 });
  setTimeout(function () {
    gsap.set(transitions, { zIndex: 1 });
  }, 900);

  gsap.set(classesContent, { opacity: 0 });

  locToInstBubbleBackground.style.opacity = "0";
  locToSlideBackground.style.opacity = "1";

  gsap.to(locToInstBubble, { delay: 0.3, opacity: "1", duration: 0.4 });

  gsap.to(yogaPosesBubble, { delay: 0.3, opacity: "0", duration: 0.2 });

  gsap.to(overlayTransitions, {
    backgroundColor: "#f9f8f0",
    duration: 0.3,
    onComplete: function () {
      gsap.set(overlayTransitions, { clearProps: "all" });
      locationToInstructorsTransition.classList.remove("gray-background");
      overlayTransitions.classList.remove("gray-background");
    },
  });

  let instructors3elements = document.querySelectorAll(".instructors-slide:nth-child(-n+3)");
  instructors3elements.forEach((element) => {
    element.style.opacity = "0";
  });

  if (window.innerWidth > 768) {
    var locToInstBubbleNewPath =
      "M-60,-11C-60,-11,-60,280,-60,280C-60,280,337,280,337,280C337,280,337,-11,337,-11C337,-11,-60,-11,-60,-11C-60,-11,-60,-11,-60,-11M174.02,211.768C131.853,234.24,90.096,240.85399999999998,60.43900000000001,229.186C30.123999999999995,217.26,21.283999999999992,172.589,38.43,120.747C55.57699999999999,68.906,94.945,29.334000000000003,154.335,44.793000000000006C201.657,57.11300000000001,232.289,86.571,243.077,112.054C260.283,152.693,219.531,187.518,174.02,211.768C174.02,211.768,174.02,211.768,174.02,211.768";
  } else {
    var locToInstBubbleNewPath =
      "M-59,-11C-59,-11,-59,280,-59,280C-59,280,340,280,340,280C340,280,340,-11,340,-11C340,-11,-59,-11,-59,-11C-59,-11,-59,-11,-59,-11M220.848,229.186C191.192,240.852,149.43200000000002,234.239,107.26600000000002,211.768C61.755000000000024,187.518,21.002000000000024,152.69400000000002,38.20800000000001,112.056C48.99600000000001,86.57300000000001,79.62800000000001,57.114000000000004,126.95000000000002,44.794C186.34000000000003,29.334999999999997,225.70800000000003,68.907,242.85500000000002,120.74799999999999C260.001,172.589,251.162,217.26,220.848,229.186C220.848,229.186,220.848,229.186,220.848,229.186";
  }

  let locToInstBubbleWrap = Snap(".loc-to-inst-bubble-wrap");
  let locToInstBubblePath = locToInstBubbleWrap.select("path");

  locToInstBubblePath.animate({ d: locToInstBubbleNewPath }, 400, mina.easeinout);

  gsap.to(locToInstContainer, {
    width: transitionBubbleWidth,
    top: transitionBubbleTop,
    left: transitionBubbleLeft,
    duration: 0.7,
    delay: 0.2,
    ease: "power1.out",
    onComplete: function () {
      gsap.set(classesContent, { opacity: "" });
      gsap.to(locToInstBubble, { delay: 0.5, opacity: "" });
      gsap.set(".instructors-slide:nth-child(2)", { opacity: 1 });
      gsap.to(".instructors-slide:nth-child(1)", { delay: 0.2, opacity: 1, duration: 0.3 });
      gsap.to(".instructors-slide:nth-child(3)", { delay: 0.2, opacity: 1, duration: 0.3 });
      gsap.set(yogaPosesBubble, { opacity: "" });
      setTimeout(function () {
        gsap.set(locToInstBubbleBackground, { opacity: "" });
        gsap.set(locToSlideBackground, { opacity: "" });
      }, 200);
    },
  });

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="3"]`);

  setTimeout(function () {
    scrollingToSections(targetSection);
  }, 400);

  setTimeout(function () {
    enableScroll();
  }, 1000);
}

function classesToPoses() {
  gsap.set(posesSection, { opacity: "0" });

  gsap.to(".classes-slider", {
    opacity: 0,
    duration: 0.3,
    onComplete: function () {
      gsap.to(".classes-slider", {
        opacity: 1,
        duration: 0.3,
        delay: 0.6,
      });
    },
  });

  setTimeout(function () {
    transitions.style.zIndex = "5";
    overlayTransitions.style.opacity = "1";
  }, 300);

  gsap.to(".yoga-poses-heading, .yoga-poses-table", {
    opacity: 0,
    duration: 0.3,
    onComplete: function () {
      setTimeout(function () {
        transitions.style.zIndex = "1";
        posesSection.removeAttribute("style");
      }, 600);
      gsap.to(".yoga-poses-heading, .yoga-poses-table", {
        opacity: 1,
        duration: 0.3,
        delay: 0.5,
      });
    },
  });

  gsap.to(yogaPosesBubble, { delay: 0.2, top: "70px", duration: 0.5 });

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="5"]`);
  scrollingToSections(targetSection);

  enableScroll();
}

function posesToClasses() {
  document.querySelector(".transitions").style.zIndex = "5";
  overlayTransitions.style.opacity = "1";
  yogaPosesBubble.style.zIndex = "5";

  var yogaPosesBubbleFinalTop = viewportHeight * 0.9;
  gsap.to(yogaPosesBubble, { delay: 0.2, top: yogaPosesBubbleFinalTop, duration: 0.5 });

  gsap.to(".classes-slider", {
    opacity: 0,
    duration: 0.3,
    onComplete: function () {
      setTimeout(function () {
        document.querySelector(".transitions").style.zIndex = "1";
      }, 600);
      gsap.to(".classes-slider", {
        opacity: 1,
        duration: 0.3,
        delay: 0.6,
      });
    },
  });

  gsap.to(".yoga-poses-heading, .yoga-poses-table", {
    opacity: 0,
    duration: 0.3,
    onComplete: function () {
      gsap.to(".yoga-poses-heading, .yoga-poses-table", {
        opacity: 1,
        duration: 0.3,
        delay: 0.6,
      });
    },
  });

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="4"]`);
  scrollingToSections(targetSection);

  enableScroll();
}

function posesToBlog() {
  gsap.to(".yoga-poses-heading", { opacity: 0, duration: 0.3 });
  gsap.to(".yoga-poses-table", { opacity: 0, duration: 0.3 });

  blogContent.style.opacity = "0";

  setTimeout(function () {
    yogaPosesBubble.style.zIndex = "5";
    document.querySelector(".transitions").style.zIndex = "5";
    overlayTransitions.style.opacity = "1";
  }, 300);

  gsap.to(yogaPosesBubble, {
    top: "-50%",
    duration: 0.5,
    onComplete: function () {
      blogWidgetBubble.style.opacity = "1";
      blogWidgetBubble.style.zIndex = "5";
      gsap.set(yogaPosesBubble, { opacity: "" });
    },
  });

  let blogWidgetBubbleSVG = Snap(blogWidgetBubble.querySelector("svg"));
  let yogaToBlogPath = blogWidgetBubbleSVG.select("path");

  let yogaToBlogNewPath = "M270,224c-53.9,2.8-95.7-0.1-145.6-20.5c-49.6-27.7-59.1-38.1-88.7-80.5C20.9,96.6,13,79.2,0,0h270V224z";

  setTimeout(function () {
    yogaToBlogPath.animate({ d: yogaToBlogNewPath }, 500);
    overlayTransitions.classList.remove("gray-background");
  }, 300);

  blogWidgetBubble.style.width = "250%";
  blogWidgetBubble.style.top = "-50%";
  blogWidgetBubble.style.left = "-100%";
  blogWidgetBubble.style.right = "-100%";
  blogWidgetBubble.style.bottom = "-50%";

  gsap.to(blogWidgetBubble, {
    height: blogWidgetImageHeight,
    width: blogWidgetImageWidth,
    top: 0,
    right: 0,
    left: blogWidgetImageLeft,
    bottom: blogWidgetImageBottom,
    delay: 0.5,
    duration: 0.5,
    onComplete: function () {
      gsap.to(blogWidgetBubble, { opacity: 0, duration: 0.3 });
      gsap.set(".yoga-poses-heading", { opacity: "" });
      gsap.set(".yoga-poses-table", { opacity: "" });
      gsap.to(overlayTransitions, { opacity: 0, duration: 0.3 });
      gsap.to(blogContent, { opacity: 1, duration: 0.3 });
      blogWidgetBubble.style.removeProperty("left");
      blogWidgetBubble.style.removeProperty("bottom");
    },
  });

  blogContent.style.opacity = "0";

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="6"]`);

  setTimeout(function () {
    scrollingToSections(targetSection);
  }, 300);

  enableScroll();
}

function blogToPoses() {
  gsap.to(blogContent, { opacity: 0, duration: 0.3 });
  gsap.to(overlayTransitions, { opacity: 1, duration: 0.3 });
  gsap.to(blogWidgetBubble, { opacity: 1, duration: 0.3 });
  gsap.to(".yoga-poses-heading", { opacity: 0 });
  gsap.to(".yoga-poses-table", { opacity: 0 });

  gsap.to(blogWidgetBubble, {
    height: "100%",
    width: "250%",
    top: "-50%",
    right: "-100%",
    left: "-100%",
    bottom: "-50%",
    delay: 0.3,
    duration: 0.5,
    onComplete: function () {
      blogWidgetBubble.style.opacity = "0";
      yogaPosesBubble.style.opacity = "1";
      overlayTransitions.classList.add("gray-background");

      gsap.to(".yoga-poses-heading", { delay: 0.7, opacity: 1, duration: 0.3 });
      gsap.to(".yoga-poses-table", { delay: 0.7, opacity: 1, duration: 0.3 });

      gsap.to(yogaPosesBubble, {
        top: "70px",
        duration: 0.5,
        onComplete: function () {
          document.querySelector(".transitions").style.zIndex = "1";
        },
      });
    },
  });

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="5"]`);

  setTimeout(function () {
    scrollingToSections(targetSection);
  }, 300);

  enableScroll();
}

function blogToFollow() {
  followWidgetBubble.innerHTML = "";
  let followSvgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  followSvgElement.setAttribute("viewBox", "0 0 270 270");
  let followPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  followPathElement.setAttribute("d", "M1.3,0C13-4.3,259.3-5,270,0c3.3,5.7,7.7,224.1-1.3,224c-119,1.7-156.2-16-209.2-67.2 C26.3,124.7,1.3,52.8,1.3,0z");
  followPathElement.setAttribute("fill", "#ffffff");
  followSvgElement.appendChild(followPathElement);
  followWidgetBubble.appendChild(followSvgElement);

  let followImage = document.querySelector(".follow-us-heading-image");
  let followImageWidth = getComputedStyle(followImage).width;
  let followImageHeight = getComputedStyle(followImage).width;
  let distanceToFollowTop = followImage.getBoundingClientRect().top - followSection.getBoundingClientRect().top + "px";
  let distanceToFollowRight = followSection.getBoundingClientRect().right - followImage.getBoundingClientRect().right + "px";

  gsap.set(transitions, { zIndex: 3 });
  setTimeout(function () {
    gsap.set(transitions, { zIndex: 1 });
  }, 1000);

  gsap.to(followWidgetBubble, { delay: 0.3, opacity: 1, duration: 0.3 });

  gsap.to(blogContent, { opacity: 0, duration: 0.3 });

  gsap.set([followHeading, followImages, followSocial], { opacity: 0 });

  gsap.to(followWidgetBubble, {
    width: followImageWidth,
    height: followImageHeight,
    top: distanceToFollowTop,
    right: distanceToFollowRight,
    duration: 0.7,
    //delay: 0.3,
    delay: 0,
    onComplete: function () {
      blogContent.removeAttribute("style");
      gsap.to(followWidgetBubble, { opacity: 0, duration: 0.3 });
      gsap.to(followHeading, { opacity: 1, duration: 0.3 });
      gsap.to(followImages, { delay: 0.3, opacity: 1, duration: 0.3 });
      gsap.to(followSocial, { delay: 0.3, opacity: 1, duration: 0.3 });
    },
  });

  let followWidgetBubbleSVG = Snap(followWidgetBubble.querySelector("svg"));
  let blogToFollowPath = followWidgetBubbleSVG.select("path");

  let blogToFollowNewPath = "M44.1,21.5C98.5-0.9,188.9-10,243.4,15c49.6,22.7,17.9,82.7-9.9,112c-57.5,60.3-156.5,36.3-211.8-16 C-15,76.3,2.6,38.7,44.1,21.5z";

  setTimeout(function () {
    blogToFollowPath.animate({ d: blogToFollowNewPath }, 300);
  }, 300);

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="7"]`);

  setTimeout(function () {
    scrollingToSections(targetSection);
    enableScroll();
  }, 300);
}

function followToBlog() {
  // Append new svg
  followWidgetBubble.innerHTML = "";
  let followSvgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  followSvgElement.setAttribute("viewBox", "0 0 270 270");
  let followPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  followPathElement.setAttribute("d", "M44.1,21.5C98.5-0.9,188.9-10,243.4,15c49.6,22.7,17.9,82.7-9.9,112c-57.5,60.3-156.5,36.3-211.8-16 C-15,76.3,2.6,38.7,44.1,21.5z");
  followPathElement.setAttribute("fill", "#ffffff");
  followSvgElement.appendChild(followPathElement);
  followWidgetBubble.appendChild(followSvgElement);

  let followImage = document.querySelector(".follow-us-heading-image");
  let followImageWidth = getComputedStyle(followImage).width;
  let followImageHeight = getComputedStyle(followImage).width;
  let distanceToFollowTop = followImage.getBoundingClientRect().top - followSection.getBoundingClientRect().top + "px";
  let distanceToFollowRight = followSection.getBoundingClientRect().right - followImage.getBoundingClientRect().right + "px";

  gsap.set(transitions, { zIndex: 3 });
  setTimeout(function () {
    gsap.set(transitions, { zIndex: 1 });
  }, 1000);

  gsap.set(blogContent, { opacity: 0 });
  gsap.set(blogWidgetImage, { opacity: 0 });
  gsap.to([followHeading, followImages, followSocial], { opacity: 0, duration: 0.3 });
  gsap.to(followWidgetBubble, { opacity: 1, duration: 0.3 });

  let followWidgetBubbleSVG = Snap(followWidgetBubble.querySelector("svg"));
  let blogToFollowPath = followWidgetBubbleSVG.select("path");

  let blogToFollowNewPath = "M1.3,0C13-4.3,259.3-5,270,0c3.3,5.7,7.7,224.1-1.3,224c-119,1.7-156.2-16-209.2-67.2 C26.3,124.7,1.3,52.8,1.3,0z";

  setTimeout(function () {
    blogToFollowPath.animate({ d: blogToFollowNewPath }, 300);
  }, 600);

  gsap.set(followWidgetBubble, {
    height: followImageWidth,
    width: followImageHeight,
    top: distanceToFollowTop,
    right: distanceToFollowRight,
  });

  gsap.to(followWidgetBubble, {
    width: blogWidgetImageWidth,
    height: blogWidgetImageHeight,
    top: "0",
    right: "0",
    duration: 0.7,
    //delay: 0.3,
    delay: 0,
    onComplete: function () {
      gsap.to(blogWidgetImage, { opacity: 1, duration: 0.3 });
      gsap.to(blogContent, { opacity: 1, duration: 0.3 });
      gsap.to(followWidgetBubble, { opacity: 0, duration: 0.3 });
      gsap.set([followHeading, followImages, followSocial], { opacity: 1 });
    },
  });

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="6"]`);
  scrollingToSections(targetSection);

  setTimeout(function () {
    enableScroll();
  }, 300);
}

function followToFooter() {
  gsap.to([followHeading, followImages, followSocial], { opacity: 0, duration: 0.3 });

  gsap.set(footerSection, { top: "calc(100vh + 30%)" });
  gsap.set([footerHeading, footerRow, footerBottom], { opacity: 0 });

  gsap.to(footerSection, {
    delay: 0.3,
    top: "0",
    duration: 0.6,
    onComplete: function () {
      footerSection.style.top = "";
      gsap.set([followHeading, followImages, followSocial], { opacity: "" });
      gsap.to([footerHeading, footerRow, footerBottom], { opacity: 1, duration: 0.3 });
    },
  });

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="8"]`);

  scrollingToSections(targetSection);

  enableScroll();
}

function footerToFollow() {
  gsap.set(footerSection, { opacity: "1" });
  gsap.set([followHeading, followImages, followSocial], { opacity: "0" });
  gsap.to([footerHeading, footerRow, footerBottom], { opacity: 0, duration: 0.3 });

  gsap.to(footerSection, {
    delay: 0.3,
    top: "calc(100vh + 40%)",
    duration: 0.4,
    onComplete: function () {
      setTimeout(function () {
        footerSection.style.top = "";
      }, 300);
      gsap.to([followHeading, followImages, followSocial], { opacity: 1, duration: 0.3 });
      gsap.set([footerSection, footerHeading, footerRow, footerBottom], { opacity: "" });
    },
  });

  const targetSection = document.querySelector(`.main-wrapper [scroll-index="7"]`);

  scrollingToSections(targetSection);

  enableScroll();
}

let touchStartY;
let touchEndY;

function performScroll(direction) {
  if (window.innerWidth >= 768) {
    if (document.documentElement.classList.contains("w-editor") || isScrolling) return;

    let newSectionIndex = direction ? currentSectionIndex - 1 : currentSectionIndex + 1;

    // Slider scroll navigation
    if (currentSectionIndex === 2) {
      if (direction && currentSlide === 0) {
        locationsToHero();
        console.log(currentSectionIndex, newSectionIndex);
      } else if (!direction && currentSlide === numSlides - 1) {
        locationsToInstructors();
      } else {
        if (!direction && currentSlide < numSlides - 1) {
          $("#w-slider-arrow-right").trigger("tap");
          currentSlide++;
          isScrolling = true;
          enableScroll();
        } else if (direction && currentSlide > 0) {
          $("#w-slider-arrow-left").trigger("tap");
          currentSlide--;
          isScrolling = true;
          enableScroll();
        }
        return;
      }
    }

    if (newSectionIndex < 1 || newSectionIndex > totalSections) return;

    if (currentSectionIndex === 1 && newSectionIndex === 2) {
      heroToLocations();
    } else if (currentSectionIndex === 2 && newSectionIndex === 3) {
      // Handled by slider
    } else if (currentSectionIndex === 3 && newSectionIndex === 4) {
      instructorsToClasses();
    } else if (currentSectionIndex === 4 && newSectionIndex === 5) {
      classesToPoses();
    } else if (currentSectionIndex === 5 && newSectionIndex === 6) {
      posesToBlog();
    } else if (currentSectionIndex === 6 && newSectionIndex === 7) {
      blogToFollow();
    } else if (currentSectionIndex === 7 && newSectionIndex === 8) {
      followToFooter();
    } else if (currentSectionIndex === 2 && newSectionIndex === 1) {
      // Handled by slider
    } else if (currentSectionIndex === 3 && newSectionIndex === 2) {
      instructorsToLocations();
    } else if (currentSectionIndex === 4 && newSectionIndex === 3) {
      classesToInstructors();
    } else if (currentSectionIndex === 5 && newSectionIndex === 4) {
      posesToClasses();
    } else if (currentSectionIndex === 6 && newSectionIndex === 5) {
      blogToPoses();
    } else if (currentSectionIndex === 7 && newSectionIndex === 6) {
      followToBlog();
    } else if (currentSectionIndex === 8 && newSectionIndex === 7) {
      footerToFollow();
    }

    isScrolling = true;
    currentSectionIndex = newSectionIndex;
  }
}

window.addEventListener(
  "wheel",
  function (e) {
    if (window.innerWidth >= 768 && !document.documentElement.classList.contains("w-editor")) {
      e.preventDefault();
    }

    let direction = e.wheelDelta ? e.wheelDelta >= 0 : e.deltaY <= 0;
    performScroll(direction);
  },
  { passive: false }
);

window.addEventListener(
  "touchstart",
  function (e) {
    touchStartY = e.touches[0].clientY;
  },
  false
);

window.addEventListener(
  "touchend",
  function (e) {
    if (window.innerWidth >= 768) {
      touchEndY = e.changedTouches[0].clientY;
      performScroll(touchEndY - touchStartY > 0);
    }
  },
  false
);

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener("load", initApp);
window.addEventListener("resize", debounce(initApp, 250));
