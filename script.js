gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 전역 변수
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
  
  // 포트폴리오 아이템 호버 이벤트 설정
  setupPortfolioHoverEffects();
  
  // 해시 링크 부드러운 스크롤 설정
  setupSmoothHashLinks();
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

/// 테마 전환 로직 설정 - 수정 버전
function setupThemeSwitching() {
  document.querySelectorAll(".section").forEach((sec) => {
    const theme = sec.getAttribute("data-theme") || "dark";
    
    ScrollTrigger.create({
      trigger: sec,
      start: "top top", // 섹션 상단이 화면 상단에 닿았을 때로 변경
      end: "bottom top", // 섹션 하단이 화면 상단에 닿았을 때
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
    
    // 각 요소에 개별적으로 애니메이션 적용
    if (circle) {
      gsap.set(circle, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: circle,
        start: "top 85%", // 요소가 화면 하단에서 15% 위치에 도달하면 시작
        once: true,
        onEnter: () => {
          gsap.to(circle, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      });
    }
    
    if (title) {
      gsap.set(title, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: title,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(title, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      });
    }
    
    if (descEn) {
      gsap.set(descEn, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: descEn,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(descEn, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      });
    }
    
    if (descKr) {
      gsap.set(descKr, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: descKr,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(descKr, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      });
    }
    
    if (caption) {
      gsap.set(caption, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: caption,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(caption, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      });
    }
  });
}

// 섹션 4 애니메이션 설정
function setupSection4Animation() {
  const section4 = document.querySelector("#section4");
  if (!section4) return;
  
  const title = section4.querySelector(".intro-title");
  const descKr = section4.querySelector(".intro-desc-kr");
  const caption = section4.querySelector(".caption");
  const dot = section4.querySelector(".circle-dot-orange");
  
  // 개별 요소마다 각각 애니메이션 설정
  if (dot) {
    gsap.set(dot, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: dot,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(dot, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      }
    });
  }
  
  if (title) {
    gsap.set(title, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: title,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(title, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      }
    });
  }
  
  if (descKr) {
    gsap.set(descKr, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: descKr,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(descKr, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      }
    });
  }
  
  if (caption) {
    gsap.set(caption, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: caption,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(caption, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      }
    });
  }
}

// 섹션 5 애니메이션 설정 (포트폴리오 섹션)
function setupSection5Animation() {
  const section5 = document.querySelector("#section5");
  if (!section5) return;
  
  // 포트폴리오 아이템 애니메이션
  const portfolioItems = section5.querySelectorAll(".portfolio-item");
  if (portfolioItems.length) {
    portfolioItems.forEach((item, index) => {
      // 이미지와 내용 부분 선택
      const itemImage = item.querySelector('.portfolio-image');
      const itemContent = item.querySelector('.portfolio-content');
      
      // 이미지 애니메이션 (왼쪽에서 등장)
      if (itemImage) {
        gsap.set(itemImage, { opacity: 0, x: -50 });
        
        ScrollTrigger.create({
          trigger: itemImage,
          start: "top 90%", // 요소가 화면의 90% 지점에 도달했을 때
          once: true,
          onEnter: () => {
            gsap.to(itemImage, { 
              opacity: 1, 
              x: 0, 
              duration: 0.7, 
              ease: "power2.out" 
            });
          }
        });
      }
      
      // 내용 애니메이션 (오른쪽에서 등장)
      if (itemContent) {
        gsap.set(itemContent, { opacity: 0, x: 50 });
        
        ScrollTrigger.create({
          trigger: itemContent,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(itemContent, { 
              opacity: 1, 
              x: 0, 
              duration: 0.7, 
              ease: "power2.out" 
            });
          }
        });
      }
      
      // 각 포트폴리오 항목 내의 요소별 애니메이션 (h3, 설명 텍스트 등)
      const contentElements = [
        itemContent?.querySelector('h3'),
        itemContent?.querySelector('.portfolio-desc-en'),
        itemContent?.querySelector('.portfolio-desc-kr')
      ].filter(el => el);
      
      contentElements.forEach((element, i) => {
        gsap.set(element, { opacity: 0, y: 20 });
        
        ScrollTrigger.create({
          trigger: element,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(element, { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              delay: 0.1 * i, // 각 요소마다 약간의 시차
              ease: "power2.out" 
            });
          }
        });
      });
    });
  }
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
  
  // 각 요소에 개별적인 애니메이션 적용
  elements.forEach(element => {
    if (!element) return;
    
    gsap.set(element, { opacity: 0, y: 30 });
    
    ScrollTrigger.create({
      trigger: element,
      start: "top 85%", // 요소가 화면의 85% 지점에 도달했을 때
      once: true,
      onEnter: () => {
        gsap.to(element, { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: "power2.out" 
        });
      }
    });
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
      gsap.to(orangeCircle, {
        opacity: 1, 
        scale: 1, 
        filter: "blur(30px)",
        duration: 0.8,
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
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
      gsap.to(orangeCircle, {
        opacity: 0,
        scale: 0.3,
        duration: 0.5,
        ease: "power2.in"
      });
    },
    onLeaveBack: () => {
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

// 해시 링크 부드러운 스크롤 설정
function setupSmoothHashLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offset = targetElement.offsetTop;
        
        gsap.to(window, {
          duration: 0.8,
          scrollTo: {
            y: offset,
            autoKill: false
          },
          ease: "power2.inOut"
        });
      }
    });
  });
  
  // 초기 URL 해시 처리
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }, 500);
    }
  }
}

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
        document.body.classList.add('no-scroll'); // body에 no-scroll 클래스 추가
        popupOverlay.style.display = 'block';
        gsap.to(popupOverlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
      });
    }
  });

  // 팝업창 닫기 이벤트
  if (popupClose) {
    popupClose.addEventListener('click', () => {
      gsap.to(popupOverlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          popupOverlay.style.display = 'none';
          document.body.classList.remove('no-scroll'); // body에서 no-scroll 클래스 제거
          popupContent.innerHTML = ''; // 콘텐츠 초기화
        }
      });
    });
  }

  // 오버레이 클릭 시 닫기 (팝업창 외부 클릭)
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        gsap.to(popupOverlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            popupOverlay.style.display = 'none';
            document.body.classList.remove('no-scroll'); // body에서 no-scroll 클래스 제거
            popupContent.innerHTML = '';
          }
        });
      }
    });
  }
}