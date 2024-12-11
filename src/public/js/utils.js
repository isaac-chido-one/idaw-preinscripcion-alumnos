function notifyMessage(message, type, icon) {
	const panel = $('.js-notify');
	panel.find('.js-icon').removeClass('bi-check-circle-fill').removeClass('bi-exclamation-triangle-fill').addClass(icon);
	const template = panel.html();
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
