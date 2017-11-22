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
	});

	$(document).on('click', '#delete-button', function() {
		$.ajax({
			url: '/deleteAll',
			method: 'DELETE'
		})
		.then(function() {
			location.reload();
		});
	});

	$(document).on('click', '#unsave-button', function() {
		var id = $(this).attr('value')
		console.log(id);
		$.ajax({
			url: '/unsave',
			method: 'PUT',
			data: { id: id }
		})
		.then(function() {
				// this is not reloading the page
				console.log('hello')
				location.reload();	
		});
	});

	$(document).on('click', '#note-button', function() {
		$('#note-modal').attr('value', $(this).attr('value'));
		$('#note-modal').show();
	});

	$(document).on('click', '#close', function() {
		$('#note-modal').hide();
	});

	$(document).on('click', '#save-note', function() {
		console.log($('#note').val().trim());
		console.log($('#note-modal').attr('value'));
		var id = $('#note-modal').attr('value');
		var note = $('#note').val().trim();
		$.ajax({
			url: '/note',
			method: 'PUT',
			data: { 
				id: id,
				note: note 
			}
		})
		.then(function() {
				// this is not reloading the page
				console.log('hello')
				location.reload();	
		});
	});

});