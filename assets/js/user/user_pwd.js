$(function() {
    //表单校验
    let form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(val1) {
            if (val1 === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！';
            }
        },
        rePwd: function(val2) {
            if (val2 !== $('[name=newPwd]').val()) {
                return '两次密码不一致！';
            }
        }
    });

    //密码修改
    let layer = layui.layer;
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                //成功
                layer.msg('更新成功', {
                    icon: 6
                });
                $('.layui-form')[0].reset();
            }
        })
    });

    //重置按钮
    $('#rebt').click(function(e) {
        e.preventDefault();
        $('.layui-form')[0].reset();
    })
})