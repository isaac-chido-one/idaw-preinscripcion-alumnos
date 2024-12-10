(() => {
	'use strict'

	function showFrontValidations() {
		const form = $('form.needs-validation');
		const inputs = form.find('.form-control[name]');

		inputs.each(function(index) {
			let text = '';

			if (!this.validity.valid) {
				text = this.dataset.validationMessage != undefined ? this.dataset.validationMessage : this.validationMessage;
			}

			$(this).siblings('.invalid-feedback').text(text);
		});

		form.addClass('was-validated');
	}

	function showBackValidations(validations) {
		const form = $('form.needs-validation');
		const inputs = form.find('.form-control[name]');
		form.removeClass('was-validated');

		inputs.each(function(index) {
			const input = $(this);
			const fieldName = input.attr('name');

			if (fieldName in validations) {
				input.removeClass('is-valid').addClass('is-invalid');
				$(this).siblings('.invalid-feedback').text(validations[fieldName]);
			} else {
				input.removeClass('is-invalid').addClass('is-valid');
				$(this).siblings('.invalid-feedback').text('');
			}
		});
	}

	function responseApplicantStore(responseText, statusText, xhr, $form) {
		if (xhr.responseJSON.status == 'success') {
			notifySuccess(xhr.responseJSON.message);
		} else if (xhr.responseJSON.status == 'failure') {
			showBackValidations(xhr.responseJSON.data);
		} else {
			console.warn(xhr.responseJSON);
		}
	}

	function requestApplicantStore() {
		const form = $('form.needs-validation');
		form.ajaxSubmit({
			dataType: 'json',
			method: 'POST',
			resetForm: false,
			success: responseApplicantStore,
			type: 'POST'
		});
	}

	function initializeApplicants() {
		const form = $('form.needs-validation');

		form.on('submit', function(e) {
			e.preventDefault(); // prevent native submit

			if (form.get(0).checkValidity()) {
				requestApplicantStore();
			} else {
				showFrontValidations();
			}
		});
	}

	window.setTimeout(initializeApplicants);

})();
