// document.addEventListener('DOMContentLoaded', () => {
   const a = document.getElementById('notify'),
         b = document.getElementById('shaded');
   function hide() { a.setAttribute('hidden', ''); b.setAttribute('hidden', '')  }
   document
      .querySelector('.add_to_cart')
         .addEventListener('click', ()=>{
            a.removeAttribute('hidden');
            b.removeAttribute('hidden');
   });
            b.addEventListener('click', hide);
   document
      .querySelector('#notify button:first-of-type')
         .addEventListener('click', hide);
   document
      .querySelector('#notify i')
         .addEventListener('click', hide);
   document
      .querySelector('#notify button:last-of-type')
         .addEventListener('click', ()=> {
            window.location.href = 'https://laraceramica.com/orden/'
   })
// })