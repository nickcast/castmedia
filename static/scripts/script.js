// On Load
const load = () => {
  setTimeout(() => {
    document.querySelector('.navbar').style.top='0';
  }, 300);
}

// Star Rotation

const star = document.querySelector('.star__img')

// Nav

let prev_Position = window.pageYOffset;
let navbar = document.querySelector('.navbar');

// Double Ctext

leftTxt = document.querySelector('.first__dtext')
rightTxt = document.querySelector('.second__dtext')


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
  console.log(cur_Position);
  prev_Position = cur_Position;
  // Scroll Animation
  if(window.pageYOffset >= 700 && window.pageYOffset <= 1270){
    let transformValueLeft = window.pageYOffset/2-326
    let transformValueRight = -1*(window.pageYOffset/2-326)
    leftTxt.style.transform = "translateX(" + transformValueLeft + "px)";
    rightTxt.style.transform = "translateX(" + transformValueRight + "px)";
  } else if(window.pageYOffset <= 1270){
    
  }
}

// Smooth Scrolling Behaviour

gsap.registerPlugin(ScrollTrigger);

var container = document.querySelector(".body__wrapper");

var height = container.clientHeight;
document.body.style.height = height + "px";

// gsap.to(container, {
//   y: -(height - document.documentElement.clientHeight),
//   scrollTrigger: {
//     trigger: document.body,
//     start: "top top",
//     end: "bottom bottom",
//     scrub: 1
//   }
// });

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

// easeOutExpo

