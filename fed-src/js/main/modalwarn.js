$('#userDeletionWarningModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget);
	var targetId = button.data('targetid');
	var targetEmail = button.data('targetemail');
	var modal = $(this);
	modal.find('.modal-body').text('Really delete User ' + targetEmail + '?');
	modal.find('.modal-footer a').attr('href', '/api/remove/' + targetId);
});