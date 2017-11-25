$(document).ready(function() {

	$('#scrape-button').click(function() {
		$.ajax({
			url: '/all', 
			method: 'GET'
		})
		.then(function() {
			location.reload();	
		});
	});

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
			
			console.log('hello')
			location.reload();	

		});
	});

	$(document).on('click', '#note-button', function() {
		$('#note-modal').attr('value', $(this).attr('value'));
		var id = $('#note-modal').attr('value')
		console.log('this is id ' + id);
		$.ajax({
			url: '/getnotes/' + id,
			method: 'GET'
		})
		.then(function(data) {
			console.log(data[0])
			for (var i = 0; i < data[0].notes.length; i++) {
				$('#note-body').append('<li>' + data[0].notes[i] + '</li>');
			}
			$('#note-modal').show();
		})

			
	});

	$(document).on('click', '#close', function() {
		$('#note-modal').hide();
		location.reload();
	});

	$(document).on('click', '#save-note', function() {
		console.log($('#note').val().trim());
		console.log($('#note-modal').attr('value'));
		var id = $('#note-modal').attr('value');
		var note = $('#note').val().trim();
		if (note.length > 1) {
			$.ajax({
				url: '/notes',
				method: 'POST',
				data: { 
					id: id,
					note: note 
				}
			})
			.then(function() {

				location.reload();

			});
		} else {

			alert('Please enter a note!');

		}
	});

});