$(function() {
    var $loginBox = $('#loginBox'),
        $regBox = $('#regBox'),
        $regTip = $('#regTip'),
        $loginAfter = $('#loginAfter');
    // 注册
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
                // window.location.reload();
                $regTip.html(res.message);
            }
        })
    })
    // 登录
    $loginBox.find('[name="button"]').on('click', function() {
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $loginBox.find('[name="username"]').val(),
                password: $loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success: function(res) {
                window.location.reload();
                // if (res.userInfo&&res.userInfo.username) {
                // 	$regTip.html(res.message + '，欢迎' + res.userInfo.username + '来啦！');
                // }else {
                // 	$regTip.html(res.message);
                // }
            }
        })
    })
    // 退出
    $loginAfter.find('[name="logout"]').on('click', function() {
        $.ajax({
            url: '/api/user/logout',
            dataType: 'json',
            success: function(res) {
                window.location.reload();
            }
        })
    })
})