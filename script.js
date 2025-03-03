// 전역 변수
let isScrolling = false;
const scrollDelay = 800; // 스크롤 애니메이션 지연시간 (ms)

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
});

// 스크롤 인디케이터 표시/숨김
function fadeScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (!scrollIndicator) return;
  
  // 스크롤 이벤트 발생 시 인디케이터 숨김
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      gsap.to(scrollIndicator, { opacity: 0, duration: 0.5 });
    } else {
      gsap.to(scrollIndicator, { opacity: 1, duration: 0.5 });
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
      start: "top 50%", // 섹션이 화면 중앙에 도달했을 때 테마 전환
      end: "bottom 50%",
      onEnter: () => applyTheme(theme),
      onEnterBack: () => applyTheme(theme)
    });
  });
}

// 테마 적용 함수
function applyTheme(theme) {
  if (theme === "dark") {
    gsap.to(".white-logo, .white-contact", { opacity: 1, duration: 0.5 });
    gsap.to(".black-logo, .black-contact", { opacity: 0, duration: 0.5 });
  } else {
    gsap.to(".white-logo, .white-contact", { opacity: 0, duration: 0.5 });
    gsap.to(".black-logo, .black-contact", { opacity: 1, duration: 0.5 });
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
    
    gsap.set(allElements, { opacity: 0, y: 50 });
    if (caption) gsap.set(caption, { opacity: 0, y: 50 });
    
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%", // 섹션이 화면 60% 위치에 도달했을 때 애니메이션 시작
        toggleActions: "play none none none"
      }
    })
    .to(allElements, { 
      y: 0, 
      opacity: 1, 
      duration: 0.5, 
      stagger: 0.2, 
      ease: "power2.out" 
    })
    .to(caption, { 
      y: 0, 
      opacity: 1, 
      duration: 0.5, 
      ease: "power2.out" 
    }, "-=0.4");
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
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  )
  .fromTo(section4.querySelector(".intro-desc-kr"), 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    "-=0.5"
  )
  .fromTo(section4.querySelector(".caption"), 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    "-=0.5"
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
        { opacity: 0, x: -100 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 1,
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
        { opacity: 0, x: 100 }, 
        { 
          opacity: 1, 
          x: 0, 
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // 이미지 호버 효과 초기화 - 충돌 방지를 위해 GSAP로 처리
      const img = item.querySelector('.portfolio-image img');
      if (img) {
        // 초기 상태 설정 - transform 속성을 명시적으로 초기화
        gsap.set(img, { scale: 1, filter: "brightness(1)" });
        
        // 호버 이벤트 리스너
        item.addEventListener('mouseenter', () => {
          gsap.to(img, {
            scale: 1.05,
            filter: "brightness(1.05)",
            duration: 0.6,
            ease: "power2.out"
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(img, {
            scale: 1,
            filter: "brightness(1)",
            duration: 0.6,
            ease: "power2.out"
          });
        });
      }
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
    start: "top bottom",  // 섹션 5의 상단이 화면 하단에 닿을 때
    end: "top top",      // 섹션 5의 상단이 화면 상단에 닿을 때
    onLeaveBack: () => {
      // 스크롤 방향이 위로 갈 때 섹션 4로 자동 스크롤
      if (!isScrolling) {
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
  
  // 센서의 타겟 섹션 ID 설정
  const targetSectionId = sensor.getAttribute('data-target');
  
  // 센서 영역이 화면에 보이면 특수 효과 적용 (선택 사항)
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
          duration: 0.5 
        });
      }
    },
    onLeaveBack: () => {
      // 센서 영역에서 위로 스크롤하면 알림 숨김
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        gsap.to(scrollIndicator, { 
          opacity: 0, 
          duration: 0.5 
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
  
  gsap.set(elements, { opacity: 0, y: 50 });
  
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
    duration: 0.5, 
    stagger: 0.2, 
    ease: "power2.out" 
  });
}

// 오렌지 서클 존재 확인 및 필요시 생성
function ensureOrangeCircleExists() {
  let orangeCircle = document.querySelector(".orange-circle");
  
  // 오렌지 서클이 없으면 생성
  if (!orangeCircle) {
    orangeCircle = document.createElement("div");
    orangeCircle.className = "orange-circle";
    document.body.appendChild(orangeCircle);
    console.log("Orange circle created dynamically");
  }
  
  return orangeCircle;
}

// 오렌지 원 애니메이션 설정
function setupOrangeCircleAnimation() {
  // 오렌지 서클 확인 및 필요시 생성
  const orangeCircle = ensureOrangeCircleExists();
  if (!orangeCircle) return;
  
  // 초기 상태 설정
  gsap.set(orangeCircle, {
    opacity: 0,
    scale: 2,
    filter: "blur(100px)"
  });
  
  // 섹션 4에서 섹션 5로 전환될 때 오렌지 원 애니메이션
  gsap.timeline({
    scrollTrigger: {
      trigger: "#section4",
      start: "top 50%",
      end: "bottom top",
      scrub: true,
      onEnter: () => {
        // 섹션 4에 진입할 때 오렌지 원 표시 시작
        gsap.to(orangeCircle, {
          opacity: 0.5,
          scale: 2,
          filter: "blur(100px)",
          duration: 0.5
        });
      }
    }
  })
  .to(orangeCircle, {
    opacity: 1,
    scale: 2,
    filter: "blur(100px)",
    ease: "power2.out"
  });
  
  // 섹션 5에서 스크롤에 따라 오렌지 원 애니메이션
  const section5Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#section5",
      start: "top top", // 섹션 5가 화면 상단에 닿을 때 시작
      end: "bottom bottom", // 섹션 5 끝까지 스크롤 완료 시 끝
      scrub: 0.5, // 스크롤에 약간 지연되게 따라오도록 설정
      pin: false, // 섹션 자체는 고정하지 않음
      onEnter: () => {
        // 섹션 5에 진입할 때 오렌지 원이 완전히 보이도록 설정
        gsap.to(orangeCircle, {
          opacity: 1,
          scale: 2,
          filter: "blur(100px)",
          duration: 0.2,
          ease: "power1.out"
        });
      }
    }
  });
  
  // 스크롤에 따른 오렌지 원 애니메이션 (변화 과정)
  section5Timeline.to(orangeCircle, {
    scale: 0.3, // 작은 크기로 축소
    filter: "blur(5px)", // 선명해짐
    opacity: 0.9, // 약간 더 불투명하게
    ease: "power1.inOut"
  });
  
  // 포트폴리오 아이템 호버 효과 설정
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // 호버 시 오렌지 원 효과 증가
      gsap.to(orangeCircle, {
        duration: 0.4,
        opacity: 1,
        scale: 0.4, // 약간 커짐
        filter: "blur(2px)", // 더 선명해짐
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      // 호버 해제 시 원래 상태로 복귀 (현재 스크롤 위치에 따라 다름)
      const section5 = document.querySelector("#section5");
      const scrollProgress = calculateScrollProgress(section5);
      
      // 스크롤 위치에 따른 적절한 크기와 블러 계산
      const targetScale = 2 - (scrollProgress * 1.7); // 2에서 0.3까지
      const targetBlur = 100 - (scrollProgress * 95); // 100px에서 5px까지
      
      gsap.to(orangeCircle, {
        duration: 0.4,
        opacity: 0.7 + (scrollProgress * 0.2),
        scale: Math.max(0.3, targetScale),
        filter: `blur(${Math.max(5, targetBlur)}px)`,
        ease: "power2.out"
      });
    });
  });
  
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
    const progress = Math.min(Math.max(scrollPosition / sectionHeight, 0), 1);
    
    return progress;
  }
  
  // 스크롤 이벤트 리스너 - 호버 해제 상태에서 스크롤 위치에 따른 애니메이션 조정
  window.addEventListener('scroll', () => {
    const section5 = document.querySelector("#section5");
    // 섹션 5가 보이는 상태이고, 현재 호버 중이 아닌 경우에만 업데이트
    if (isSectionVisible(section5) && !document.querySelector('.portfolio-item:hover')) {
      const scrollProgress = calculateScrollProgress(section5);
      
      // 현재 스크롤 위치에 따른 애니메이션 미세 조정 (부드러움 강화)
      gsap.to(orangeCircle, {
        duration: 0.1,
        ease: "none",
        opacity: 0.7 + (scrollProgress * 0.2),
        scale: Math.max(0.3, 2 - (scrollProgress * 1.7)),
        filter: `blur(${Math.max(5, 100 - (scrollProgress * 95))}px)`
      });
    }
  });
  
  // 섹션이 화면에 보이는지 확인
  function isSectionVisible(section) {
    if (!section) return false;
    
    const rect = section.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight &&
      rect.bottom >= 0
    );
  }
}

// 개선된 스크롤 스냅 설정
function setupImprovedScrollSnap() {
  // 스크롤 이벤트에 디바운스 적용
  let lastScrollTime = 0;
  let scrollTimeout;
  
  // 모든 섹션 가져오기
  const sections = Array.from(document.querySelectorAll(".section"));
  const sectionCount = sections.length;
  
  // 각 섹션의 위치 정보 계산
  const sectionPositions = sections.map(section => section.offsetTop);
  
  // 현재 활성 섹션 인덱스 추적
  let activeIndex = 0;
  
  // 마지막 스크롤 방향 추적 (1: 아래로, -1: 위로)
  let lastScrollDirection = 0;
  
  // 초기 스크롤 위치 설정 (페이지 로드 시)
  setTimeout(() => {
    window.scrollTo(0, 0);
    activeIndex = 0;
  }, 100);
  
  // 스크롤 핸들러
  window.addEventListener('wheel', handleScroll);
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchmove', handleTouchMove);
  
  let touchStartY = 0;
  
  // 터치 시작 이벤트 핸들러
  function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
  }
  
  // 터치 이동 이벤트 핸들러
  function handleTouchMove(event) {
    if (isScrolling) return;
    
    const touchY = event.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    // 스크롤 방향 저장
    lastScrollDirection = diff > 0 ? 1 : -1;
    
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
      if (diff < -50 && window.scrollY <= sections[activeIndex].offsetTop + 200) {
        scrollToSection(activeIndex - 1);
        event.preventDefault();
        return;
      }
      
      // 그렇지 않으면 기본 스크롤 동작 허용 (preventDefault 없음)
      return;
    }
    
    // 위/아래 방향 감지 (스냅이 활성화된 일반 섹션)
    if (Math.abs(diff) > 50) { // 최소한의 스와이프 거리
      if (diff > 0) {
        // 아래로 스와이프
        scrollToSection(activeIndex + 1);
      } else {
        // 위로 스와이프
        scrollToSection(activeIndex - 1);
      }
      
      // 이벤트 기본 동작 방지
      event.preventDefault();
    }
  }
  
  // 스크롤 이벤트 핸들러
  function handleScroll(event) {
    // 이미 스크롤 중이면 무시
    if (isScrolling) return;
    
    // 스크롤 방향 저장
    lastScrollDirection = event.deltaY > 0 ? 1 : -1;
    
    // 현재 시간과 마지막 스크롤 이벤트 사이의 간격
    const now = new Date().getTime();
    const delta = now - lastScrollTime;
    
    // 스크롤 이벤트 디바운싱 (너무 빠른 연속 스크롤 방지)
    if (delta < 100) {
      event.preventDefault();
      return;
    }
    
    // 현재 섹션이 스냅 비활성화 상태인지 확인
    if (activeIndex < sections.length && sections[activeIndex].getAttribute('data-snap') === 'false') {
      // 섹션 6 센서 영역 체크 (포트폴리오 섹션에서 섹션 6으로 넘어갈 때만)
      const sensor = document.querySelector('.section-snap-sensor');
      if (sensor && isSensorVisible(sensor) && event.deltaY > 0) {
        // 아래로 스크롤하고 센서가 보이면 섹션 6으로 이동
        scrollToSection(activeIndex + 1);
        event.preventDefault();
        return;
      }
      
      // 섹션 5 상단에서 위로 스크롤할 때 섹션 4로 이동
      if (event.deltaY < 0 && window.scrollY <= sections[activeIndex].offsetTop + 200) {
        scrollToSection(activeIndex - 1);
        event.preventDefault();
        return;
      }
      
      // 그렇지 않으면 기본 스크롤 동작 허용 (preventDefault 없음)
      return;
    }
    
    // 스크롤 방향 감지 (스냅이 활성화된 일반 섹션)
    const direction = event.deltaY > 0 ? 1 : -1;
    
    // 타이머 초기화
    clearTimeout(scrollTimeout);
    
    // 타이머 설정: 짧은 스크롤에도 반응
    scrollTimeout = setTimeout(() => {
      // 다음/이전 섹션 인덱스 계산
      const nextIndex = Math.min(Math.max(activeIndex + direction, 0), sectionCount - 1);
      
      // 현재 섹션과 다른 경우에만 스크롤
      if (nextIndex !== activeIndex) {
        scrollToSection(nextIndex);
      }
    }, 50);
    
    lastScrollTime = now;
  }
  
  // 글로벌 스코프로 이동하여 다른 함수에서도 접근 가능하게 함
  window.scrollToSection = scrollToSection;
  
  // 특정 섹션으로 스크롤하는 함수
  function scrollToSection(index) {
    if (index < 0 || index >= sectionCount || isScrolling) return;
    
    // 스크롤 잠금 설정
    isScrolling = true;
    
    // 활성 섹션 업데이트
    activeIndex = index;
    
    // 스크롤 대상 위치
    const targetPosition = sectionPositions[index];
    
    // 스크롤 애니메이션
    gsap.to(window, {
      duration: 0.5,  // 스크롤 애니메이션 시간을 0.5초로 설정 (더 빠름)
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      ease: "power2.inOut",
      onComplete: () => {
        // 일정 시간 후 스크롤 잠금 해제
        setTimeout(() => {
          isScrolling = false;
        }, 200);  // 스크롤 잠금 해제 시간을 200ms로 설정 (더 빠름)
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
  
  // URL 해시 변경 감지하여 해당 섹션으로 이동
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