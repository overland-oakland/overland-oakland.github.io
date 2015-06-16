$(document).ready(function (){
  // smooth scrolling
  $(".smoothie").on('click', function(event) {
    var target = $(this.hash)
      , navOffset = $('#navbar').height()
	;

	event.preventDefault();

    return $('html, body')
		.animate(
			{ scrollTop: target.offset().top - navOffset },
			600,
			function() {
				return window.history.pushState(null, null, target.selector);
			}
		);
  });
});

