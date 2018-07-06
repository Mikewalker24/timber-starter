$(document).ready( function() {

	const square = x => x * x;

	
	let fuck = 'what-the-fuck?';

	console.log(square(5));
	
	// Put some nice JavaScript in here.
	var $nav_main = $('.nav-main'),
		$nav_trigger = $('.nav-trigger');

	$nav_trigger.click( function() {
		console.log('clicked!');
		$nav_main.toggleClass('active');
		$nav_trigger.toggleClass('active');
		return false;
	});

});
