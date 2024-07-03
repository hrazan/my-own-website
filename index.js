function activateMenu ( menuId ) {
  if (!$("."+menuId+"-menu").hasClass( "active" )) {
    $( ".main-menu" ).removeClass( "active" );
    $( ".main-page" ).hide();
    $("#"+menuId).addClass( "active" );
    $("#"+menuId+"-page").show();
  }
}

$( ".main-menu" ).on( "click", function() {
  console.log($(this)[0].id);
  activateMenu($(this)[0].id);
});
