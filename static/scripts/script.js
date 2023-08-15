// On Load
const load = () => {
  setTimeout(() => {
    document.querySelector('.navbar').style.top='0';
  }, 300);
}

const isElementInViewPort = (element) => {
  let rect = element.getBoundingClientRect();
  let viewPortBottom = window.innerHeight || document.documentElement.clientHeight; 
  let viewPortRight = window.innerWidth || document.documentElement.clientWidth;
  let isTopInViewPort = rect.top >= 0,
      isLeftInViewPort = rect.left >= 0,
      isBottomInViewPort = rect.bottom <= viewPortBottom,
      isRightInViewPort = rect.right <= viewPortRight;
 return (isTopInViewPort && isLeftInViewPort && isBottomInViewPort && isRightInViewPort);
}

const animate__service = (target, dur) => {
  anime({
    targets: target,
    translateY: [100, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: dur,
    delay: (el, i) => 400+40*i,  
  })
}

// Star Rotation

const star = document.querySelector('.star__img')

// Nav
let prev_Position = window.pageYOffset;
let navbar = document.querySelector('.navbar');

// Double Ctext

leftTxt = document.querySelector('.first__dtext')
rightTxt = document.querySelector('.second__dtext')
has_scrolled = false
service_scrolled = false

window.onscroll = () => {
  // Star
    star.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
  // Nav

  let cur_Position = window.pageYOffset;
  if(prev_Position > cur_Position){
    navbar.style.top='0';
  } else {
    navbar.style.top='-90px';
  }
  prev_Position = cur_Position;

  // Scroll Animation
  let viewportWidth = window.innerWidth;
  if(viewportWidth >= 700){
    if(window.pageYOffset >= 700 && window.pageYOffset <= 1270){
      let transformValueLeft = window.pageYOffset/2-326
      let transformValueRight = -1*(window.pageYOffset/2-326)
      leftTxt.style.transform = "translateX(" + transformValueLeft + "px)";
      rightTxt.style.transform = "translateX(" + transformValueRight + "px)";
    }else if(window.pageYOffset >= 1050){
      if(has_scrolled==false){
        show__txt()
        has_scrolled = true
      } else {
        
      }
    }
  }else if(viewportWidth < 700){
    if(window.pageYOffset >= 800 && window.pageYOffset <= 1160){
      let transformValueLeft = window.pageYOffset/2.5-320
      let transformValueRight = -1*(window.pageYOffset/2.5-320)
      leftTxt.style.transform = "translateX(" + transformValueLeft + "px)";
      rightTxt.style.transform = "translateX(" + transformValueRight + "px)";
    }else if(window.pageYOffset >= 850){
      if(has_scrolled==false){
        show__txt()
        has_scrolled = true
      } else {
        
      }
    }
  }
  

  // Services Animation 
  
  if(isElementInViewPort(document.querySelector('.service__title'))){
    if(service_scrolled == false){
      animate__service('.service__title', 1000)
      animate__service('.ser1', 1200)
      animate__service('.ser2', 1400)
      animate__service('.ser3', 1650)
      animate__service('.ser4', 1800)
      animate__service('.ser5', 2000)
      animate__service('.ser6', 2200)


      service_scrolled=true
    } else {

    }
    
  }
}

const show__txt = () => {
  anime({
    targets: ".lower__ctext",
    translateY: [100, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1000,
    delay: (el, i) => 400+40*i,  
  })
}

// Ham Menu Animation

nav__list = document.querySelector('.nav__list')

ham__btn = document.querySelector('.toggle')

ham__btn.addEventListener('click', ()=>{
  nav__list.classList.toggle('active')
})

// Anime.js

anime({
  targets: ".hero__txt",
  translateY: [100, 0],
  translateZ: 0,
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1000,
  delay: (el, i) => 400+40*i,  
})

anime({
  targets: ".hero__desc , .hero__cta",
  translateY: [100, 0],
  translateZ: 0,
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1500,
  delay: (el, i) => 400+40*i,  
})

anime({
  targets: ".hero__img",
  translateY: [100, 0],
  translateZ: 0,
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1000,
  delay: (el, i) => 400+40*i,  
})

// Marquee Second 
const el = document.querySelector(".wide__marquee");
let hrs = document.querySelectorAll('.marquee__hr')

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  el.style.display = 'none'
  for (let index = 0; index < hrs.length; index++) {
    let hr = hrs[index];
    hr.style.display = 'none'
  }
}else{

  // Widths
  let elWidth = el.offsetWidth;
  let windowWidth = window.innerWidth;
  
  // Mouse
  let mouseX = 0;
  let prevMouseX = 0;
  
  // Value we want to animate to
  let skewTarget = 0;
  let translateTarget = 0;
  
  // Value we use to animate
  let skewWithEasing = 0;
  let translateWithEasing = 0;
  
  // Determines how quick the animation/interpolation goes
  let skewEasingFactor = 0.1;
  let translateEasingFactor = 0.05;
  
  // Events
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleWindowResize);
  
  // Functions
  function handleMouseMove(e) {
    mouseX = e.pageX;
  }
  
  function handleWindowResize(e) {
    elWidth = el.offsetWidth;
    windowWidth = window.innerWidth;
  }
  
  function lerp(start, end, factor) {
    return (1 - factor) * start + factor * end;
  }
  
  function animateMe() {
    // Get difference between current and previous mouse position
    skewTarget = mouseX - prevMouseX;
    prevMouseX = mouseX;
  
    // Calc how much we need to translate our el
    translateTarget = (elWidth - windowWidth) / windowWidth * mouseX * -1;
  
    // Ease between start and target values (skew)
    skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);
  
    // Limit our skew to a range of 75 degrees so it doesn't "over-skew"
    skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -75), 75);
  
    // Ease between start and target values (translate)
    translateWithEasing = lerp(
    translateWithEasing,
    translateTarget,
    translateEasingFactor);
  
  
    el.style.transform = `
      translateX(${translateWithEasing}px)
      skewX(${skewWithEasing}deg)
    `;
  
    // RAF
    window.requestAnimationFrame(animateMe);
  }
  
  window.requestAnimationFrame(animateMe);
  
  
}

