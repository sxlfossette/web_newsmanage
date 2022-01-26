$(function(){
  //点击去注册账号的链接
  $('#link_reg').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
  })
  //点击去登录的链接
  $('#link_login').on('click',function(){
    $('.reg-box').hide();
    $('.login-box').show();
  })

  //从layui中获取from对象
  var form=layui.form;
  var layer=layui.layer;
  //通过form.verify函数自定义校验规则
  form.verify({
    //自定义一个叫pwd的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必需6到12位,不能出现空格'],
    repwd:function(value){
        //通过形参拿到的是确认密码框的内容

        var pwd=$('.reg-box [name=password]').val();
        if(pwd!==value){
          return '密码不一致'
        }
    }
  })
  
  //监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
    //阻止默认提交行为
    e.preventDefault();
    
    //发起AJAX请求
    var data={
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val() 
    }
    
    $.post('/api/reguser',data,function(res){
        if(res.status!==0){
          layer.msg(res.message);
            return false
        }
        layer.msg('注册成功,请登录!');
        $('#link_login').click()
      })
  })

  //监听登录表单事件
  $('#form_login').submit(function(e){
    //阻止默认提交行为
    e.preventDefault();
    $.ajax({
      url:'/api/login',
      method:'POST',
      //快速获取表单的数据
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败')
        }
        layer.msg('登录成功!')
        // 将登录成功得到的token字符串，保存到localStorage中
        localStorage.setItem('token',res.token);
        //跳转到后台主页
        location.href='/index.html'
      }
    })
  })
})