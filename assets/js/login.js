$(function () {
    //点击 注册 跳转
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击 注册 跳转
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    //校验表单
    form.verify({
        //自定义密码校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name = password]').val()
        }
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                //模拟手动点击 去登录
                $('#link_login').click()
            }
        })
    })
    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        //发送get请求比较用户名和密码是否正确
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token', res.token)
                //跳转到后台
                location.href = '/index.html'
            }
        })
    })
})