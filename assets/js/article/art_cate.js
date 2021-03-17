$(function() {
    //渲染数据
    let layer = layui.layer;
    initUserArtCase();

    function initUserArtCase() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            data: {},
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                //   成功，渲染
                let htmlStr = template('tpl-cate', { data: res.data });
                $('tbody').html(htmlStr);
            }
        })
    };

    //添加文章分类功能
    $('#addBtn').on('click', function() {
        indexAdd = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
    });

    // 利用事件委托给表单动态绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                //   成功，重新渲染数据
                initUserArtCase();
                //成功提示
                layer.msg('添加成功！', {
                    icon: 6
                });
                layer.close(indexAdd);
            }
        })
    });

    //编辑功能（利用事件委托完成）
    $('tbody').on('click', '#btn-edit', function() {
        indexEdit = layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });
        //获取对应的自定义属性
        let Id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,
            data: {},
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                //   成功，渲染数据
                // form.val('form-edit', res.data);
                layui.form.val('form-edit', res.data);
            }
        })
    });

    //更新文章（利用事件委托完成）
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                //   成功，重新渲染数据
                initUserArtCase();
                //成功提示
                layer.msg('更新数据成功！', {
                    icon: 6
                });
                layer.close(indexEdit);
            }
        })
    });

    //删除功能（利用事件委托完成）
    $('tbody').on('click', '#btn-delete', function() {
        //获取对应的自定义属性
        let Id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + Id,
                data: {},
                success: (res) => {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message, {
                            icon: 5
                        })
                    };
                    //   成功
                    //重新加载页面
                    initUserArtCase();
                    // 提示
                    layer.msg('删除分类成功！', {
                        icon: 6
                    });
                    layer.close(index);
                }
            })
        });
    });
})