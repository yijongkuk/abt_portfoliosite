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
  orangeCircle.style.width = "7vh"; 
  orangeCircle.style.height = "7vh"; 
  
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
          scale: 1.2,
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

// 개선된 스크롤 스냅 설정
function setupImprovedScrollSnap() {
  // 스크롤 이벤트 디바운싱을 위한 타이머
  let scrollTimeout;
  
  // 모든 섹션 가져오기
  const sections = Array.from(document.querySelectorAll(".section"));
  const sectionCount = sections.length;
  
  // 각 섹션의 위치 정보 계산
  const sectionPositions = sections.map(section => section.offsetTop);
  
  // 현재 활성 섹션 인덱스 추적
  let activeIndex = 0;
  
  // 초기 스크롤 위치 설정 (페이지 로드 시)
  setTimeout(() => {
    window.scrollTo(0, 0);
    activeIndex = 0;
  }, 100);
  
  // 스크롤 핸들러 등록
  window.addEventListener('wheel', handleScroll, { passive: false });
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  
  let touchStartY = 0;
  
  // 터치 시작 이벤트 핸들러
  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
  }
  
  // 터치 이동 이벤트 핸들러
  function handleTouchMove(event) {
    if (isScrolling || isAnimating) return;
    
    const touchY = event.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    // 현재 섹션이 스냅 비활성화 상태인지 확인
    if (activeIndex < sections.length && sections[activeIndex].getAttribute('data-snap') === 'false') {
      // 섹션 6 센서 영역 체크 (포트폴리오 섹션에서 섹션 6으로 넘어갈 때만)
      const sensor = document.querySelector('.section-snap-sensor');
      if (sensor && isSensorVisible(sensor) && diff > 50) {
        // 아래로 스와이프하고 센서가 보이면 섹션 6으로 이동
        scrollToSection(activeIndex + 1);
        event.preventDefault();
        return;
      }
      
      // 섹션 5 상단에서 위로 스크롤할 때 섹션 4로 이동
      if (diff < -50 && window.scrollY <= sections[activeIndex].offsetTop + 100) {
        scrollToSection(activeIndex - 1);
        event.preventDefault();
        return;
      }
      
      // 그렇지 않으면 기본 스크롤 동작 허용
      return;
    }
    
    // 위/아래 방향 감지 (스냅이 활성화된 일반 섹션)
    if (Math.abs(diff) > 50) { // 최소한의 스와이프 거리
      if (diff > 0) {
        // 아래로 스와이프
        if (activeIndex < sectionCount - 1) {
          scrollToSection(activeIndex + 1);
          event.preventDefault();
        }
      } else {
        // 위로 스와이프
        if (activeIndex > 0) {
          scrollToSection(activeIndex - 1);
          event.preventDefault();
        }
      }
    }
  }
  
  // 스크롤 이벤트 핸들러
  function handleScroll(event) {
    if (isScrolling || isAnimating) {
      event.preventDefault();
      return;
    }
    
    const direction = event.deltaY > 0 ? 1 : -1;
    
    // 현재 섹션이 스냅 비활성화 상태인지 확인
    if (activeIndex < sections.length && sections[activeIndex].getAttribute('data-snap') === 'false') {
      // 섹션 6 센서 영역 체크 (포트폴리오 섹션에서 섹션 6으로 넘어갈 때만)
      const sensor = document.querySelector('.section-snap-sensor');
      if (sensor && isSensorVisible(sensor) && direction > 0) {
        // 아래로 스크롤하고 센서가 보이면 섹션 6으로 이동
        scrollToSection(activeIndex + 1);
        event.preventDefault();
        return;
      }
      
      // 섹션 5 상단에서 위로 스크롤할 때 섹션 4로 이동
      if (direction < 0 && window.scrollY <= sections[activeIndex].offsetTop + 100) {
        scrollToSection(activeIndex - 1);
        event.preventDefault();
        return;
      }
      
      // 그렇지 않으면 기본 스크롤 동작 허용
      return;
    }
    
    // 스크롤 디바운싱
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      // 일반 섹션에서의 스크롤
      if (direction > 0 && activeIndex < sectionCount - 1) {
        scrollToSection(activeIndex + 1);
      } else if (direction < 0 && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
      }
    }, 50);
    
    event.preventDefault();
  }
  
  // 글로벌 스코프로 이동하여 다른 함수에서도 접근 가능하게 함
  window.scrollToSection = scrollToSection;
  
  // 특정 섹션으로 스크롤하는 함수
  function scrollToSection(index) {
    if (index < 0 || index >= sectionCount || isScrolling || isAnimating) return;
    
    // 스크롤 및 애니메이션 잠금 설정
    isScrolling = true;
    isAnimating = true;
    
    // 활성 섹션 업데이트
    activeIndex = index;
    
    // 스크롤 타겟 위치
    const targetPosition = sectionPositions[index];
    
    // 스크롤 애니메이션
    gsap.to(window, {
      duration: 0.6,
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      ease: "power2.inOut",
      onComplete: () => {
        // 스크롤 잠금 해제 (약간의 지연)
        setTimeout(() => {
          isScrolling = false;
          
          // 애니메이션 잠금 해제 (추가 지연)
          setTimeout(() => {
            isAnimating = false;
          }, 300);
        }, 200);
      }
    });
  }
  
  // 센서 영역이 화면에 보이는지 확인하는 함수
  function isSensorVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.top <= window.innerHeight
    );
  }
  
  // 해시 변경 감지 및 스크롤 처리
  window.addEventListener('hashchange', function() {
    const hash = window.location.hash;
    if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        const targetIndex = sections.indexOf(targetSection);
        if (targetIndex >= 0) {
          scrollToSection(targetIndex);
        }
      }
    }
  });
  
  // 초기 URL에 해시가 있는 경우 해당 섹션으로 이동
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      const targetIndex = sections.indexOf(targetSection);
      if (targetIndex >= 0) {
        setTimeout(() => {
          scrollToSection(targetIndex);
        }, 500);
      }
    }
  }
}