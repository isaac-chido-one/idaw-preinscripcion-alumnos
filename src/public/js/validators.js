
(() => {
	let $modal = null, table = null;

	function openModalVoucher (curp, validated) {
		if (validated) {
			$modal.find('.js-modal-validate').addClass('d-none');
		} else {
			$modal.find('.js-modal-validate').removeClass('d-none');
		}

		$modal.data('curp', curp);
		$modal.find('.modal-body img').attr('src', '/applicants/show/' + curp);
		$modal.show();
	}

	function validateVoucher () {
		const curp = $modal.data('curp');
		$.ajax({
			async: true,
			data: {curp},
			method: 'POST',
			success: function (response) {
				if (response.status == 'success') {
					$modal.hide();
					notifySuccess(response.message);
					table.ajax.reload();
				} else if (response.status == 'failure') {
					for (const property in response.data) {
						notifyFailure(response.data[property]);
					}
				} else {
					console.warn(response);
				}
			},
			url: '/applicants/update/' + curp
		});
	}

	function initializeValidators() {
		$modal = $('#modal-voucher');
		$modal.find('.js-modal-close').on('click', function () {
			$modal.hide();
		});

		$modal.find('.js-modal-validate').on('click', validateVoucher);

		const renderBtnVoucher = $('.js-template-btn-voucher').html();

		table = new DataTable('#table-validate', {
			ajax: {
				type: 'POST',
				url: '/applicants/index'
			},
			columns: [
				{ data: 'curp' },
				{ data: 'lastName' },
				{ data: 'secondLastName' },
				{ data: 'firstName' },
				{ data: 'dob', render: renderDate},
				{ data: 'gender' },
				{ data: 'state' },
				{ className: 'text-center', defaultContent: renderBtnVoucher}
			],
			createdRow: function (row, data) {
				const $btnVoucher = $(row).find('.js-voucher');

				if (data.validated) {
					$btnVoucher.attr('title', 'Ver comprobante');
					$btnVoucher.find('i').addClass('bi-box-arrow-up-right');
				} else {
					$btnVoucher.attr('title', 'Validar comprobante');
					$btnVoucher.find('i').addClass('bi-bell-fill');
				}

				$btnVoucher.on('click', function() {
					openModalVoucher(data.curp, data.validated);
				});
			},
			oLanguage: datatableTranslations()
		});
	}

	window.setTimeout(initializeValidators);

})();
