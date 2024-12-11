
(() => {
	let modal = null, table = null;

	function openModalVoucher (curp, validated) {
		if (validated) {
			modal.find('.js-modal-validate').addClass('d-none');
		} else {
			modal.find('.js-modal-validate').removeClass('d-none');
		}

		modal.data('curp', curp);
		modal.find('.modal-body img').attr('src', '/applicants/show/' + curp);
		modal.show();
	}

	function validateVoucher () {
		const curp = modal.data('curp');
		$.ajax({
			async: true,
			data: {curp},
			method: 'POST',
			success: function (response) {
				if (response.status == 'success') {
					modal.hide();
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
			url: '/applicants/update/' + curp,
		});
	}

	function initializeValidators() {
		modal = $('#modal-voucher');
		modal.find('.js-modal-close').on('click', function () {
			modal.hide();
		});

		modal.find('.js-modal-validate').on('click', validateVoucher);

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
				{ data: 'dob', render: function (data, type) {
					if (type === 'display') {
						return data.substring(0, 10);
					}

					return data;
				}},
				{ data: 'state' },
				{ className: 'text-center', defaultContent: renderBtnVoucher}
			],
			createdRow: function (row, data, dataIndex) {
				const btnVoucher = $(row).find('.js-voucher');

				if (data.validated) {
					btnVoucher.attr('title', 'Ver comprobante');
					btnVoucher.find('i').addClass('bi-box-arrow-up-right');
				} else {
					btnVoucher.attr('title', 'Validar comprobante');
					btnVoucher.find('i').addClass('bi-bell-fill');
				}

				btnVoucher.on('click', function() {
					openModalVoucher(data.curp, data.validated);
				});
			},
			oLanguage: {
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
			}
		});
	}

	window.setTimeout(initializeValidators);

})();
