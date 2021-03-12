$(document).scroll(function() {			// Перекрашивание меню в шапке
	if ($(document).scrollTop() > 150) {
		$("#menu li a").css('color', 'darkgrey');
		$('#add-phone').show();
	} else {
		$("#menu li a").css('color', '#202020');
		$('#add-phone').hide();
	}
})
document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById("cYear").innerText = new Date().getFullYear();	// Подстановка текущего года в подвал
	if (window.innerWidth > 1024) {		// Appending UX,desktop [ MTT, MTT-hide, Getbutton ]
		function cS() { return document.createElement('script') };
		const desk=[cS(), cS(), cS()];
		desk[0].crossorigin='anonymous';   desk[0].src="//api.pozvonim.com/widget/callback/v3/59668ae623619193f954860155589c9a/connect";
		desk[1].textContent = "document.addEventListener('mousemove',move()); function move(){try {document.getElementById('pozvonim-button').style.display='none'} catch(err){setTimeout(move, 150)}}";
		desk[2].textContent = '(function(){var options = {whatsapp:"+7(991)0345964",telegram:"laraceramica",call_to_action:"",button_color:"rgba(15,101,80,0.6)",position: "left",order: "whatsapp,telegram"};var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;var s = document.createElement("script");s.async = true;s.src = url + "/widget-send-button/js/init.js";s.onload = function () { WhWidgetSendButton.init(host, proto, options);};var x = document.getElementsByTagName("script")[0];x.parentNode.insertBefore(s, x)})();';
		desk.forEach(e => document.body.appendChild(e) )
	}
})