let username = document.querySelector('#username');
let password = document.querySelector('#password');
let form = document.querySelector('.useLoginbox');
let formPhone = document.querySelector(".usePhonebox")
let login = localStorage.getItem('login1');
if (login) {
    $("#login").html(login).css({ color: "blue" });
}
//账号登录
form.onsubmit = function() {
    console.log(1);
    let e = window.event;
    e.preventDefault();
    pAjax({
        type: 'post',
        url: '../api/login.php',
        data: {
            username: username.value,
            password: password.value
        }
    }).then(res => {
        console.log(1);
        let res1 = JSON.parse(res);
        console.log(res1);
        if (res1.code == 1) {
            console.log(1);
            setCookie('login', username.value);
            localStorage.setItem('login1', username.value);
            let url = localStorage.getItem('url');
            if (url) {
                location.href = url;
                localStorage.removeItem('url');
            } else {
                location.href = 'http://test.com/xfxb/'
            }
        } else if (res1.code == 0) {
            alert("登录失败")
        }
    })
};

//手机快捷登录
// formPhone.onsubmit = function() {
//     console.log(1);
//     let e = window.event;
//     e.preventDefault();
//     pAjax({
//         type: 'post',
//         url: '../api/login.php',
//         data: {
//             username: username.value,
//             password: password.value
//         }
//     }).then(res => {
//         console.log(1);
//         let res1 = JSON.parse(res);
//         console.log(res1);
//         if (res1.code == 1) {
//             console.log(1);
//             setCookie('login', username.value);
//             localStorage.setItem('login1', username.value);
//             let url = localStorage.getItem('url');
//             if (url) {
//                 location.href = url;
//                 localStorage.removeItem('url');
//             } else {
//                 location.href = 'http://test.com/xfxb/'
//             }
//         } else if (res1.code == 0) {
//             alert("登录失败")
//         }
//     })
// };
//登录页
// //手机快捷登录
$(".phone").click(function() {
    $(".useLogin").css({ "display": "none" });
    $(".useZC").css({ "display": "none" });
    $(".usePhone").css({ "display": "block" });
});

// //注册按钮
$(".zc").click(function() {
    $(".useLogin").css({ "display": "none" });
    $(".useZC").css({ "display": "block" });
    $(".usePhone").css({ "display": "none" });
});

// //账号登录按钮
$(".login").click(function() {
    $(".useLogin").css({ "display": "block" });
    $(".useZC").css({ "display": "none" });
    $(".usePhone").css({ "display": "none" });
});