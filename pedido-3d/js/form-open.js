window.onload= ()=> {
   const a = document.getElementsByClassName('typed-fields');
   const b = document.querySelectorAll('.hide');
   // constaints above must have same length

   for (let i=0; i < a.length; i++) {
      a[i].addEventListener('keypress', ()=> {
         b[i].classList='';
      })
   }

   $('.fade').slick({
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
      lazyLoad: 'easeIn',
   });
}