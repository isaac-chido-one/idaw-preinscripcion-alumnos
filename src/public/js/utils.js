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
			$(this).siblings('.invalid-feedback').text(validations[fieldName][0]);

			if (firstInput == null) {
				notifyFailure(validations[fieldName][0]);
				firstInput = input;
				firstInput.trigger('focus');
			}
		} else {
			input.removeClass('is-invalid').addClass('is-valid');
			$(this).siblings('.invalid-feedback').text('');
		}
	});
}

function datatableTranslations() {
	return {
		oAria: {
			orderable: ": Click para ordenar de forma ascendende",
			orderableReverse: ": Click para ordenar de forma descendende",
			orderableRemove: ": Click para desordenar",
			paginate: {
				first: 'Primera',
				last: '&Uacute;ltima',
				next: 'Siguiente',
				previous: 'Anterior',
				number: ''
			}
		},
		oPaginate: {
			sFirst: '<i class="bi bi-chevron-double-left"></i>',
			sLast: '<i class="bi bi-chevron-double-right"></i>',
			sNext: '<i class="bi bi-chevron-right"></i>',
			sPrevious: '<i class="bi bi-chevron-left"></i>'
		},
		entries: {
			_: "registros",
			1: "registro"
		},
		sEmptyTable: "Sin informaci&oacute;n disponible",
		sInfo: "Mostrado del _START_ al _END_ de _TOTAL_ _ENTRIES-TOTAL_",
		sInfoEmpty: "Ning&uacute;n resultado",
		sInfoFiltered: "(filtrado de _MAX_ total _ENTRIES-MAX_)",
		sDecimal: ".",
		sThousands: ",",
		sLengthMenu: "_MENU_ _ENTRIES_ por p&aacute;gina",
		sLoadingRecords: "Cargando...",
		sProcessing: "Procesando...",
		sSearch: "Buscar:",
		sSearchPlaceholder: "Buscar por CURP o nombre",
		sZeroRecords: "Ning&uacute;n registro"
	};
}

function renderDate (data, type) {
	if (type === 'display') {
		return data.substring(0, 10);
	}

	return data;
}
