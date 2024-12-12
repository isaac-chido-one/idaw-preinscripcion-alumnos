(() => {
	'use strict'

	function responseApplicantCreate(responseText, statusText, xhr) {
		if (xhr.responseJSON.status == 'success') {
			notifySuccess(xhr.responseJSON.message);
		} else if (xhr.responseJSON.status == 'failure') {
			const $form = $('form.needs-validation');
			showBackValidations($form, xhr.responseJSON.data);
		} else {
			console.warn(xhr.responseJSON);
		}
	}

	function requestApplicantCreate($form) {
		$form.ajaxSubmit({
			dataType: 'json',
			method: 'POST',
			resetForm: false,
			success: responseApplicantCreate,
			type: 'POST'
		});
	}

	function initializeApplicants() {
		const $form = $('form.needs-validation');

		$form.on('submit', function(e) {
			e.preventDefault(); // prevent native submit

			if ($form.get(0).checkValidity()) {
				requestApplicantCreate($form);
			} else {
				showFrontValidations($form);
			}
		});
	}

	window.setTimeout(initializeApplicants);

})();
