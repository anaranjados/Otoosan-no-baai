document.getElementById("cYear").innerText = new Date().getFullYear();	// Подстановка текущего года в подвал
$(document).scroll(function() {			// Перекрашивание меню в шапке
	if ($(document).scrollTop() > 150) {
		$("#menu li a").css('color', 'darkgrey');
		$('#add-phone').show();
	} else {
		$("#menu li a").css('color', '#202020');
		$('#add-phone').hide();
	}
})