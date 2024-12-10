
function notifySuccess(message) {
	const template = $('.js-notify').html();
	$.notify(message, {delay: 2000, template: template});
}
