$(document).ready(function() {

	$('#scrape-button').click(function() {
		$.ajax({
			url: '/all', 
			method: 'GET'
		})
		.then(function() {
				// this is not reloading the page
				console.log('hello')
				location.reload();	
		});
	});

	// $('#save-button').click(function() {
	// 	// get id so you can update obect to {saved: true} in db
	// 	console.log($(this));
	// 	// $.put('/saved')
	// })

	$(document).on('click', '#save-button', function() {
		var id = $(this).attr('value')
		$.ajax({
			url: '/saved',
			method: 'PUT',
			data: { id: id }
		});
	})

})