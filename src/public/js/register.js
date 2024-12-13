(($) => {

	function responseRegister(response) {
		if (response.status == 'success') {
			const $form = $('form.needs-validation');
			$form.find('input[name=name]').val('');
			$form.find('input[name=username]').val('');
			$form.find('input[name=password]').val('');
			notifySuccess(response.message);
			window.setTimeout(function() {
				window.location.href = response.url;
			}, 500);
		} else if (response.status == 'failure') {
			const $form = $('form.needs-validation');
			showBackValidations($form, response.data);
		} else {
			console.warn(response);
		}
	}

	function requestRegister($form) {
		const name = $form.find('input[name=name]').val().trim();
		const username = $form.find('input[name=username]').val();
		const password = $form.find('input[name=password]').val();
		const role = $form.find('input[name=role]:checked').val();
		$.ajax({
			async: true,
			data: {
				name,
				username,
				password,
				role
			},
			method: 'POST',
			success: responseRegister,
			url: '/users/create'
		});
	}

	function initializeRegister() {
		const $form = $('form.needs-validation');

		$form.on('submit', function(e) {
			e.preventDefault(); // prevent native submit

			if ($form.get(0).checkValidity()) {
				requestRegister($form);
			} else {
				showFrontValidations($form);
			}
		});
	}

	$(function() {
		window.setTimeout(initializeRegister);
	});

})(jQuery);
