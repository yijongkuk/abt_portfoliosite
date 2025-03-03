gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 전역 변수
let isScrolling = false;
let isAnimating = false; // 애니메이션 진행 중 상태 추적

// 페이지 로드 시 실행
window.addEventListener("DOMContentLoaded", () => {
  // 스크롤 인디케이터 애니메이션
  fadeScrollIndicator();
  
  // 섹션 1 초기 애니메이션
  animateSection1OnLoad();
  
  // 테마 전환 로직 설정
  setupThemeSwitching();
  
  // 각 섹션 애니메이션 설정
  setupSectionAnimations();
  
  // 오렌지 원 애니메이션
  setupOrangeCircleAnimation();
  
  // 개선된 스크롤 스냅 설정
  setupImprovedScrollSnap();
  
  // 포트폴리오 아이템 호버 이벤트 설정
  setupPortfolioHoverEffects();
});

// 스크롤 인디케이터 표시/숨김
function fadeScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (!scrollIndicator) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      gsap.to(scrollIndicator, { opacity: 0, duration: 0.3 });
    } else {
      gsap.to(scrollIndicator, { opacity: 1, duration: 0.3 });
    }
  });
}

// 섹션 1 초기 로드 애니메이션
function animateSection1OnLoad() {
  const section1 = document.querySelector("#section1");
  if (section1) {
    const circle = section1.querySelector(".circle-dot");
    const title = section1.querySelector(".intro-title");
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
      ease: "power2.out",
      delay: 0.5
    });
  }
}

// 테마 전환 로직 설정
function setupThemeSwitching() {
  document.querySelectorAll(".section").forEach((sec) => {
    const theme = sec.getAttribute("data-theme") || "dark";
    
    ScrollTrigger.create({
      trigger: sec,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => applyTheme(theme),
      onEnterBack: () => applyTheme(theme)
    });
  });
}

// 테마 적용 함수
function applyTheme(theme) {
  if (theme === "dark") {
    gsap.to(".white-logo, .white-contact", { opacity: 1, duration: 0.3 });
    gsap.to(".black-logo, .black-contact", { opacity: 0, duration: 0.3 });
  } else {
    gsap.to(".white-logo, .white-contact", { opacity: 0, duration: 0.3 });
    gsap.to(".black-logo, .black-contact", { opacity: 1, duration: 0.3 });
  }
}

// 각 섹션별 애니메이션 설정
function setupSectionAnimations() {
  // Split-section 애니메이션 (섹션 1~3)
  setupSplitSectionAnimations();
  
  // 섹션 4 애니메이션 (중앙 텍스트 + 오른쪽 하단 캡션)
  setupSection4Animation();
  
  // 섹션 5 애니메이션 (포트폴리오 섹션)
  setupSection5Animation();
  
  // 섹션 6 애니메이션
  setupSection6Animation();
}

// Split-section 애니메이션 (섹션 1~3)
function setupSplitSectionAnimations() {
  document.querySelectorAll(".split-section").forEach((section, index) => {
    // 섹션 1은 이미 로드 시 애니메이션이 적용되므로 건너뜀
    if (section.id === "section1") return;
    
    const textContainer = section.querySelector(".left-content");
    if (!textContainer) return;
    
    const circle = textContainer.querySelector(".circle-dot");
    const title = textContainer.querySelector(".intro-title");
    const descEn = textContainer.querySelector(".intro-desc-en");
    const descKr = textContainer.querySelector(".intro-desc-kr");
    const caption = section.querySelector(".caption");
    const allElements = [circle, title, descEn, descKr].filter(el => el);
    
    gsap.set(allElements, { opacity: 0, y: 30 });
    if (caption) gsap.set(caption, { opacity: 0, y: 30 });
    
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none none"
      }
    })
    .to(allElements, { 
      y: 0, 
      opacity: 1, 
      duration: 0.4, 
      stagger: 0.1, 
      ease: "power2.out" 
    })
    .to(caption, { 
      y: 0, 
      opacity: 1, 
      duration: 0.4, 
      ease: "power2.out" 
    }, "-=0.2");
  });
}

// 섹션 4 애니메이션 설정
function setupSection4Animation() {
  const section4 = document.querySelector("#section4");
  if (!section4) return;
  
  gsap.timeline({
    scrollTrigger: {
      trigger: section4,
      start: "top 60%",
      toggleActions: "play none none none"
    }
  })
  .fromTo(section4.querySelector(".intro-title"), 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
  )
  .fromTo(section4.querySelector(".intro-desc-kr"), 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    "-=0.3"
  )
  .fromTo(section4.querySelector(".caption"), 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    "-=0.3"
  );
}

// 섹션 5 애니메이션 설정 (포트폴리오 섹션)
function setupSection5Animation() {
  const section5 = document.querySelector("#section5");
  if (!section5) return;
  
  // 포트폴리오 아이템 애니메이션 - 모두 동일한 방향에서 등장
  const portfolioItems = section5.querySelectorAll(".portfolio-item");
  if (portfolioItems.length) {
    portfolioItems.forEach((item, index) => {
      // 이미지와 내용 부분 선택
      const itemImage = item.querySelector('.portfolio-image');
      const itemContent = item.querySelector('.portfolio-content');
      
      // 이미지 애니메이션 (왼쪽에서 등장)
      gsap.fromTo(itemImage, 
        { opacity: 0, x: -50 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // 내용 애니메이션 (오른쪽에서 등장)
      gsap.fromTo(itemContent, 
        { opacity: 0, x: 50 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.7,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }
  
  // 섹션 5 상단 센서 추가 (섹션 4로 올라갈 때 스냅 적용)
  setupSection5TopSensor();
  
  // 섹션 6 센서 영역 애니메이션 설정 (섹션 6으로 내려갈 때 스냅 적용)
  setupSection6Sensor();
}

// 섹션 5 상단 센서 설정 (섹션 4로 올라갈 때 스냅 지점)
function setupSection5TopSensor() {
  const section5 = document.querySelector("#section5");
  const section4 = document.querySelector('#section4');
  if (!section5 || !section4) return;
  
  // 섹션 5의 상단 부분에 스크롤 트리거 추가
  ScrollTrigger.create({
    trigger: section5,
    start: "top bottom",
    end: "top top",
    onLeaveBack: () => {
      // 스크롤 방향이 위로 갈 때 섹션 4로 자동 스크롤
      if (!isScrolling && !isAnimating) {
        const sections = Array.from(document.querySelectorAll(".section"));
        const sectionIndex = sections.indexOf(section4);
        if (sectionIndex >= 0) {
          scrollToSection(sectionIndex);
        }
      }
    }
  });
}

// 섹션 6 센서 영역 설정
function setupSection6Sensor() {
  const sensor = document.querySelector('.section-snap-sensor');
  const section6 = document.querySelector('#section6');
  
  if (!sensor || !section6) return;
  
  ScrollTrigger.create({
    trigger: sensor,
    start: "top 80%",
    end: "bottom top",
    onEnter: () => {
      // 센서 영역이 화면에 들어오면 다음 섹션으로 스크롤 준비 상태 알림
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        gsap.to(scrollIndicator, { 
          opacity: 1, 
          duration: 0.3 
        });
      }
    },
    onLeaveBack: () => {
      // 센서 영역에서 위로 스크롤하면 알림 숨김
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        gsap.to(scrollIndicator, { 
          opacity: 0, 
          duration: 0.3 
        });
      }
    }
  });
}

// 섹션 6 애니메이션 설정
function setupSection6Animation() {
  const section6 = document.querySelector("#section6");
  if (!section6) return;
  
  const elements = [
    section6.querySelector(".contact-title"),
    section6.querySelector(".contact-info"),
    section6.querySelector(".member-title"),
    section6.querySelector(".team-container"),
    section6.querySelector(".copyright")
  ].filter(el => el);
  
  gsap.set(elements, { opacity: 0, y: 30 });
  
  gsap.timeline({
    scrollTrigger: {
      trigger: section6,
      start: "top 60%",
      toggleActions: "play none none none"
    }
  })
  .to(elements, { 
    opacity: 1, 
    y: 0, 
    duration: 0.4, 
    stagger: 0.1, 
    ease: "power2.out" 
  });
}

// 오렌지 서클 애니메이션 설정 - 더 작은 크기로 수정
function setupOrangeCircleAnimation() {
  const orangeCircle = document.getElementById('orange-circle-background');
  if (!orangeCircle) {
    console.error("오렌지 서클 요소를 찾을 수 없습니다.");
    return;
  }
  
  // 초기 상태 설정 - 더 작은 크기로 설정
  gsap.set(orangeCircle, {
    opacity: 0,
    scale: 0,
    filter: "blur(30px)"
  });
  
  // 오렌지 서클 스타일 직접 수정 - 더 작게
  orangeCircle.style.width = "7rem"; 
  orangeCircle.style.height = "7rem"; 
  
  // 섹션 4에서 섹션 5로 전환될 때 오렌지 서클 애니메이션
  ScrollTrigger.create({
    trigger: "#section5",
    start: "top bottom", // 섹션 5가 화면 하단에 보이기 시작할 때
    end: "top top",      // 섹션 5가 화면 상단에 도달할 때
    onEnter: () => {
      console.log("섹션 5 진입 - 오렌지 서클 나타남");
      gsap.to(orangeCircle, {
        opacity: 1, 
        scale: 1, 
        filter: "blur(30px)",
        duration: 0.8,
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
      console.log("섹션 5에서 위로 이탈 - 오렌지 서클 사라짐");
      gsap.to(orangeCircle, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in"
      });
    }
  });
  
  // 섹션 5 내부에서 스크롤할 때 오렌지 서클 변화
  ScrollTrigger.create({
    trigger: "#section5",
    start: "top top",      // 섹션 5가 화면 상단에 도달했을 때
    end: "bottom 70%",     // 섹션 5의 70% 지점에서 종료 - 더 빨리 사라지게 수정
    scrub: 0.5,            // 부드러운 스크롤 효과
    onUpdate: (self) => {
      // 스크롤 진행도에 따라 오렌지 서클 블러와 투명도 조절
      const progress = self.progress;
      const targetBlur = Math.max(5, 15 - progress * 10); // 블러 감소
      const targetOpacity = Math.max(0, 0.75 - progress * 1.5); // 더 빠르게 투명해지도록 수정
      
      gsap.to(orangeCircle, {
        filter: `blur(${targetBlur}px)`,
        opacity: targetOpacity,
        scale: Math.max(0.4, 0.9 - progress * 0.5), // 스크롤에 따라 점점 작아지게
        duration: 0.1,
        ease: "none"
      });
    }
  });
  
  // 섹션 5 하단부에 도달하기 전에 완전히 페이드 아웃
  ScrollTrigger.create({
    trigger: "#section5",
    start: "70% center", // 섹션 5의 70% 지점부터 시작
    end: "bottom bottom", // 섹션 5 끝까지
    onEnter: () => {
      console.log("섹션 5 하단부 진입 - 오렌지 서클 완전 페이드 아웃");
      gsap.to(orangeCircle, {
        opacity: 0,
        scale: 0.3,
        duration: 0.5,
        ease: "power2.in"
      });
    },
    onLeaveBack: () => {
      console.log("섹션 5 하단부에서 위로 이탈 - 오렌지 서클 복원");
      const progress = calculateScrollProgress(document.querySelector("#section5"));
      const targetOpacity = Math.max(0, 0.75 - progress * 1.5);
      
      gsap.to(orangeCircle, {
        opacity: targetOpacity,
        scale: Math.max(0.4, 0.9 - progress * 0.5),
        duration: 0.5,
        ease: "power2.out"
      });
    }
  });
  
  // 포트폴리오 아이템 호버 효과
  setupPortfolioHoverEffects(orangeCircle);
}

// 포트폴리오 아이템 호버 이벤트 설정 - 호버 시 서클이 작아지면서 선명해지도록 수정
function setupPortfolioHoverEffects() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const orangeCircle = document.getElementById('orange-circle-background');
  
  if (!portfolioItems.length) return;
  
  portfolioItems.forEach(item => {
    const img = item.querySelector('.portfolio-image img');
    
    if (img) {
      // 초기 상태 설정
      gsap.set(img, { scale: 1 });
      
      // 마우스 진입 이벤트
      item.addEventListener('mouseenter', () => {
        if (isScrolling) return; // 스크롤 중일 땐 호버 효과 무시
        
        // 이미지 확대 효과
        gsap.to(img, {
          scale: 1.05,
          duration: 0.6,
          ease: "power2.out"
        });
        
        // 오렌지 서클 효과 - 더 작고 더 선명하게 수정
        if (orangeCircle) {
          gsap.to(orangeCircle, {
            filter: "blur(5px)", // 더 선명하게
            opacity: 1,        // 더 진하게
            scale: 0.18,          // 더 작게 (커지는 대신 작아지게 변경)
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
      
      // 마우스 이탈 이벤트
      item.addEventListener('mouseleave', () => {
        // 이미지 원래 크기로
        gsap.to(img, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
        
        // 오렌지 서클 효과 원복
        if (orangeCircle) {
          const section5 = document.querySelector("#section5");
          if (section5) {
            const progress = calculateScrollProgress(section5);
            const targetBlur = Math.max(5, 15 - progress * 10);
            const targetOpacity = Math.max(0, 0.75 - progress * 1.5);
            const targetScale = Math.max(0.4, 0.9 - progress * 0.5);
            
            gsap.to(orangeCircle, {
              filter: `blur(${targetBlur}px)`,
              opacity: targetOpacity,
              scale: targetScale,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        }
      });
    }
  });
}

// 스크롤 진행도 계산 함수 (0~1 값)
function calculateScrollProgress(section) {
  if (!section) return 0;
  
  const rect = section.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const sectionTop = rect.top + scrollTop;
  const sectionHeight = section.offsetHeight;
  const windowHeight = window.innerHeight;
  
  // 뷰포트에서의 위치 계산
  const scrollPosition = scrollTop + windowHeight - sectionTop;
  const progress = Math.min(Math.max(scrollPosition / (sectionHeight + windowHeight), 0), 1);
  
  return progress;
}

// setupImprovedScrollSnap 함수 수정
function setupImprovedScrollSnap() {
  let scrollTimeout;
  
  const sections = Array.from(document.querySelectorAll(".section"));
  const footer = document.querySelector('.footer');
  const allElements = footer ? [...sections, footer] : sections;
  
  const snapSections = sections; // 푸터는 스냅에서 제외
  const snapSectionCount = snapSections.length;
  
  // 섹션 위치 정보 가져오기 - 페이지 로드 후 정확한 위치계산을 위해 setTimeout 사용
  let sectionPositions = [];
  
  setTimeout(() => {
    // 스크롤 위치가 정확히 계산될 수 있도록 위치 재계산
    sectionPositions = snapSections.map(section => section.offsetTop);
    window.scrollTo(0, 0);
    activeIndex = 0;
  }, 300);
  
  let activeIndex = 0;
  let lastScrollTime = 0; // 마지막 스크롤 시간 추적
  
  window.addEventListener('wheel', handleScroll, { passive: false });
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  
  let touchStartY = 0;
  
  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
  }
  
  function handleTouchMove(event) {
    if (isScrolling || isAnimating) return;
    
    const touchY = event.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    // 현재 스크롤 위치 확인
    const currentScroll = window.scrollY;
    
    // section5 특별 처리 - data-snap="false" 속성 확인
    const section5 = document.getElementById('section5');
    const isInSection5 = section5 && 
                         currentScroll >= section5.offsetTop && 
                         currentScroll < (section5.offsetTop + section5.offsetHeight);
    
    // section5 내부에서는 기본 스크롤 허용 조건 확인
    if (isInSection5) {
      const section5BottomReached = isSectionBottomReached(section5);
      const section5TopReached = isSectionTopReached(section5);
      
      // section5의 끝에 도달했고 아래로 스와이프하는 경우
      if (section5BottomReached && diff > 50) {
        const section6Index = snapSections.findIndex(sec => sec.id === 'section6');
        if (section6Index >= 0) {
          scrollToSection(section6Index);
          event.preventDefault();
          return;
        }
      } 
      // section5의 시작 부분에 도달했고 위로 스와이프하는 경우
      else if (section5TopReached && diff < -50) {
        const section4Index = snapSections.findIndex(sec => sec.id === 'section4');
        if (section4Index >= 0) {
          scrollToSection(section4Index);
          event.preventDefault();
          return;
        }
      }
      
      // section5 내부에서는 기본 스크롤 동작 유지
      return;
    }
    
    // 푸터에 도달했을 때 처리
    if (footer && window.scrollY + window.innerHeight >= document.body.scrollHeight - footer.offsetHeight) {
      if (diff < -50) { // 위로 스와이프
        const section6Index = snapSections.findIndex(sec => sec.id === 'section6');
        if (section6Index >= 0 && activeIndex !== section6Index) {
          scrollToSection(section6Index);
          event.preventDefault();
        }
      }
      return; // 푸터에서는 기본 스크롤 유지
    }
    
    // 일반 섹션 스냅 처리
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < snapSectionCount - 1) {
        scrollToSection(activeIndex + 1);
        event.preventDefault();
      } else if (diff < 0 && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
        event.preventDefault();
      }
    }
  }
  
  function handleScroll(event) {
    // 스크롤 딜레이 체크 - 너무 빠른 연속 스크롤 방지
    const now = Date.now();
    if (now - lastScrollTime < 200) {
      event.preventDefault();
      return;
    }
    
    if (isScrolling || isAnimating) {
      event.preventDefault();
      return;
    }
    
    const direction = event.deltaY > 0 ? 1 : -1;
    const currentScroll = window.scrollY;
    
    // section5 특별 처리
    const section5 = document.getElementById('section5');
    const isInSection5 = section5 && 
                         currentScroll >= section5.offsetTop && 
                         currentScroll < (section5.offsetTop + section5.offsetHeight);
    
    // section5 내부에서는 기본 스크롤 허용하되 경계 조건 확인
    if (isInSection5) {
      const section5BottomReached = isSectionBottomReached(section5);
      const section5TopReached = isSectionTopReached(section5);
      
      // section5의 끝에 도달했고 아래로 스크롤하는 경우
      if (section5BottomReached && direction > 0) {
        const section6Index = snapSections.findIndex(sec => sec.id === 'section6');
        if (section6Index >= 0) {
          scrollToSection(section6Index);
          event.preventDefault();
          lastScrollTime = now;
          return;
        }
      } 
      // section5의 시작 부분에 도달했고 위로 스크롤하는 경우
      else if (section5TopReached && direction < 0) {
        const section4Index = snapSections.findIndex(sec => sec.id === 'section4');
        if (section4Index >= 0) {
          scrollToSection(section4Index);
          event.preventDefault();
          lastScrollTime = now;
          return;
        }
      }
      
      // section5 내부에서 일반 스크롤 동작 - 스냅 방지
      return;
    }
    
    // 푸터에 도달했을 때
    if (footer && window.scrollY + window.innerHeight >= document.body.scrollHeight - footer.offsetHeight) {
      if (direction < 0) { // 위로 스크롤
        const section6Index = snapSections.findIndex(sec => sec.id === 'section6');
        if (section6Index >= 0 && activeIndex !== section6Index) {
          scrollToSection(section6Index);
          event.preventDefault();
          lastScrollTime = now;
        }
      }
      return; // 푸터에서는 기본 스크롤 유지
    }
    
    // 일반 섹션 스냅 처리
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      if (direction > 0 && activeIndex < snapSectionCount - 1) {
        scrollToSection(activeIndex + 1);
      } else if (direction < 0 && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
      }
    }, 50);
    
    lastScrollTime = now;
    event.preventDefault();
  }
  
  // 섹션의 상단에 도달했는지 확인
  function isSectionTopReached(section) {
    return window.scrollY <= section.offsetTop + 20;
  }
  
  // 섹션의 하단에 도달했는지 확인
  function isSectionBottomReached(section) {
    const sensorElement = document.querySelector('.section-snap-sensor');
    if (sensorElement) {
      return isSensorVisible(sensorElement);
    }
    
    // 센서 요소가 없는 경우 스크롤 위치로 확인
    return window.scrollY + window.innerHeight >= section.offsetTop + section.offsetHeight - 50;
  }
  
  window.scrollToSection = scrollToSection;
  
  function scrollToSection(index) {
    if (index < 0 || index >= snapSectionCount || isScrolling || isAnimating) return;
    
    // 정확한 섹션 위치 재계산 (동적 콘텐츠가 있을 경우를 위해)
    sectionPositions = snapSections.map(section => section.offsetTop);
    
    isScrolling = true;
    isAnimating = true;
    
    activeIndex = index;
    
    const targetPosition = sectionPositions[index];
    
    gsap.to(window, {
      duration: 0.6,
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          isScrolling = false;
          setTimeout(() => {
            isAnimating = false;
          }, 300);
        }, 200);
      }
    });
  }
  
  function isSensorVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.top <= window.innerHeight
    );
  }
  
  // 해시 변경 이벤트 및 초기 해시 처리
  window.addEventListener('hashchange', function() {
    const hash = window.location.hash;
    if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        const targetIndex = snapSections.indexOf(targetSection);
        if (targetIndex >= 0) {
          scrollToSection(targetIndex);
        }
      }
    }
  });
  
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      const targetIndex = snapSections.indexOf(targetSection);
      if (targetIndex >= 0) {
        setTimeout(() => {
          scrollToSection(targetIndex);
        }, 500);
      }
    }
  }
}



// 페이지 로드 시 실행
window.addEventListener("DOMContentLoaded", () => {
  // 기존 함수 호출 유지
  fadeScrollIndicator();
  animateSection1OnLoad();
  setupThemeSwitching();
  setupSectionAnimations();
  setupOrangeCircleAnimation();
  setupImprovedScrollSnap();
  setupPortfolioHoverEffects(); // 호버 및 클릭 이벤트 설정
});

// 포트폴리오 아이템 호버 및 클릭 이벤트 설정
function setupPortfolioHoverEffects() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const orangeCircle = document.getElementById('orange-circle-background');
  const popupOverlay = document.getElementById('popupOverlay');
  const popupContent = document.getElementById('popupContent');
  const popupClose = document.getElementById('popupClose');
  
  if (!portfolioItems.length) return;

  portfolioItems.forEach(item => {
    const img = item.querySelector('.portfolio-image img');

    if (img) {
      // 초기 상태 설정
      gsap.set(img, { scale: 1 });

      // 마우스 진입 이벤트 (호버)
      item.addEventListener('mouseenter', () => {
        if (isScrolling) return;
        gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
        if (orangeCircle) {
          gsap.to(orangeCircle, {
            filter: "blur(5px)",
            opacity: 1,
            scale: 0.18,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });

      // 마우스 이탈 이벤트 (호버)
      item.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        if (orangeCircle) {
          const section5 = document.querySelector("#section5");
          if (section5) {
            const progress = calculateScrollProgress(section5);
            const targetBlur = Math.max(5, 15 - progress * 10);
            const targetOpacity = Math.max(0, 0.75 - progress * 1.5);
            const targetScale = Math.max(0.4, 0.9 - progress * 0.5);
            gsap.to(orangeCircle, {
              filter: `blur(${targetBlur}px)`,
              opacity: targetOpacity,
              scale: targetScale,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        }
      });

      // 클릭 이벤트 (팝업창 열기)
      item.addEventListener('click', () => {
        const imageData = item.getAttribute('data-images');
        if (!imageData) return;

        const images = JSON.parse(imageData); // data-images 속성에서 이미지 배열 파싱
        popupContent.innerHTML = ''; // 기존 콘텐츠 초기화

        // 이미지 추가
        images.forEach(src => {
          const imgElement = document.createElement('img');
          imgElement.src = src;
          popupContent.appendChild(imgElement);
        });

        // 팝업창 표시 및 애니메이션
        document.body.classList.add('no-scroll'); // 메인 스크롤 고정
        popupOverlay.style.display = 'block';
        gsap.to(popupOverlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
      });
    }
  });

  // 팝업창 닫기 이벤트
  popupClose.addEventListener('click', () => {
    gsap.to(popupOverlay, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        popupOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll'); // 메인 스크롤 해제
        popupContent.innerHTML = ''; // 콘텐츠 초기화
      }
    });
  });

  // 오버레이 클릭 시 닫기 (팝업창 외부 클릭)
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      gsap.to(popupOverlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          popupOverlay.style.display = 'none';
          document.body.classList.remove('no-scroll');
          popupContent.innerHTML = '';
        }
      });
    }
  });
}

