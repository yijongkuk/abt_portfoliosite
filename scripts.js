// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 로고 색상 전환 애니메이션
ScrollTrigger.create({
  trigger: ".content2", // Section 2의 끝을 기준으로 트리거
  start: "top -=2000", // Section 2 끝에서 시작
  end: "bottom top", // 100px 더 내려간 후까지
  onEnter: () => {
    // 검정색 로고 나타남
    gsap.to(".white-logo", { opacity: 0, duration: 0.5, ease: "power2.out" });
    gsap.to(".black-logo", { opacity: 1, duration: 0.5, ease: "power2.out" });
  },
  onLeaveBack: () => {
    // 흰색 로고 나타남
    gsap.to(".white-logo", { opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(".black-logo", { opacity: 0, duration: 0.5, ease: "power2.out" });
  }
});

// 컨택트 색상 전환 애니메이션
ScrollTrigger.create({
  trigger: ".content2", // Section 2의 끝을 기준으로 트리거
  start: "top -=2000", // Section 2 끝에서 시작
  end: "bottom top", // 100px 더 내려간 후까지
  onEnter: () => {
    // 검정색 로고 나타남
    gsap.to(".white-contact", { opacity: 0, duration: 0.5, ease: "power2.out" });
    gsap.to(".black-contact", { opacity: 1, duration: 0.5, ease: "power2.out" });
  },
  onLeaveBack: () => {
    // 흰색 로고 나타남
    gsap.to(".white-contact", { opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(".black-contact", { opacity: 0, duration: 0.5, ease: "power2.out" });
  }
});


// Section 1: 스크롤 기반 프레임 애니메이션
const frameCount = 35; // 총 프레임 수
const images = [];

// 이미지 로드
for (let i = 1; i <= frameCount; i++) {
  images.push(`frames/main_${i.toString().padStart(2, '0')}.jpg`);
}

images.forEach((imageSrc) => {
  const img = new Image();
  img.src = imageSrc;
});


// Section 1 컨테이너 선택
const section1 = document.querySelector('.content1');

// frameContainer를 Section 1 내부에 추가
const frameContainer = document.createElement('div');
frameContainer.classList.add('frame-container');
frameContainer.style.position = 'absolute';
frameContainer.style.top = '0';
frameContainer.style.left = '0';
frameContainer.style.width = '100%';
frameContainer.style.height = '100%';
frameContainer.style.backgroundSize = 'cover';
frameContainer.style.backgroundPosition = 'center';
frameContainer.style.zIndex = '-1';
frameContainer.style.backgroundImage = `url(${images[0]})`;
section1.appendChild(frameContainer);

// ScrollTrigger로 프레임 애니메이션 구현
ScrollTrigger.create({
  trigger: ".content1",
  start: "top top",
  end: "bottom top",
  pin: true,
  scrub: 1, // 스크롤과 동기화
  onUpdate: (self) => {
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(self.progress * frameCount)
    );
    frameContainer.style.backgroundImage = `url(${images[frameIndex]})`;
  },
});

// Section2: 스크롤 기반 애니메이션
ScrollTrigger.create({
  trigger: ".content2",
  start: "top 90%", // Section2가 10% 보일 때 시작
  end: "top top", // Section2가 화면 상단에 도달
  pin: false, // 고정하지 않음 (스냅만 적용)
  scrub: 0.5, // 부드럽게 스크롤
});

// Timeline 생성 및 ScrollTrigger 연동
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".content2", // 섹션 1 트리거
    start: "top top", // 시작 시점
    end: "bottom top", // 끝 시점
    scrub: true, // 스크롤과 동기화
    pin: true, // 섹션 고정
  },
});


// 배경 이미지 확대, 명도 증가, 블러 효과 추가
timeline.to(".background-image", {
  scale: 1.5, // 배경 이미지 확대
  filter: "brightness(10) blur(10px)", // 명도 증가 및 블러 효과
  opacity: 0,
  duration: 5, // 지속 시간
  ease: "power2.out",
}, 7); // 타임라인의 0초에 시작

// Section2 Timeline 생성
const section2Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "section2", // Section2 트리거
    start: "30% center", // 시작 시점
    end: "bottom top", // 끝 시점
    scrub: true, // 스크롤과 동기화
    pin: true, // 섹션 고정
  },
});




// 타이틀 애니메이션 추가
section2Timeline
  // 타이틀 나타남 애니메이션
  .fromTo(
    ".title",
    { y: 50, opacity: 0 }, // 초기 상태: 아래에서 올라오며 투명
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, // 화면 중앙에 도달하며 나타남
    "+=0.5" // 추가 지연 시간을 설정
  )
  // 타이틀 사라짐 애니메이션
  .to(".title", { y: 0, opacity: 0, duration: 1, ease: "power2.out" });


  
// 디스크립션 애니메이션 추가
section2Timeline
  .fromTo(
    ".desc-r",
    { opacity: 0, y: 30 },
    { opacity: 1, y: -50, duration: 1, ease: "power2.out" },
    1.5
  )
  .to(".desc-r", { y: -100, duration: 1.5, ease: "power2.inOut" })

  // 디스크립션(한글) 애니메이션 추가
section2Timeline
.fromTo(
  ".desc-kr",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
  1
)
.to(".desc-kr", { opacity: 0, y: -150, ease: "power2.in" });


// 디스크립션 애니메이션 추가
section2Timeline
  .fromTo(
    ".desc-l",
    { opacity: 0, y: 30 },
    { opacity: 1, y: -50, duration: 0.8, ease: "power2.out" },
    1.8
  )
  .to(".desc-l", { y: -100, duration: 1.5, ease: "power2.inOut" })

  // 디스크립션(한글) 애니메이션 추가
section2Timeline
.fromTo(
  ".desc-kr",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
  1
)
.to(".desc-kr", { opacity: 0, y: -150, ease: "power2.in" });



// 오렌지 원 등장 애니메이션
timeline.to(".orange-circle", {
  opacity: 1,
  scale: 1,
  duration: 5,
  ease: "power2.out",
}, 5); // 배경 이미지와 살짝 딜레이

// 오렌지 원 크기 축소 및 선명화
timeline.to(".orange-circle", {
  width: "80px", // 특정 크기로 설정
  height: "80px", // 특정 크기로 설정
  filter: "blur(0px)",
  duration: 4,
  ease: "power2.inOut",
}, 7);

// 오렌지 원 고정 및 유지 애니메이션
ScrollTrigger.create({
  trigger: ".content3", // Section 3 기준
  start: "top top", // Section 2 시작
  end: "bottom top", // Section 2 끝
  scrub: true,
});

// 오렌지 원 중앙 고정 상태 유지
ScrollTrigger.create({
  trigger: ".content3", // Section 3 트리거
  start: "top top", // Section 3 시작
  end: "bottom top", // Section 3 끝날 때
  scrub: true,
  markers: false,
  onUpdate: (self) => {
    const progress = self.progress; // 스크롤 진행 상태 (0~1)
    gsap.to(".orange-circle", {
      y: progress < 1 ? "0" : "100vh", // Section 3 아래로 배치
      duration: 0.3,
      ease: "power2.inOut",
    });
  },
});

// 회전 선 애니메이션 추가
timeline.fromTo(".rotating-line", {
  opacity: 0, // 처음에 보이지 않음
  rotate: 45, // 45도 각도에서 시작
}, {
  opacity: 0.15, // 선이 나타남
  rotate: -180, // 시계 반대방향으로 1바퀴 돌고 수직으로
  height: "150vmax", // 세로가 긴 디바이스에서는 100vh, 가로가 긴 디바이스에서는 100vw가 되도록
  duration: 7, // 오렌지 원 축소와 같은 타이밍으로 진행
  ease: "power2.inOut",
}, 5);

// 각 카드에 ScrollTrigger 애니메이션 추가
document.querySelectorAll(".card").forEach((card) => {
  const cardTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 80%", // 카드가 화면의 하단에서 시작
      end: "top 0%", // 카드가 화면 상단으로 사라질 때까지
      scrub: true, // 스크롤과 동기화
    },
  });

  // 확대 애니메이션
  cardTimeline
    .fromTo(
      card,
      { opacity: 0.2, scale: 0.9, y: 100 },
      { opacity: 1, scale: 1.2, y: 0, duration: 1.5, ease: "power2.out" }
    )
    // 유지 단계
    .to(card, { scale: 1.2, opacity: 1, duration: 1, ease: "power2.inOut" })
    // 축소 애니메이션
    .to(card, { opacity: 0.2, scale: 0.9, y: -100, duration: 1.5, ease: "power2.in" });
});


document.querySelectorAll(".split").forEach(text => {
  let theText = text.innerText;
  let newText = "";

  for (let i = 0; i < text.innerText.length; i++) {
    newText += "<span aria-hidden='true'>";
    if (text.innerText[i] == " ") {
      newText += " "
    } else {
      newText += text.innerText[i];
    }
    newText += "</span>";
  }
  text.innerHTML = newText;
  text.setAttribute("aria-label", theText);
});


gsap.utils.toArray(".split").forEach((text) => {
  gsap.from(text.querySelectorAll("span"), {
    yPercent: 100,
    autoAlpha: 0,
    duration: 0.5,
    opacity: 0,
    ease: "circ.out",
    stagger: 0.04,
    stagger: {
      amount: 0.5,
      from: "random"
    },

    scrollTrigger: {
      trigger: text,
      start: "+=1000 bottom",
      end: "+=400",
      scrub: true,
      markers: false,
      toggleActions: "play none none reverse",
    }
  });
});