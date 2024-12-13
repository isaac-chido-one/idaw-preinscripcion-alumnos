(($) => {
	'use strict'

	function responsePreinscription(responseText, statusText, xhr) {
		const $form = $('form.needs-validation');

		if (xhr.responseJSON.status == 'success') {
			$form.find('button[type=reset]').trigger('click');
			notifySuccess(xhr.responseJSON.message);
		} else if (xhr.responseJSON.status == 'failure') {
			showBackValidations($form, xhr.responseJSON.data);
		} else {
			console.warn(xhr.responseJSON);
		}
	}

	function requestPreinscription($form) {
		$form.ajaxSubmit({
			dataType: 'json',
			method: 'POST',
			resetForm: false,
			success: responsePreinscription,
			type: 'POST'
		});
	}

	function responseGenerate (response) {
		if (response.status == 'success') {
			const $form = $('form.needs-validation');
			$form.find('input[name=curp]').val(response.message);
		} else if (response.status == 'failure') {
			const $form = $('form.needs-validation');
			showBackValidations($form, response.data);
		} else {
			console.warn(response);
		}
	}

	function generateCurp($form) {
		const dob = $form.find('input[name=dob]').val();
		const firstName = $form.find('input[name=firstName]').val();
		const gender = $form.find('select[name=gender]').val();
		const lastName = $form.find('input[name=lastName]').val();
		const secondLastName = $form.find('input[name=secondLastName]').val();
		const state = $form.find('select[name=state]').val();
		$.ajax({
			async: true,
			data: {
				dob,
				firstName,
				gender,
				lastName,
				secondLastName,
				state,
			},
			method: 'POST',
			success: responseGenerate,
			url: '/applicants/generate'
		});

	}

	function initializeApplicants() {
		const $form = $('form.needs-validation');

		$form.on('submit', function(e) {
			e.preventDefault(); // prevent native submit
			$form.find('input[name=curp]').prop('required', true);
			$form.find('input[name=voucher]').prop('required', true);

			if ($form.get(0).checkValidity()) {
				requestPreinscription($form);
			} else {
				showFrontValidations($form);
			}
		});

		$('.js-generate').on('click', function(e) {
			e.preventDefault(); // prevent native submit
			$form.find('input[name=curp]').prop('required', false);
			$form.find('input[name=voucher]').prop('required', false);

			if ($form.get(0).checkValidity()) {
				generateCurp($form);
			} else {
				showFrontValidations($form);
			}
		});
	}

	$(function() {
		window.setTimeout(initializeApplicants);
	});

})(jQuery);
