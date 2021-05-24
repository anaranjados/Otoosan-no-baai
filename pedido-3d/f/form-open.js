$('.fade').slick({
   dots: false,
   arrows: false,
   infinite: true,
   autoplay: true,
   autoplaySpeed: 3500,
   pauseOnHover: true,
   pauseOnFocus: true,
   lazyLoad: 'easeIn',
   adaptiveHeight: true,
   mobileFirst: true
});

const ty = document.getElementsByClassName('cstm-inp');
   for (i in ty) {
      ty[i].onkeypress = function() {
         this.parentNode.nextElementSibling.className="";
      }
   }

const v = document.querySelectorAll('video');
   for (i in v) {
      v[i].onclick= function(e) {
         e.target.muted = false;
         e.target.setAttribute('controls','');
      }
   }

const sten = document.querySelectorAll('input[name=stena-m2]'),
      pol = document.querySelectorAll('input[name=pol-m2]'),
      dup_sten = document.querySelectorAll('input[name=duplic__stena-m2]'),
      dup_pol = document.querySelectorAll('input[name=duplic__pol-m2]'),
      tot = document.querySelectorAll('.calcul > small');
   for (i in sten) {
      sten[i].oninput = function() {
         this.parentNode.parentNode.lastElementChild.innerHTML = 
            this.value * this.attributes.price_m2_stena.value +
               this.parentNode.parentNode.children[2].control.value *
               this.parentNode.parentNode.children[2].control.attributes.price_m2_pol.value +
                  '&ensp;₱';
         this.nextElementSibling.nextElementSibling.innerText = this.value + ' м²'
      }
      pol[i].oninput = function() {
         this.parentNode.parentNode.lastElementChild.innerHTML = 
            this.value * this.attributes.price_m2_pol.value +
               this.parentNode.parentNode.firstElementChild.control.value *
               this.parentNode.parentNode.firstElementChild.control.attributes.price_m2_stena.value +
                  '&ensp;₱';
         this.nextElementSibling.nextElementSibling.innerText = this.value + ' м²'
      }

      dup_sten[i].oninput = function() {
         this.parentNode.parentNode.lastElementChild.innerHTML = 
            this.value * this.previousElementSibling.attributes.price_m2_stena.value +
               this.parentNode.parentNode.children[2].children[2].value *
               this.parentNode.parentNode.children[2].control.attributes.price_m2_pol.value +
                  '&ensp;₱';
      }
      dup_pol[i].oninput = function() {
         this.parentNode.parentNode.lastElementChild.innerHTML = 
            this.value * this.previousElementSibling.attributes.price_m2_pol.value +
               this.parentNode.parentNode.children[0].children[2].value *
               this.parentNode.parentNode.children[0].control.attributes.price_m2_stena.value +
                  '&ensp;₱';
      }

      if (window.screen.availWidth >= 731) {
         try {
            tot[i].innerHTML =   // calculation as page is loaded
                  sten[i].value * sten[i].attributes.price_m2_stena.value + 
                     pol[i].value * pol[i].attributes.price_m2_pol.value +
                        '&ensp;₱';
         }
         catch { }
      }
}