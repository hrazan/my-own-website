/*
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
//*/
if ($( "body" )[0].id === "home-body") {
}
else if ($( "body" )[0].id === "aboutme-body") {
}
else if ($( "body" )[0].id === "history-body") {
}