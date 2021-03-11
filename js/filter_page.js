$("#features").on("click", ".property-toggle", ()=> {   // фильтр товаров
    if( $(this).hasClass("fa-plus-square-o") ){
        $(this).removeClass("fa-plus-square-o");
        $(this).addClass("fa-minus-square-o");
        $(this).parent(".property-hidden-values").css("height","inherit");
    }
    else{
        $(this).removeClass("fa-minus-square-o");
        $(this).addClass("fa-plus-square-o");
        $(this).parent(".property-hidden-values").css("height","28px");
    }
});