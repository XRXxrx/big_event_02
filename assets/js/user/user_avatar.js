$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    //选择文件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    //修改裁剪图片
    $('#file').on('change', function(e) {
        //获取用户选择的文件
        let file = e.target.files[0];
        // console.log(file);
        //非空判断
        if (file === undefined) {
            return '请选择文件！'
        };
        //为获取到的文件创建一个路径
        let imgURL = URL.createObjectURL(file);
        // 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    //将裁剪后的头像上传到服务器
    let layer = layui.layer;
    $('#btndan').on('click', function() {
        let dataURL = $image.cropper('getCroppedCanvas', {
                //创建一个canvans画布
                with: 100,
                height: 100
            }).toDataURL('image/jpg') //将图片转化为base64格式（字符串）
            // console.log(dataURL);
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                //成功，重新加载页面
                layer.msg('上传成功', {
                    icon: 6
                })
                window.parent.getUserInfo();
            }
        })
    })
})