$(function() {
    //表单规则验证
    let form = layui.form;
    form.verify({
        nickname: function(val) {
            if (val.length > 6) {
                return '密码必须在0-6位之间！';
            }
        }
    });

    //数据渲染
    initUserInfo();
    let layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            data: {},
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                //成功，渲染
                //调用 `form.val()` 方法为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    };

    //重置功能
    $('#btnReset').click(function(e) {
        e.preventDefault();
        initUserInfo();
    });

    //提交功能
    $('.layui-form').click(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                //成功,重新渲染主页面
                window.parent.getUserInfo();
            }
        })
    })
})