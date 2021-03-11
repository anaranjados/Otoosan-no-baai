//Фильтр скрыть/показать группу значений свойства
$(document).ready(function(){

});

// Перекрашивание меню после пролистывания шапки
$(document).scroll(function() {
    if ($(document).scrollTop() > 150) {
    	$("#menu li a").css('color', 'darkgrey');
    	$('#add-phone').show();
    } else {
    	$("#menu li a").css('color', '#202020');
    	$('#add-phone').hide();
    }
});

// Подстановка текущего года в подвал
document.getElementById("cYear").innerText = new Date().getFullYear();