(() => {
	'use strict'

	function responseApplicantStore(responseText, statusText, xhr, $form) {
		console.log(xhr.responseJSON);
		console.log(xhr.responseText);
	};

	function requestApplicantStore() {
		const form = $('form.needs-validation');
		form.ajaxSubmit({
			dataType: 'json',
			method: 'POST',
			resetForm: false,
			//target: '#myResultsDiv'
			success: responseApplicantStore,
			type: 'POST'
		});
	};


	function initializeApplicants() {
		const form = $('form.needs-validation');

		form.on('submit', function(e) {
			e.preventDefault(); // prevent native submit

			if (form.get(0).checkValidity()) {
				requestApplicantStore();
			} else {
				form.addClass('was-validated');
			}
		});
	};

	window.setTimeout(initializeApplicants);

})();
