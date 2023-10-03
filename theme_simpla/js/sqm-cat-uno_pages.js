$(document).ready(function () {		//  Расчет цены за м2, расчет количества плитки и площади.
	webSettings.set_handler(function (eventSource) {
		if (webSettings.isReadyOrControl(eventSource, Constants.zw_Catalog.ID)) {
			$(".price_tab, .prod_price_tab ").each(function () {
				let good = $(this);
				//параметры расчета: цена одной штуки, площадь одной плитки, ширина, высота.
				let onePiecePrice = parseFloat($(this).find(".price").html().replace(",", ".")),
					boxPieceCount = parseInt($(this).find(".property-box-piece-count").html()),
					boxSquere = parseFloat($(this).find(".property-box-squere").html().replace(",", ".")),
					propertyOnePieceSquere = parseFloat($(this).find(".property-one-piece-squere").html()),
					propertyWidth = NaN,
					propertyHeight = NaN;

				//если не задана площадь одной плитки, т.е. не число, то получить параметры ширина и высота.
				if (isNaN(propertyOnePieceSquere)) {
					propertyWidth = parseFloat($(this).find(".property-width").html());
					propertyHeight = parseFloat($(this).find(".property-height").html());
				}

				//дополнительная переменная - штучный товар
				let propertyPieceGood = $(this).find(".property-piece-goods").html().toUpperCase() === "ДА";

				//если у товара не указаны параматры для плитки, то это не плитка и прятать цену за м2 и калькулятор
				if (!propertyPieceGood && isNaN(boxPieceCount) && isNaN(boxSquere) && isNaN(propertyOnePieceSquere) && isNaN(propertyWidth) && isNaN(propertyHeight)) {
					propertyPieceGood = true;
				}

				//если цена есть, установить в цену одной шт. товара
				if (!isNaN(onePiecePrice)) {
					setPrice(1, onePiecePrice);
					//если заданы свойства кол-во шт в упаковке и кол-во м2 в упаковке, установить цены за м2 исходя из этого параметра
					if (!isNaN(boxPieceCount) && !isNaN(boxSquere)) {
						setOneSquerePriceByBoxProperties.call(good, onePiecePrice, boxPieceCount, boxSquere);
					}
					//если есть площадь одной плитки, установить цены за м2 исходя из этого параметра
					else if (!isNaN(propertyOnePieceSquere)) {
						setOneSquerePriceByPropertySquere.call(good, propertyOnePieceSquere, onePiecePrice);
					}

					//если нет площади одной плитки, использовать параметры ширина и высота
					else if (!isNaN(propertyWidth) && !isNaN(propertyHeight)) {
						//установить цену за м2
						setOneSquerePrice.call(good, propertyWidth, propertyHeight, onePiecePrice);
					}

					//для калькулятора
					if (!isNaN(propertyOnePieceSquere)) {
						//для калькулятора:  установить значение площади выбранного количества плиток, если заполнено свойство площадь одной плитки
						setSquereByPropertySquere(propertyOnePieceSquere, 1);
					}

					//если нет площади одной плитки, использовать параметры ширина и высота
					else if (!isNaN(propertyWidth) && !isNaN(propertyHeight)) {
						//для калькулятора: установить значение площади выбранного количества плиток
						setSquere(propertyWidth, propertyHeight, 1);
					}
				}

				//установить значение цены одной плитки
				function setPrice(count, onePiecePrice) {
					if (!isNaN(count)) {
						let price = Math.round(count * onePiecePrice * 100) / 100;
						$("#price").val(("" + price).replace(".", ","));
					}
				}
				//установить цену за м2, если заданы свойства кол-во шт в упаковке и кол-во м2 в упаковке
				function setOneSquerePriceByBoxProperties(onePiecePrice, boxPieceCount, boxSquere) {
					let oneSquerePrice = Math.round((onePiecePrice * boxPieceCount * 100) / boxSquere) / 100;
					oneSquerePrice = ("" + oneSquerePrice).replace(".", ",");
					$(this).find(".squere-price").html(oneSquerePrice);
				}

				//установить цену за м2, если заполнено свойство площади одной плитки
				function setOneSquerePriceByPropertySquere(propertyOnePieceSquere, onePiecePrice) {
					let oneSquerePrice = Math.round(onePiecePrice / propertyOnePieceSquere * 100) / 100;
					oneSquerePrice = ("" + oneSquerePrice).replace(".", ",");
					$(this).find(".squere-price").html(oneSquerePrice);
				};

				//установить цену за м2, если нет площади одной плитки, но есть ширина и высота
				function setOneSquerePrice(width, height, onePiecePrice) {
					let squere = width * height;
					let oneSquerePrice = Math.round(onePiecePrice / squere * 100) / 100;
					oneSquerePrice = ("" + oneSquerePrice).replace(".", ",");
					$(this).find(".squere-price").html(oneSquerePrice);
				};

				//калькулятор: установить значение площади выбранного количества плиток, если заполнено свойство площадь одной плитки
				function setSquereByPropertySquere(propertyOnePieceSquere, count) {
					if (!isNaN(count)) {
						let squere = propertyOnePieceSquere * count;
						$("#m2").val(("" + (Math.round(squere * 100) / 100)).replace(".", ","));
					}
				};

				//калькулятор: установить значение площади выбранного количества плиток
				function setSquere(width, height, count) {
					if (!isNaN(count)) {
						let squere = width * height * count;
						$("#m2").val(("" + (Math.round(squere * 100) / 100)).replace(".", ","));
					}
				};


				//калькулятор: расчет площади одного куска плитки
				function getOnePieceSquere(width, height) {
					if (width != undefined && height != undefined) {
						let onePieceSquere = width * height;
						return onePieceSquere;
					}
				}

				//калькулятор: установить значение количества плиток	
				function setPieceCounts(squereM2) {
					let pieceCounts = squereM2 / getOnePieceSquere(propertyWidth, propertyHeight);
					pieceCounts = Math.ceil(pieceCounts);
					$("input.add_amount_calc").val(pieceCounts);
				}

				//калькулятор: установить значение количества плиток, если своство площадь одной плитки заполнено
				function setPieceCountsByProperty(squereM2, propertyOnePieceSquere) {
					let pieceCounts = squereM2 / propertyOnePieceSquere;
					pieceCounts = Math.ceil(pieceCounts);
					$("input.add_amount_calc").val(pieceCounts);
				}


				//считать если товар не штучный
				if (propertyPieceGood === false) {
					//ввод количества
					let inputPieces = true;
					$(".add_amount_calc").keypress(function () {
						inputPieces = true;
						$(this).css('color', 'red');
						$("input#m2").css('color', '#000');
					});

					//ввод площади
					$("input#m2").keypress(function () {
						inputPieces = false;
						$(this).css('color', 'red');
						$(".add_amount_calc").css('color', '#000');
					});

					$(".calc-button").click(function () {
						let count = parseInt($("input.add_amount_calc").val());
						let squereM2 = parseFloat($("input#m2").val());

						//рассчет из количества
						if (inputPieces == true) {
							if (!isNaN(onePiecePrice)) {
								setPrice(count, onePiecePrice);
								//если есть площадь одной плитки
								if (!isNaN(propertyOnePieceSquere)) {
									setSquereByPropertySquere(propertyOnePieceSquere, count);
								}
								//по ширине и высоте
								else {
									setSquere(propertyWidth, propertyHeight, count);
								}
							}
						}
						//рассчет из площади
						else {
							if (!isNaN(onePiecePrice)) {

								if (!isNaN(squereM2)) {
									if (!isNaN(propertyOnePieceSquere)) {
										setPieceCountsByProperty(squereM2, propertyOnePieceSquere)
									}
									else {
										setPieceCounts(squereM2);
									}
									//получить новое значение количества плитки						
									let count = parseInt($("input.add_amount_calc").val());
									setPrice(count, onePiecePrice);

									if (!isNaN(propertyOnePieceSquere)) {
										setSquereByPropertySquere(propertyOnePieceSquere, count);
									}
									else {
										setSquere(propertyWidth, propertyHeight, count);
									}
								}
							}
						}
					});
				}

				//если товар штучный
				else {
					//прятать калькулятор, если товар штучный
					$("#price_calc").hide();
					$(this).find(".letiant-squere").hide();
					// спрятать м2 если товар штучный
					good.find(".variant-squere").hide();
				}

				//Наличие и поставка товара.
				//Для штучного товара оставить шт.
				//Для не штучного перевести в м2
				if (propertyPieceGood === false) {
					//Наличие
					$(this).find(".available-row").each(function () {
						let availablePieceCount = parseInt($(this).find(".available-count").html());
						let availableSquere; //площадь доступной плитки

						//если товар в наличии
						if (!isNaN(availablePieceCount)) {

							//если заполнено св-во площадь одной плитки 
							if (!isNaN(propertyOnePieceSquere)) {
								availableSquere = Math.round(propertyOnePieceSquere * availablePieceCount * 100) / 100;
								$(this).find(".available-count").html("~ " + availableSquere + " М²");
							}
							//если нет то использовать параметры ширины и высоты
							else {
								if (!isNaN(propertyWidth) && !isNaN(propertyHeight)) {
									let calcOnePieceSquere = getOnePieceSquere(propertyWidth, propertyHeight);
									availableSquere = Math.round(calcOnePieceSquere * availablePieceCount * 100) / 100;
									$(this).find(".available-count").html("~ " + availableSquere + " М²");
								}
							}
						}
					});

					//поставка
					$(this).find(".supplier-row").each(function () {
						let supplierPieceCount = parseInt($(this).find(".supplier-count").html());
						let supplierSquere; //площадь плитки поставки

						//если заполнено св-во площадь одной плитки 
						if (!isNaN(propertyOnePieceSquere)) {
							supplierSquere = Math.round(propertyOnePieceSquere * supplierPieceCount * 100) / 100;
							$(this).find(".supplier-count").html("~ " + supplierSquere + " М²");
						}
						//если нет то использовать парамаетры ширины и высоты
						else {
							if (!isNaN(propertyWidth) && !isNaN(propertyHeight)) {
								let calcOnePieceSquere = getOnePieceSquere(propertyWidth, propertyHeight);
								supplierSquere = Math.round(calcOnePieceSquere * supplierPieceCount * 100) / 100;
								$(this).find(".supplier-count").html("~ " + supplierSquere + " М²");
							}
						}
					});

					$(".stock-info-row").each(function () {
						let stockInfoCountInRow = parseInt($(this).find(".stock-info-count").html());
						let stockInfoSquereInRow;  //площадь доступной плитки в строке

						if (!isNaN(stockInfoCountInRow)) {
							//если заполнено св-во площадь одной плитки 
							if (!isNaN(propertyOnePieceSquere)) {
								stockInfoSquereInRow = Math.round(propertyOnePieceSquere * stockInfoCountInRow * 100) / 100;
								$(this).find(".stock-info-squere").html("~ " + stockInfoSquereInRow + " М²");
								$(this).find(".stock-info-squere").show();
							}
							//если нет то использовать парамаетры ширины и высоты
							else {
								if (!isNaN(propertyWidth) && !isNaN(propertyHeight)) {
									let calcOnePieceSquere = getOnePieceSquere(propertyWidth, propertyHeight);
									stockInfoSquereInRow = Math.round(calcOnePieceSquere * stockInfoCountInRow * 100) / 100;
									$(this).find(".stock-info-squere").html("~ " + stockInfoSquereInRow + " М²");
									$(this).find(".stock-info-squere").show();
								}
							}
						}
					});

					//заполнение площадей для отображения по складам в карточке товара.
					$(".store-row").each(function () {
						let stockInfoCountInRow = parseInt($(this).find(".store-quantity").html());
						let stockInfoSquereInRow;  //площадь доступной плитки в строке

						if (!isNaN(stockInfoCountInRow)) {
							//если заполнено св-во площадь одной плитки 
							if (!isNaN(propertyOnePieceSquere)) {
								stockInfoSquereInRow = Math.round(propertyOnePieceSquere * stockInfoCountInRow * 100) / 100;
								$(this).find(".store-squere").html("~ " + stockInfoSquereInRow + " М²");
								$(this).find(".store-squere").show();
							}
							//если нет то использовать парамаетры ширины и высоты
							else {
								if (!isNaN(propertyWidth) && !isNaN(propertyHeight)) {
									let calcOnePieceSquere = getOnePieceSquere(propertyWidth, propertyHeight);
									stockInfoSquereInRow = Math.round(calcOnePieceSquere * stockInfoCountInRow * 100) / 100;
									$(this).find(".store-squere").html("~ " + stockInfoSquereInRow + " М²");
									$(this).find(".store-squere").show();
								}
							}
						}
					})
				}
			})
		}
	})
})