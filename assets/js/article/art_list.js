$(function() {
    let layer = layui.layer;
    let form = layui.form;
    //定义美化时间格式的过滤器
    template.defaults.imports.dft = function(itm) {
            const dt = new Date(itm);
            let y = dt.getFullYear();
            let m = zero(dt.getMonth() + 1);
            let d = zero(dt.getDate());
            let h = zero(dt.getHours());
            let mm = zero(dt.getMinutes());
            let s = zero(dt.getSeconds());
            return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
        }
        //定义补零函数
    function zero(i) {
        return i > 9 ? i : '0' + i;
    }
    // 定义查询参数对象q
    let q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    };

    //渲染数据
    initTable();

    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                // 成功，渲染
                layer.msg('获取成功！', {
                    icon: 6
                });
                let htmlStr = template('tpl-list', { detail: res.data });
                $('tbody').html(htmlStr);
                //渲染分页
                renderPage(res.total);
            }
        })
    };

    //渲染分类
    initCate();

    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            data: {},
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                // 成功，渲染
                layer.msg('获取成功！', {
                    icon: 6
                });
                let htmlStr = template('tpl-list-d', { dat: res.data });
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr);
                //如果有select标签，要通过 layui 重新渲染表单区域的UI结构
                form.render();
            }
        })
    };

    //筛选功能
    $('.layui-form').on('submit', function() {
        //获取选中状态的值
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        //重新赋值
        q.cate_id = cate_id;
        q.state = state;
        //重新加载页面
        initTable();
    });

    //分页功能
    let laypage = layui.laypage;

    //执行一个laypage实例
    function renderPage(totle) {
        laypage.render({
            elem: 'pageBox', //对应UI结构的接口,注意，这里的 test1 是 ID，不用加 # 号
            count: totle, //数据总数，从服务端得到
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            //当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
            //传递一个数组,自定义分页的功能项
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            // 快捷选项每页显示几条数据
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                // console.log(first);

                //首次不执行,防止死循环
                // 触发 jump 回调的方式有两种：
                // 1. 点击页码的时候，会触发 jump 回调
                // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的


                if (!first) {
                    //do something
                    // 否则就是方式1触发的 // 把最新的页码值，赋值到 q 这个查询参数对象中
                    q.pagenum = obj.curr;
                    // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                    q.pagesize = obj.limit;
                    initTable();
                }
            }
        });

    };

    //删除功能
    $('tbody').on('click', '.btn-delete', function() {
        let Id = $(this).attr('data-id');
        // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + Id,
                data: {},
                success: (res) => {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message, {
                            icon: 5
                        })
                    };
                    // 成功，删除提示
                    layer.msg('删除成功', {
                        icon: 6
                    });
                    //解决删除后，页码值虽然正常，但是当前页码的数据没有渲染出来
                    // if ($('#btn-delete').length === 1) {
                    //     q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    // }
                    // console.log($(".btn-delete").length);
                    if ($(".btn-delete").length === 1 && q.pagenum > 1) {
                        q.pagenum--;
                    }
                    //重新渲染页面
                    initTable();
                }
            })
            layer.close(index);
        });

    });


})