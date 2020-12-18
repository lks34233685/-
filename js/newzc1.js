// 给validate自定验证规则
// 自定义手机号验证规则
jQuery.validator.addMethod('testTel', function(value) {
    let reg = /^1[3,5,6,7,8,9]\d{9}$/;
    if (reg.test(value)) {
        return true
    } else {
        return false
    }
}, '验证失败的提示信息');
//自定义密码
jQuery.validator.addMethod('testPw', function(value) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
    if (reg.test(value)) {
        return true
    } else {
        return false
    }
}, '验证失败的提示信息');
//自定义图形验证码
//引入图形验证码
let verifyCode; //必须声明全局变量
$('#img-captcha').on('click', function() {
    $('#img-captcha').html('');
    //初始化验证码
    verifyCode = new GVerify({
        id: "img-captcha",
        type: "number",
        length: 4
    });
});
//图形验证码规则
jQuery.validator.addMethod('picYzm', function(value) {
    let res = verifyCode.validate($('#yzm').val());
    if (res) {
        return true
    } else {
        return false
    }
}, '× 请输入正确的验证码');
//勾选
jQuery.validator.addMethod('checked', function(checked) {

    if (checked) {
        return true
    } else {
        return false
    }
}, '× 请确定勾选');
//短信验证码规则
jQuery.validator.addMethod('dxYzm', function(value) {
    let res = verifyCode.validate($('#dxyzm').val());
    if (res) {
        return true
    } else {
        return false
    }
}, '× 请输入正确的验证码');
//验证代码
$("#newzc").validate({
    // 填写的 输入框验证的规则
    rules: {
        zcTel: {
            required: true,
            maxlength: 11,
            testTel: true
        },
        zcpassword: {
            required: true,
            maxlength: 20,
            testPw: true,
        },
        isyes: {
            required: true,
            //确认密码，是否跟上一个密码一样
            equalTo: "#zcPassword"
        },
        yzm: {
            required: true,
            picYzm: true,

        },
        dxyzm: {
            required: true,
        },
        check: {
            checked: true
        }
    },
    // 当不满足规则的是 编写的提示信息
    messages: {
        zcTel: {
            required: "× 帐号已注册",
            testTel: '× 手机号格式不正确',

        },
        zcpassword: {
            required: "× 密码需要包含字母与数字，至少8个字符",

        },
        isyes: {
            required: "× 两次输入的密码不一致，请检查",
        },
    },
    submitHandler: function() {
        // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
        // 一般用跟后端进行数据交互 
        // 发送ajax请求
        let a = this.successList[0].value;
        console.log(this);
        console.log(this.successList[0].value);
        $.post('../api/register.php', {
            //手机号
            username: $("#zcTel").value,
            //密码
            password: $("#zcpassword").value,
        }, function() {
            alert("注册成功");
            location.setItem("login", a);
            if (confirm("是否返回首页") == true) {
                location.href = "./index.html";
            }


        }, "json")

    },
})