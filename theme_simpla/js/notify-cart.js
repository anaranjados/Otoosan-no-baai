// Notify about add to cart
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
// end of notification

// set grey background to 'white' tiles
const currentURI = window.location.pathname;
const whiteTilesURI = ['/uno/catalog/product/nastennaya-napolnaya-plitka-keramogranit-dortmund-hex-225x259-mijares/'];
whiteTilesURI.forEach( e => {
   if (currentURI == e) {
      zw_imagegallerypreview.style.backgroundColor = '#6fa296';   // green theme color
      zw_imagegallerypreview.style.borderBottomWidth = 0;
      zw_imagegallerypreview.style.borderTopRightRadius = '2rem';
      zw_imagegallerythumbnails.style.backgroundColor = '#6fa296';
      zw_imagegallerythumbnails.style.borderRadius = '0 0 2rem 2rem';
   }
})