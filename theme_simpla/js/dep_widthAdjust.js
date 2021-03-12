// deprecated for poor result [used on catalog page]
$(document).ready(function() {
   adjustCatalogElements();
   $(window).resize( function(){ adjustCatalogElements() } );
   function adjustCatalogElements() {
   const wwd = $(window).width();
   let bw = ((wwd-13)*0.9-240)/2;
   let pw = 200;
   if (              wwd < 750 ) bw = (750*0.9-240)/1;
   if ( 750 < wwd && wwd < 1024) bw = (1024*0.9-240)/2;
   if (1024 < wwd && wwd < 1245) bw = ((wwd-13)*0.9-240)/2;
   if (1024 < wwd && wwd < 1245) bw = ((wwd-13)*0.9-240)/2;
   if (1245 < wwd && wwd < 1760) bw = ((wwd-13)*0.9-240)/3
   if (1760 < wwd && wwd < 2280) bw = ((wwd-13)*0.9-240)/4;
   if (wwd > 2280)               bw = ((wwd-13)*0.9-240)/5;
   if (1024 < wwd && wwd < 1184) pw = ((wwd-13)*0.9-240)/3-16;
   if (1184 < wwd && wwd < 1444) pw = ((wwd-13)*0.9-240)/4-16;
   if (1444 < wwd && wwd < 1724) pw = ((wwd-13)*0.9-240)/5-16;
   if (1724 < wwd && wwd < 2024) pw = ((wwd-13)*0.9-240)/6-16;
   if (2024 < wwd && wwd < 2304) pw = ((wwd-13)*0.9-240)/7-16;
   if (wwd > 2304 )              pw = 235;
   $(".collections .tiny_products li").css( {"width" : bw} );
   $(".collections .tiny_products li .image").css({"line-height:" : bw-10});
   $(".collections .tiny_products").css({"width" : (wwd)*0.9-240+30});
   /* $("#many").css({"max-width" : (wwd)*0.9-240});
   $("#many").css({"width" : (wwd)*0.9-240});
   $(".produtes .tiny_products li").css({"width" : pw});
   $(".produtes .tiny_products li").css({"height" : pw});
   $(".produtes .tiny_products .product .image").css({"line-height" : pw-10+'px'});
   $(".produtes .tiny_products").css({"width" : (wwd)*0.9-240+16}) */
   }
})