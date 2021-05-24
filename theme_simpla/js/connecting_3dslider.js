window.addEventListener( 'load', function() {
   if (window.innerWidth>1024) {
      function crEl(p) { return document.createElement(p) }
      
      const obj = [
         {
            name: 'Керамическая плитка кабанчик Biselado 7.5x15 см',
            ref: '/cat/catalog/products/nastennaya-keramicheskaya-plitka-biselado-75x15-dar/',
            img: '/i/biselado-liso.jpg'
         },
         {
            name: 'Керамогранит Statuario 60x120 (Cifre)',
            ref: '/cat/',
            img: '/i/imitacion-1.jpg'
         }
      ];
      
      const di = [ crEl('div'), crEl('div'), crEl('div'), crEl('ol') ];
      di[0].className='banner'; di[1].className='dg-container'; di[2].className='dg-wrapper';   di[3].id="lightButton";
      ccphupper.appendChild(di[0]);    di[0].appendChild(di[1]);    di[1].appendChild(di[2]);   di[1].appendChild(di[3]);  // add to the end of header#ccphupper
      
      let ref = { a: new Array, im: new Array, li: new Array}; 
      for (let i=0; i<obj.length; i++) {
         ref.li[i] = crEl('li');
         ref.li[i].setAttribute('index', i);
         ref.im[i] = new Image;
         ref.im[i].alt = obj[i].name;
         ref.im[i].src = obj[i].img;
         ref.im[i].width='620';
         ref.im[i].height='410';
         ref.a[i] = crEl('a');
         ref.a[i].href = obj[i].ref;
         ref.a[i].appendChild( ref.im[i] );
         ref.a[i].insertAdjacentHTML('beforeend', obj[i].name);
         di[2].appendChild( ref.a[i] );
         di[3].appendChild( ref.li[i] );
      }
      ref.li[0].className='light';
      
      const sc = [ crEl('script'), crEl('script') ];
      sc[0].defer='';   sc[0].src="/f/slider3d_modernizr.js";
      sc[1].defer='';   sc[1].src="/f/slider3d_carrousel.js";
      document.body.appendChild(sc[0]);
      document.body.appendChild(sc[1]);
   }
})