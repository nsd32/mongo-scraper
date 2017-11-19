$(document).ready(function() {

	$('#scrape-button').click(function() {
		console.log('hello')
		$.ajax({
			type: 'GET', 
			url: '/all'
		})
		.then(function() {
				// this is not reloading the page
				location.reload();	
		});
	});

	$('#save-button').click(function() {
		// get id so you can update obect to {saved: true} in db
		console.log($(this).attr('value'));
		// $.put('/saved')
	})

})