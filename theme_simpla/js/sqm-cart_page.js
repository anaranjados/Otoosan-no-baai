$(document).ready(function(){
	//Корзина 
webSettings.set_handler(function() { 
	let totalWeight = 0; //суммарный вес
	let totalSquere = 0; //суммарная площадь
	let totalSpace = 0; //суммарный объем
	
	$("#purchases .cart-row").each(function(){
		let cartRow = $(this);
		//параметры расчета: вес товара, площадь одной плитки
		let propertyWeight = $(this).find(".property-weight").html();
		let popertyOnePieceSquere = $(this).find(".property-one-piece-squere").html();
		
		//дополнительная переменная - штучный товар
		let propertyPieceGood = $(this).find(".property-piece-goods").html();
		if (propertyPieceGood!=undefined){
			propertyPieceGood = propertyPieceGood.toUpperCase();
			if (propertyPieceGood=="ДА"){
				propertyPieceGood = true;	
			}
			else{
				propertyPieceGood = false;	
			}
		}
		else {
			propertyPieceGood = false;	
		}
		
		//перевод к типу числа
		//вес товара
		if(propertyWeight!=null && propertyWeight!=""){
			propertyWeight = parseFloat(propertyWeight.replace(",","."));	
		}
		
		//площадь плитки
		if(popertyOnePieceSquere!=null && popertyOnePieceSquere!=""){
			popertyOnePieceSquere = parseFloat(popertyOnePieceSquere.replace(",","."));	
		}
		
		//получить количество товара
		function getGoodsCount(){
			let goodsCount;
			if ( $(".amount input[type='text']").length ){ 
				goodsCount = $(this).find(".amount input[type='text']").val();
			} 
			else{
				goodsCount = $(this).find(".confirm-goods-count").html();
				if(goodsCount!=null && goodsCount!=""){
					goodsCount = parseInt(goodsCount);	
				}
			}
			return goodsCount;
		}
		
		//расчитать площадь плитки
		function calcSquere(onePieceSquere, count){
			let goodsSquere = Math.round(onePieceSquere * count * 100)/100;
			return goodsSquere;
		}
		
		//расчитать вес товара в строке
		function calcWeight(weight, count){
			let goodsWeight	= weight * count;
			return goodsWeight;
		}
		
		//расчитать объем плитки в корзине
		function calcSpace(squere){
			let goodsSpace = Math.round(0.01 * squere * 1000)/1000;
			return goodsSpace;
		}
		
		//количество товара в строке корзины
		let goodsCountInRow = getGoodsCount.call(cartRow); 
		//вес товара в строке
		let goodsWeightInRow;
		if(propertyWeight!=null && propertyWeight!=""){
			goodsWeightInRow = calcWeight(propertyWeight, goodsCountInRow);
			$(this).find(".calc-row-weight").html(goodsWeightInRow);
		}
		
		//Если в корзину добавился товар плитка, то для нее считать м2.
		//Если в корзину добавляется товар не плитка, то площадь не считается, после слеша добавить "-".
		//Для штучных товаров площадь м2 не считать, после слеша добавить "-".
		//если товар не штучный и есть значение площади одной плитки 
		let goodsSquereInRow;
		if (propertyPieceGood == false && popertyOnePieceSquere!=null && popertyOnePieceSquere!=""){
			goodsSquereInRow = calcSquere(popertyOnePieceSquere, goodsCountInRow);
			//записать площадь плитки в строке
			$(this).find(".amount-squere").html(goodsSquereInRow);
		}
		//если товар штучный или товар не плитка (нет площади одной плитки)
		else{
			$(this).find(".amount-squere").html("-");
		}
		
		//расчитать суммарный вес товара в корзине. Вес + Вес в строке
		if(propertyWeight!=null && propertyWeight!=""){
			totalWeight = totalWeight + goodsWeightInRow;
		}
		
		//расчитать суммарную площадь товара. Площадь + площадь в строке.
		if(propertyPieceGood == false && popertyOnePieceSquere!=null && popertyOnePieceSquere!=""){
			totalSquere = totalSquere + goodsSquereInRow;
		}
		
		//расчитать сумарный объем товара. Объем + объем в строке.
		if(propertyPieceGood == false && goodsSquereInRow){
			let goodsSpaceInRow = calcSpace(goodsSquereInRow);
			totalSpace = totalSpace + goodsSpaceInRow;
		} 
				
		
	});
	
	//записать суммарный вес заказа в корзине
	if($("span").is(".total-weight")){
		totalWeight = Math.round(totalWeight*100)/100;
		$(".total-weight").html(totalWeight);	
	}
	//записать суммарную площадь заказа в корзине
	if($("span").is(".total-squere")){
		totalSquere = Math.round(totalSquere*100)/100;
		$(".total-squere").html(totalSquere);	
	}
	//записать суммарный объем заказа
	if($("span").is(".total-space")){
		totalSpace = Math.round(totalSpace * 1000)/1000;
		$(".total-space").html(totalSpace);	
	}
});

//Инициализация календаря для корзины
$("#confirm-date-order").datepicker();
$("#confirm-date-order").datepicker("option", "dateFormat", "dd.mm.yy");

$(document).on("focusout", ".confirm-comment-to-order, #ui-datepicker-div", function(){
	let confirmDateOrder = $("#confirm-date-order").val();
	let confirmCommentToOrder = $(".confirm-comment-to-order").val();
	let summaryComment;
	
	if (confirmDateOrder!="" && confirmDateOrder!=null){
		summaryComment = confirmDateOrder + " # " + confirmCommentToOrder;	
		}
	else{
			summaryComment = confirmCommentToOrder;
		}
	
	$("input[name='comment']").val(summaryComment);
});

//Информация о заказе
//Найти символ #, если найден показать строку с датой. Значение комментария разделить на две строки
if ( $("td").is(".order-info-client-comment") ){
	let orderInfoClientComment = $(".order-info-client-comment").html();
	let orderInfoDate, orderInfoComment;
	let squerePosition = orderInfoClientComment.indexOf('#');
	if( squerePosition!=-1 ){
		orderInfoDate = orderInfoClientComment.slice(0, squerePosition);
		orderInfoComment = orderInfoClientComment.slice(squerePosition+1);
		//если комментарий остался пустым, вывести "-"
		if(orderInfoComment==" "){
			orderInfoComment = "-" + orderInfoComment; 
		}
		$(".order-info-client-date-value").html(orderInfoDate);
		$(".order-info-client-date").show();
		$(".order-info-client-comment").html(orderInfoComment);
	}
}

//Новая дата получения заказа:
//инициализация календаря
$("#cart-info-new-date-order").datepicker();
$("#cart-info-new-date-order").datepicker("option", "dateFormat", "dd.mm.yy");

$("input[name='add_usermessage']").click(function(){
	let orderNumber = $(".cart-info__order-number").html();
	let orderdate = $(".cart-info__order-date").html();
	let orderClientDate = $(".order-info-client-date-value").html();
	
	if (orderClientDate==undefined){
		orderClientDate = "не указана";
	}
	let newOrderCientDate = $("#cart-info-new-date-order").val();
	let message = $("textarea[name='message']").val();
	
	let newDateMessage = "Заказ номер " + orderNumber + " от " + orderdate + ",дата для получения заказа " + orderClientDate + ". Новая дата для получения заказа: " + newOrderCientDate + "#" + message;
	$("textarea[name='message']").val(newDateMessage);
});


});