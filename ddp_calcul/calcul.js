window.addEventListener('load', function () {
   // Arancel y riesgo de aduana desde 21.03.2019
   const conds = [
         {hs: 'az_menos05',		arancel: 7.5, riesgo: 0.6 },
         {hs: 'az_mas05menos10', arancel: 12,  riesgo: 1.5 },
         {hs: 'az_mas10', 		arancel: 7.5, riesgo: 1.3 },
         {hs: 'mos_menos05',		arancel: 12,  riesgo: 1.5 },
         {hs: 'mos_mas05menos10',arancel: 12,  riesgo: 1.5 },
         {hs: 'mos_marmol', 		arancel: 14,  riesgo: 1.3 },
         {hs: 'mos_vitreous',	arancel: 10,  riesgo: 3	  },
         {hs: 'finalizado',		arancel: 7.5, riesgo: 3   },	// No se sabe del riesgo, puse 3 por apx.
         {hs: 'list_inox',		arancel: 10,  riesgo: 2.5 },
         {hs: 'lis_alum',		arancel: 10,  riesgo: 5   },
         {hs: 'lavam_arcilla',	arancel: 8,   riesgo: 0.25},	// No se sabe de arancel, puse 8% por apx.
         {hs: 'lavam_madera',	arancel: 8,	  riesgo: 0.9 },	// No se sabe de arancel
         {hs: 'lavam_marmol', 	arancel: 8,	  riesgo: 0.25},	// No se sabe de arancel
         {hs: 'lavam_piedra',	arancel: 8,	  riesgo: 1.36}		// No se sabe de arancel
      ];
   // Escondiendo campos en caso de PZ
   let elex = { arncl: (conds[0].arancel)/100+1,
             rsgo: conds[0].riesgo }
   const tipo_exw = document.getElementsByName('ventaPor');
   for (r in tipo_exw) {	tipo_exw[r].onchange = typeHandler }
   function typeHandler() {
      const m2 = document.getElementById('sec-m2');
      if     (this.id === 'por-pz') {	m2.className = 'hide'	}
      else if(this.id === 'por-m2') {	m2.classList = ''	}
   };
   // Eleccion de tipo
   document.querySelector('select').addEventListener('change', function() {
      for (i in conds) {
         if (this.value === conds[i].hs)  {
            elex.arncl = (conds[i].arancel)/100+1;
            elex.rsgo = conds[i].riesgo;
         }
      }
   });
   
   
   document.querySelector('button').addEventListener('mousedown', function() {
      let ddp, m2_cont, increm_Azulejo, increm_freqCompra, decrem_dealer;
      const transp = 2250;
      const peso_pal = 19;
      const peso_cont = 25900;
      const premio_exped = 1450;
      /*
      const increm_retail = 1.4;
      const increm_web = 1.05;
      */
      const decrem_web = 1.25;
      const cursoEurUsd = 1.1;
      const iva = 1.2; //(parseInt(document.getElementById('iva').value)/100)+1;
      // const increm = 1.3; //(parseInt(document.getElementById('increm').value)/100)+1;
      const cursoEurRub = 76.5; //parseFloat(document.getElementById('curso').value);
      const exw = parseFloat(document.getElementById('exw').value);
      const pz_caja = parseInt(document.getElementById('pz-caja').value);
      const m2_caja = parseFloat(document.getElementById('m2-caja').value);
      const peso_caja = parseFloat(document.getElementById('peso-caja').value);
      const cj_pal = parseInt(document.getElementById('cj-pal').value);
      let dcto = document.getElementById('descuento').value;
      if ( dcto == '') { dcto = 1 }
      else 	{	dcto = parseInt(document.getElementById('descuento').value)/100+1 };
      
      
      if (document.getElementById('regular').checked) {			increm_freqCompra = 1.4286; decrem_dealer = 1.3	}
      else if (document.getElementById('por-pedido').checked) {	increm_freqCompra = 1.3333; decrem_dealer = decrem_web	}
   
      if (document.getElementById('por-m2').checked) {
         let pal_lim = Math.round(peso_cont / (peso_caja * cj_pal +peso_pal));
            if (pal_lim > 22) { pal_lim = 22 }
         m2_cont = (m2_caja*cj_pal) * pal_lim;
         increm_Azulejo = 1.35;
      }
      else if (document.getElementById('por-pz').checked) {
         const peso_una = parseFloat(document.getElementById('peso-caja').value) / parseFloat(document.getElementById('pz-caja').value);
         m2_cont = (peso_cont - 22*peso_pal) / peso_una;
         increm_Azulejo = 1.3;
      }
      // increm = increm_Azulejo + increm_freqCompra;
      
      const cif  = exw/dcto + transp/ m2_cont;
      const vaso = {
                 primo: cif*elex.arncl,
                 argdo: peso_caja/ m2_caja *(elex.rsgo /cursoEurUsd) *elex.arncl
               }
      
      if (vaso.primo > vaso.argdo) {	ddp = vaso.primo + premio_exped / m2_cont;	console.log('DDP entro normal (por precio de fabrica)') }
      else {							ddp = vaso.argdo + premio_exped / m2_cont;	console.log('DDP entro por riesgo') }	
      
      const pnr = ddp*iva*increm_Azulejo*increm_freqCompra*cursoEurRub;	// precio al por menor recomendado
      
      // Impreso
      document.getElementById('RESULTADOS').style.display   = 'block';
      document.getElementById('ddp').innerText       = ddp.toFixed(2);
      document.getElementById('retail-m2').innerText = pnr.toFixed(2);
      document.getElementById('retail-pz').innerText = (pnr* m2_caja/ pz_caja).toFixed(2)
      document.getElementById('deal-m2').innerText   = (pnr/decrem_dealer).toFixed(2);
      document.getElementById('deal-pz').innerText   = (pnr/decrem_dealer * m2_caja/ pz_caja).toFixed(2);
      document.getElementById('web-m2').innerText    = (pnr/decrem_web).toFixed(2);
      document.getElementById('web-pz').innerText	  = (pnr/decrem_web * m2_caja/ pz_caja).toFixed(2);
      
   })
}) 