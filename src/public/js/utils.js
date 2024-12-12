function notifyMessage(message, type, icon) {
	const $panel = $('.js-notify');
	$panel.find('.js-icon').attr('class', 'js-icon bi ' + icon);
	const template = $panel.html();
	$.notify(message, {
		delay: 2500,
		template: template,
		type: type
	});
}

function notifySuccess(message) {
	notifyMessage(message, 'success', 'bi-check-circle-fill');
}

function notifyFailure(message) {
	notifyMessage(message, 'danger', 'bi-exclamation-triangle-fill');
}

function showFrontValidations($form) {
	const $inputs = $form.find('.form-control[name]');
	let firstInput = null;

	$inputs.each(function(index) {
		let text = '';

		if (!this.validity.valid) {
			text = this.dataset.validationMessage != undefined ? this.dataset.validationMessage : this.validationMessage;

			if (firstInput == null) {
				notifyFailure(text);
				firstInput = $(this);
				firstInput.trigger('focus');
			}
		}

		$(this).siblings('.invalid-feedback').text(text);
	});

	$form.addClass('was-validated');
}

function showBackValidations($form, validations) {
	const $inputs = $form.find('.form-control[name]');
	let firstInput = null;
	$form.removeClass('was-validated');

	$inputs.each(function(index) {
		const input = $(this);
		const fieldName = input.attr('name');

		if (fieldName in validations) {
			input.removeClass('is-valid').addClass('is-invalid');
			$(this).siblings('.invalid-feedback').text(validations[fieldName]);

			if (firstInput == null) {
				notifyFailure(validations[fieldName]);
				firstInput = input;
				firstInput.trigger('focus');
			}
		} else {
			input.removeClass('is-invalid').addClass('is-valid');
			$(this).siblings('.invalid-feedback').text('');
		}
	});
}
