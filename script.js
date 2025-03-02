gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* 2. 테마 전환 로직 */
function applyTheme(theme) {
  if (theme === "dark") {
    gsap.to(".white-logo, .white-contact", { opacity: 1, duration: 0.5 });
    gsap.to(".black-logo, .black-contact", { opacity: 0, duration: 0.5 });
  } else {
    gsap.to(".white-logo, .white-contact", { opacity: 0, duration: 0.5 });
    gsap.to(".black-logo, .black-contact", { opacity: 1, duration: 0.5 });
  }
}
document.querySelectorAll(".section").forEach((sec) => {
  const theme = sec.getAttribute("data-theme") || "dark";
  ScrollTrigger.create({
    trigger: sec,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => applyTheme(theme),
    onEnterBack: () => applyTheme(theme)
  });
});

/* ---- Section 4 (새 레이아웃) 애니메이션 ---- */
/* pin 제거, 중앙 텍스트 페이드인 */
gsap.timeline({
  scrollTrigger: {
    trigger: "#section4",
    start: "top 80%",
    end: "bottom 60%",
    scrub: true
  }
})
.fromTo(".section4-title", 
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
)
.fromTo(".section4-subtitle", 
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
  "-=0.5"
)
.fromTo(".section4-credit", 
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
  "-=0.5"
);

/* 5. Section 5 (content3) 카드 애니메이션 */
document.querySelectorAll(".card").forEach((card) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      end: "top 50%",
      scrub: true
    }
  })
  .fromTo(card, 
    { opacity: 0, y: 100 }, 
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );
});

/* 추가: Section 5 배경 오렌지 원 애니메이션 */
gsap.timeline({
  scrollTrigger: {
    trigger: ".content3",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
})
.to(".orange-circle", {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
  ease: "power2.out"
});

/* 8. Section1 즉시 애니메이션 (페이지 로드 시) */
window.addEventListener("DOMContentLoaded", () => {
  const section1 = document.querySelector("#section1");
  if (section1) {
    const circle = section1.querySelector(".circle-dot");
    const title  = section1.querySelector(".intro-title");
    const descEn = section1.querySelector(".intro-desc-en");
    const descKr = section1.querySelector(".intro-desc-kr");
    const caption = section1.querySelector(".caption");
    const allElements = [circle, title, descEn, descKr, caption].filter(el => el);
    gsap.set(allElements, { opacity: 0, y: 50 });
    gsap.to(allElements, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });
  }
});

/* 추가: split-section 애니메이션 (Section 1,2,3) */
document.querySelectorAll(".split-section").forEach((section) => {
  const textContainer = section.querySelector(".left-content");
  if (!textContainer) return;
  const circle = textContainer.querySelector(".circle-dot");
  const title  = textContainer.querySelector(".intro-title");
  const descEn = textContainer.querySelector(".intro-desc-en");
  const descKr = textContainer.querySelector(".intro-desc-kr");
  const caption = section.querySelector(".caption");
  const allElements = [circle, title, descEn, descKr].filter(el => el);
  gsap.set(allElements, { opacity: 0, y: 50 });
  if (caption) gsap.set(caption, { opacity: 0, y: 50 });
  gsap.timeline({
    scrollTrigger: {
      trigger: textContainer,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  })
  .to(allElements, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  })
  .to(caption, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.4");
});

/* 📌 GSAP ScrollTrigger 스냅 적용 (전체 섹션 자동 스크롤)
    단, Section5에서는 스냅 기능을 비활성화하여 카드 애니메이션이 제대로 보여지도록 함.
*/
let sections = gsap.utils.toArray(".section");
let currentIndex = 0;
let isScrolling = false;
function scrollToSection(index) {
  isScrolling = true;
  gsap.to(window, { 
    duration: 0.8, 
    scrollTo: sections[index], 
    ease: "power2.inOut", 
    onComplete: () => { isScrolling = false; }
  });
}
document.addEventListener("wheel", (event) => {
  if (isScrolling) return;
  if (event.deltaY > 0 && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (event.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  }
  scrollToSection(currentIndex);
});
document.addEventListener("keydown", (event) => {
  if (isScrolling) return;
  if (event.key === "ArrowDown" && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (event.key === "ArrowUp" && currentIndex > 0) {
    currentIndex--;
  }
  scrollToSection(currentIndex);
});
sections.forEach((section) => {
  let snapConfig = { snapTo: "start", duration: 0.6, ease: "power1.inOut" };
  if (section.id === "section5") {
    snapConfig = false;
  }
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom top",
    snap: snapConfig
  });
});
