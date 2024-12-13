(($) => {

	function responseLogin(response) {
		if (response.status == 'success') {
			const $form = $('form.needs-validation');
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

	function requestLogin($form) {
		const username = $form.find('input[name=username]').val();
		const password = $form.find('input[name=password]').val();
		$.ajax({
			async: true,
			data: {
				username,
				password
			},
			method: 'POST',
			success: responseLogin,
			url: '/users/login'
		});
	}

	function initializeLogin() {
		const $form = $('form.needs-validation');

		$form.on('submit', function(e) {
			e.preventDefault(); // prevent native submit

			if ($form.get(0).checkValidity()) {
				requestLogin($form);
			} else {
				showFrontValidations($form);
			}
		});
	}

	$(function() {
		window.setTimeout(initializeLogin);
	});

})(jQuery);
