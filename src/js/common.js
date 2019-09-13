//Событие для гамбургера
$('.menu__btn').on('click', function() {
    $(this).toggleClass('menu__btn_active');
});
//Уменьшение хедера
$(window).on("scroll touchmove", function () {
    $('.header').toggleClass('header_tiny', $(document).scrollTop() > 120);
});
