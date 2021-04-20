jQuery(document).ready(function($) {
    var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
	  toggler[i].addEventListener("click", function() {
	    this.parentElement.querySelector(".nested").classList.toggle("active");
	    this.classList.toggle("caret-down");
	  });
	} 


	//logout drpdown

$('.uname li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
});
	//logout drpdown

var content_data_tble = $('#content_data_tble').DataTable({
        //ajax:"estimate/get_all_estimate_data",
            paging:    false,
            deferRender:    true,
            scrollY:        200,
            scrollCollapse: true,
            scroller:       true,
            select:true ,
            "language": {

                    "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Japanese.json"

                }
    });
});//end