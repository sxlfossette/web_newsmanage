$(function () {
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        console.log('ok');
        //询问框
        layer.confirm('确定退出登录?', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
           //清空本地存储的token
           localStorage.removeItem('token')
           //重新跳转到登录页面
           location.href='/login.html'
           //关闭confirm询问框
           layer.close(index);
        });
    })

})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //heards就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        //     // Authorization:' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiLms6Xlt7Tlt7QiLCJlbWFpbCI6Im5pYmFiYUBpdGNhc3QuY24iLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTU3ODAzNjY4MiwiZXhwIjoxNTc4MDcyNjgyfQ.Mwq7GqCxJPK-EA8LNrtMG04llKdZ33S9KBL3XeuBxuI'
        // },

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        //不论成功还是失败，最终都会调用complete函数
        // complete:function(res){
        // //    console.log('执行了complete回调');
        // //    console.log(res);
        // //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        // if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        //     //1.强制清空token
        //     localStorage.removeItem('token');
        //     //2.强制跳转到登录页面
        //     location.href='/login.html'
        // }
        // }
    })

}

//渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}