$(function () {
	const socket = new WebSocket("ws://192.168.88.2:8999/broadcast");

	socket.onopen = function(e) {
		console.log("[open] Connection established");
		console.log("Sending to server");
		// socket.send("My name is Aurick");
	};

	socket.onmessage = function(event) {
		console.log(`[message] Data received from server: `, event.data);
		$('#test').html(event.data);
	};

	socket.onclose = function(event) {
		if (event.wasClean) {
			console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
		} else {
			// e.g. server process killed or network down
			// event.code is usually 1006 in this case
			console.log('[close] Connection died');
		}
	};

	socket.onerror = function(error) {
		console.log(`[error] ${error.message}`);
	};

	$('.sendWS').click(function (e) {
		socket.send($('#input-box').val());
	});

	$('.send').click(function (e) {
		const message = $('#input-box').val();
		$.ajax({
			type: 'POST',
			url: `/broadcast?message=${message}`,
			data: JSON.stringify({message: message}),
			cache: false,
			contentType: 'application/json',
			processData: false,
			timeout: 10000,
			success: function (response, status, xhr) {
				console.log("@response", response);
				console.log("@status", status);
				console.log("@xhr", xhr);
			},
			error: function () {
				console.log("failed");
				$.notify("Failed to save", "error");
			}
		});
	});
});