$(function() {
	var $loginBox = $('#loginBox'),
		$regBox = $('#regBox');

	$regBox.find('[name="button"]').on('click', function() {
		$.ajax({
			type: 'post',
			url: '/api/user/register',
			data: {
				username: $regBox.find('[name="username"]').val(),
				password: $regBox.find('[name="password"]').val(),
				repassword: $regBox.find('[name="repassword"]').val()
			},
			dataType: 'json',
			success: function(res) {

			}
		})
	})
})