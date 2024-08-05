// On Load
const load = () => {
    setTimeout(() => {
      document.querySelector('.navbar').style.top='0';
    }, 300);
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

const arrow = document.querySelector('.cta__img');

const rot = () => {
    arrow.style.transform = "rotate(-90deg)";
};

const rot_back = () => {
  arrow.style.transform = "rotate(0deg)";
};