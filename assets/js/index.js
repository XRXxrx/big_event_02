$(function() {
    //获取用户信息
    getUserInfo();
    //退出功能
    let layer = layui.layer;
    $('#btnOut').click(function() {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清楚本地令牌
            localStorage.removeItem('token');
            //确认跳转
            location.href = '/login.html';
            //关闭弹窗
            layer.close(index);
        });
    })
})

// 将其函数写到全局方便后面调用
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     //headers头的值中不存在null
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            //请求失败
            if (res.status !== 0) {
                return layui.layer.msg(res.message, {
                    icon: 5
                })
            }
            //请求成功,渲染头像和名字
            renderAvatar(res.data);
        }
    });

    function renderAvatar(user) {
        // 进行名字判断并渲染
        let name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp&nbsp' + name);
        //进行头像图片判断并渲染
        if (user.user_pic !== null) {
            $('.layui-nav-img').show().attr('src', user.user_pic);
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            $('.text-avatar').show().html(name[0].toUpperCase());
        }
    };
}