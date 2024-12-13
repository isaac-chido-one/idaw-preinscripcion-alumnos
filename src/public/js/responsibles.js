
(($) => {
	let $modal = null, table = null;

	function openModalVoucher (curp) {
		$modal.find('.modal-body img').attr('src', '/applicants/show/' + curp);
		$modal.show();
	}

	function initializeValidators() {
		$modal = $('#modal-voucher');
		$modal.find('.js-modal-close').on('click', function () {
			$modal.hide();
		});

		const renderBtnVoucher = $('.js-template-btn-voucher').html();

		table = new DataTable('#table-applicants', {
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
				{ data: 'state' },
				{ data: 'gender' },
				{ data: 'validated', className: 'text-center', render: function (data, type) {
					if (type === 'display') {
						return data ? 'Si' : 'No';
					}

					return data;
				}},
				{ className: 'text-center', defaultContent: renderBtnVoucher}
			],
			createdRow: function (row, data) {
				$(row).find('.js-voucher').on('click', function() {
					openModalVoucher(data.curp);
				});
			},
			oLanguage: datatableTranslations()
		});
	}

	$(function() {
		window.setTimeout(initializeValidators);
	});

})(jQuery);
