const load = () => {
    setTimeout(() => {
      document.querySelector('.navbar').style.top='0';
    }, 300);
  }
  
 

  const arrow = document.querySelector('.cta__img');

  const rot = () => {
      arrow.style.transform = "rotate(-90deg)";
  };
  
  const rot_back = () => {
    arrow.style.transform = "rotate(0deg)";
  };
  const img = document.querySelector('.hero__img')
  let width = window.innerWidth;
  if(width<=1010){
    img.src='/static/images/ebook_back.jpg';
  }

  