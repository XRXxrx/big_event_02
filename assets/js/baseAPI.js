// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
//可以先把不变的提出来
let baseURL = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function(parms) {
    parms.url = baseURL + parms.url;
})