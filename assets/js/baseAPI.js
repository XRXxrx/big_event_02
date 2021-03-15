// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
//可以先把不变的提出来
let baseURL = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function(parms) {
    parms.url = baseURL + parms.url;
    // console.log(option.url);
    //如果路劲中有/my/，就手动添加令牌
    if (parms.url.indexOf('/my/') !== -1) {
        parms.headers = {
            //headers头的值中不存在null
            Authorization: localStorage.getItem('token') || ''
        };
    }

    //登录拦截
    parms.complete = function(res) {
        let obj = res.responseJSON;
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            //清空本地令牌
            localStorage.removeItem('token');
            //失败跳转
            location.href = '/login.html';
        }
    }
})