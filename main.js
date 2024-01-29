// 📍 splitting
Splitting();


// 📍 lenis
const lenis = new Lenis()
lenis.on('scroll', (e) => {})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// 📍 gsapPlugin
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSRulePlugin);

// 📍 page2 parallel
let pTag1 = document.querySelector('.first-parallel');

let textArr1 = 'Welcome Hello Welcome Hello Welcome Hello Welcome Hello'.split(' ');

// 이미지 경로
let imageUrl = './img/17.png';
let imageUrl2 = './img/21.png';
let imageUrl3 = './img/27.png';
let imageUrl4 = './img/28.png';


// 이미지를 추가할 위치
let imageIndex = 1; // 예시로 세 번째 단어 뒤에 이미지 추가
let imageIndex2 = 4; // 예시로 세 번째 단어 뒤에 이미지 추가
let imageIndex3 = 7; // 예시로 세 번째 단어 뒤에 이미지 추가
let imageIndex4 = 10; // 예시로 세 번째 단어 뒤에 이미지 추가

// 이미지를 textArr1 배열에 추가
textArr1.splice(imageIndex, 0, `<img src="${imageUrl}" alt="Image">`);
textArr1.splice(imageIndex2, 0, `<img src="${imageUrl2}" alt="Image">`);
textArr1.splice(imageIndex3, 0, `<img src="${imageUrl3}" alt="Image">`);
textArr1.splice(imageIndex4, 0, `<img src="${imageUrl4}" alt="Image">`);

let count1 = 0;

initTexts(pTag1, textArr1);

function initTexts(element, textArray) {
  textArray.push(...textArray)
  for (let i = 0; i < textArray.length; i++) {
    element.innerHTML += `${textArray[i]}\u00A0\u00A0\u00A0`
  }
}

function animate() {
  count1++;
  count1 = marqueeText(count1, pTag1, -1)
  window.requestAnimationFrame(animate)
}

function marqueeText(count, element, direction) {
  if (count > element.scrollWidth / 2) {
    count = 0;
    element.style.transform = `translate(0,0)`;
  }
  element.style.transform = `translate(${count * direction}px,0)`;

  return count
}
animate();


// 📍 page2 img
window.onload = function () {
  var initialImagePath = './img/me.jpg';
  image.src = initialImagePath;
};

var image = document.getElementById('hoverImage');

function showImage(word) {
  var imagePath;

  // 각 단어에 따른 이미지 경로 설정
  switch (word) {
    case 'name':
      imagePath = './img/me.jpg';
      break;
      // 다른 단어에 대한 case 추가
    case 'exhibition':
      imagePath = './img/2.jpg';
      break;
    case 'musical':
      imagePath = './img/exhibition.jpg';
      break;
    case 'concert':
      imagePath = './img/concert.jpg';
      break;
    case 'knitting':
      imagePath = './img/kniiiit.jpg';
      break;
    case 'cute':
      imagePath = './img/page222.jpg';
      break;

    default:
      imagePath = ''; // 기본값으로 빈 문자열 또는 기본 이미지를 설정
  }

  image.src = imagePath;
  image.style.display = 'block';
}

/* function hideImage() {
  var image = document.getElementById('hoverImage');
  image.style.display = 'none';
} */


// 📍 page2 text
const $txt = document.querySelector(".txt-title");
const content = "A few words about";
let contentIndex = 0;

let typing = function () {
  $txt.innerHTML += content[contentIndex];
  contentIndex++;
  if (content[contentIndex] === "\n") {
    $txt.innerHTML += "<br />";
    contentIndex++;
  }
  if (contentIndex > content.length) {
    $txt.textContent = "";
    contentIndex = 0;
  }
};

setInterval(typing, 200);


// 📍 page3 img
function changeMainImage(newImageSrc) {

  var mainImage = document.querySelector('.page3mainimg');

  mainImage.src = newImageSrc;
}

// 📍 page3 panel
var skillCount = document.querySelectorAll('.skillbar__count');

function skillCountWidth() {
  var i;
  var sc = skillCount.length;

  for (i = 0; i < sc; i++) {
    var attr = skillCount[i].getAttribute("data-percent");
    skillCount[i].style.width = attr;

    var percentDisplay = document.createElement('span');
    percentDisplay.classList.add('percent-display');
    percentDisplay.textContent = attr;
    skillCount[i].appendChild(percentDisplay);
  }
}

function activateBar() {
  var i;
  var sc = skillCount.length;

  for (i = 0; i < sc; i++) {
    skillCount[i].classList.add('is-active');
  }
}

function deactivateBar() {
  var i;
  var sc = skillCount.length;

  for (i = 0; i < sc; i++) {
    skillCount[i].classList.remove('is-active');
  }
}

gsap.to(".panel", {
  scrollTrigger: {
    trigger: ".page3",
    start: "top 50%", // .page3의 상단이 뷰포트의 50% 지점에 도달했을 때 시작
    toggleActions: "play reset",
    onToggle: function (self) {
      if (self.isActive) {
        // 현재 페이지가 보이는 상태
        gsap.to(".panel", {
          x: "0%",
          duration: 1,
          onComplete: function () {
            // 패널이 오른쪽에서 슬라이드로 나타나는 애니메이션이 완료된 후에 3초 뒤에 activateBar() 함수 실행
            gsap.delayedCall(0.1, function () {
              activateBar();
              skillCountWidth();
            });
          },
        });
        // 1초 후에 이미지 요소들이 차례대로 나타나도록 설정
      } else {
        // 현재 페이지가 보이지 않는 상태
        gsap.to(".panel", {
          x: "100%",
          duration: 1,
        }); // 패널을 오른쪽으로 슬라이드하여 감추기
        deactivateBar();
      }
    },
  },
});

/* gsap.to(".panel", {
  scale: 1,
  scrollTrigger: {
    trigger: ".page3",
    start: "top 50%", 
    // toggleActions: "play reset",
    onToggle: function (self) {
      if (self.isActive) {
        // 페이지가 보이는 상태
        gsap.to(".panel", {
          scale: 1, 
          duration: 1, 
        });
      } else {
    
        gsap.to(".panel", {
          scale: 0, 
          duration: 1,
        });
      }
    },
  },
}); */



// 📍 page7
/* document.addEventListener("DOMContentLoaded", function () {
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");

  const imagesContainer = document.getElementById("image-container");
  let images = document.querySelectorAll(".model-images");

  let cloneLastImage = images[images.length - 1].cloneNode(true);
  imagesContainer.prepend(cloneLastImage);

  const imageCount = images.length;
  let currentImage = 0;

  let firstImageIndexValue = 0;
  let currentFirstImage = images[0];
  let currentLastImage = images[images.length - 1];

  function buttonPressedAnimation(buttonId) {
    let rule = CSSRulePlugin.getRule(buttonId);
    let tl = gsap.timeline();

    gsap.set(rule, {
      cssRule: {
        scale: 1,
        border: "solid 0.1rem #fff",
        opacity: 0,
      },
    });

    tl.to(rule, {
      duration: .2,
      cssRule: {
        scale: 1.5,
        opacity: 1,
      },
    });

    tl.to(rule, {
      duration: 0.2,
      cssRule: {
        scale: 3,
        opacity: 0,
      },
      ease: "power2.out",
    });

    tl.to(rule, {
      duration: 0.2,
      cssRule: {
        scale: 1,
      },
      ease: "power2.in",
    });
  }

  function staggerImageAnimation(fromValue, toValue, direction) {
    gsap.fromTo(
      ".model-images", {
        translate: fromValue,
      }, {
        translate: toValue,
        stagger: {
          from: direction,
          amount: 0.3,
        },
        ease: "power2.inOut",
      }
    );
  }

  function progressBarAnimation() {
    gsap.to("#progress-bar", {
      scaleX: `${1 / imageCount + (currentImage % imageCount) / imageCount}`,
      duration: 0.3 * ((imageCount - 1) / 2),
      ease: "power2.inOut",
    });
  }

  gsap.set("#progress-bar", {
    scaleX: `${1 / imageCount + currentImage / imageCount}`,
  });


  // Image Placements
  function moveImagesTotheLeft() {
    images = document.querySelectorAll(".model-images");
    let cloneFirstImage = images[1].cloneNode(true);
    imagesContainer.append(cloneFirstImage);

    let fromValue = `0`;
    let toValue = `calc(-100% - 0.5rem) `;

    staggerImageAnimation(fromValue, toValue, "start");
    images[0].remove();
  }

  function moveImagesTotheRight() {
    images = document.querySelectorAll(".model-images");
    let cloneLastImage = images[images.length - 2].cloneNode(true);

    imagesContainer.prepend(cloneLastImage);
    let fromValue = `calc(-200% - 1rem)`;
    let toValue = `calc(-100% - 0.5rem) `;
    staggerImageAnimation(fromValue, toValue, "end");
    images[images.length - 1].remove();
  }


  // Event Listeners
  leftArrow.addEventListener("click", () => {
    moveImagesTotheRight();
    buttonPressedAnimation("#left-arrow:before");
    gsap.set("#progress-bar", {
      scaleX: `${1 / imageCount + (currentImage % imageCount) / imageCount}`,
    });
    currentImage = (currentImage - 1) % imageCount;

    if (currentImage < 0) {
      currentImage = 3;
    }

    progressBarAnimation();
  });


  rightArrow.addEventListener("click", () => {
    moveImagesTotheLeft();
    buttonPressedAnimation("#right-arrow:before");
    gsap.set("#progress-bar", {
      scaleX: `${1 / imageCount + (currentImage % imageCount) / imageCount}`,
    });

    currentImage = (currentImage + 1) % imageCount;

    progressBarAnimation();
  });

  setInterval(function () {
    rightArrow.click();
  }, 4000);


  gsap.to(".page7", {
    backgroundColor: "#29C1A2",
    color: "#fff",
    scrollTrigger: {
      trigger: ".page7",
      start: "top 40%",
      end: "bottom top",
      toggleActions: "play none none reverse",
    },
  });
}); */


// 📍 footer sticker
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.page3_img img');

  images.forEach((img) => {
    let isDragging = false;
    let offsetX, offsetY;

    img.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - img.getBoundingClientRect().left;
      offsetY = e.clientY - img.getBoundingClientRect().top;
      img.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      img.style.cursor = 'grab';
    });
  });
});



gsap.to(".page3_img img", {
  opacity: 0, // 시작 시 크기
  scrollTrigger: {
    trigger: ".footer",
    start: "top 30%",
    onToggle: function (page3img) {
      if (page3img.isActive) {
        // 페이지가 보이는 상태
        gsap.to(".page3_img img", {
          opacity: 1,
          stagger: 0.2, // 애니메이션 기간
        });
      } else {
        // 페이지가 보이지 않는 상태
        gsap.to(".page3_img img", {
          opacity: 0,
          stagger: 0.1, // 애니메이션 기간
        });
      }
    },
  },
});



// 📍 footer link
document.addEventListener('DOMContentLoaded', function () {
  var aboutLink = document.querySelector('.footer_about');
  var workLink = document.querySelector('.footer_work');
  var mainLink = document.querySelector('.footer_main');

  if (aboutLink) {
    aboutLink.addEventListener('click', function () {
      scrollToElement('.page3');
    });
  }

  if (workLink) {
    workLink.addEventListener('click', function () {
      scrollToElement('.page4');
    });
  }

  if (mainLink) {
    mainLink.addEventListener('click', function () {
      scrollToElement('.page1');
    });
  }

  function scrollToElement(elementSelector) {
    var element = document.querySelector(elementSelector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
});