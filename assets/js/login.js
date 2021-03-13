$(function() {
    // 点击注册，登录页面隐藏，注侧页面显示
    $('#link-reg').click(function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击登录，注册页面隐藏，登录页面显示
    $('#link-login').click(function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // console.log(layui.form);

    //从 layui 中获取 form 对象
    let form = layui.form;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        //“[ ]”是范围描述符,\s是指空白，包括空格、换行、tab缩进等所有的空白,而\S刚好相反
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'], // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // console.log(value);
            let pwd = $('.reg-box input[name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });

    //注册功能
    $('#form_reg').on('submit', function(e) {
        //阻止默认的提交行为
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                // console.log(res);
                //返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                //提交成功后的处理
                layer.msg('注册成功，请登录！', {
                    icon: 6
                });
                // 成功跳转
                $('#link-login').click();
                // 重置表单
                $('#form_reg')[0].reset();
            }
        })
    });

    //登录功能
    $('#form_login').on('submit', function(e) {
        //阻止默认的提交行为
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                //返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                //提交成功后的处理
                layer.msg('登录成功！', {
                    icon: 6
                });
                // 保存令牌token
                localStorage.setItem('token', res.token);
                // 成功跳转
                location.href = '/index.html';
            }
        })
    })
});