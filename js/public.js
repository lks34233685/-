let login1 = localStorage.getItem('login1');
console.log(login1);
if (login1) {
    $("#login>.icon-daohanglan-05").html(login1).css({
        color: "blue"
    });
};
// header
// nav隐藏菜单
$(".cake").on("mouseover", function() {
    $(".sec-nav").css({ "display": "block" })
    $(".sec-nav .cake").css({ "display": "block" });
    $(".sec-nav .freehand").css({ "display": "none" });
    $(".sec-nav .afternoontea").css({ "display": "none" });
});
$(".freehand").on("mouseover", function() {
    $(".sec-nav").css({ "display": "block" })
    $(".sec-nav .freehand").css({ "display": "block" });
    $(".sec-nav .afternoontea").css({ "display": "none" });
    $(".sec-nav .cake").css({ "display": "none" });
});
$(".afternoontea").on("mouseover", function() {
    $(".sec-nav").css({ "display": "block" })
    $(".sec-nav .afternoontea").css({ "display": "block" });
    $(".sec-nav .cake").css({ "display": "none" });
    $(".sec-nav .freehand").css({ "display": "none" });
});
$(".sec-nav").on("mouseout", function() {
    $(".sec-nav").css({ "display": "none" });
    $(".sec-nav .cake").css({ "display": "none" });
    $(".sec-nav .freehand").css({ "display": "none" });
    $(".sec-nav .afternoontea").css({ "display": "none" });
});
// 显示search框
$(".icon-ziyuan76").click(function() {
    $(".search-bar").toggle();
});
//绑定点击事件 获取搜索框内容 传给php，并跳转到列表页
$(".sousuo").click(function() {
    let e = window.event;
    e.preventDefault();

    console.log($('.search-input').val());
    if ($('.search-input').val() === "") {
        return;
    };
    $.ajax({
        url: '..//api/sousuo.php',
        method: 'get',
        data: {
            name: $('.search-input').val()
        },
        // 期望后端返回的数据类型，如果写的json，把json出来成 js数据在进行返回
        dataType: 'json',
        async: true,
        success: function(res) {
            let url = location.href
            console.log(res);
            if (url == "http://test.com/xfxb/html/list.html") {
                renderHtml(res)
            } else {
                location.href = "http://test.com/xfxb/html/list.html"
            }
            // renderHtml(res);
            // 函数中this默认指向ajax对象
            console.log(this);
        },
        error: function(err) {
            console.log(err);
        }
    })
});
//登陆注册
// $("#login").click(function() {
//     $(".user-offcanvas-wrap").css({
//         "display": "block"
//     });
//     $(".loginBox").css({ "display": "block" })

// });
// //X
// $(".btn-close-offcanvas").click(function() {
//     $(".user-offcanvas-wrap").css({
//         "display": "none"
//     });
//     $(".loginBox").css({ "display": "none" });
//     $(".phoneBox").css({ "display": "none" });
//     $(".zcBox").css({ "display": "none" });

// });
// $(".show").on("click", ".input-margin", function() {
//     console.log($(this).index());
//     $(this).find(".login-input-box").addClass('focus').siblings().removeClass('focus');
//     // $(this).children(".login-input-box").addClass('focus').siblings().removeClass('focus');
//     $(this).find(".login-input-box").find(".input-placeholder").addClass('shorter').siblings().removeClass('shorter');
//     // let index = $(this).index();
//     // $('li').eq(index).addClass('active').siblings().removeClass('active');
//     // // $("this").toggleClass('focus')
//     // $(this).
//     // $('.input-placeholder').addClass("shorter");
// });

// 

// footer
// 微信二维码
$(".wx").hover(function() {
    $(".qrcode-wrap").css({
        "display": "block",
        // "z - index": 1000
    })
}, function() {
    $(".qrcode-wrap").css({
        "display": "none",
    })
});

function renderHtml(data) {
    let str = '';

    data.forEach((item, index) => {
        str += ` <li class="item">
      <a href="./details.html?id=${item.goods_id}">
          <div class="product" data-track="商品列表-点击商品" data-opt-label="${item.goods_name}" data-opt-value="${item.goods_id}">
              <div class="img-wrapper">
                  <!-- 主商品 -->
                  <img class="main-pro" src="${item.goods_big_logo}" alt="">
                  <div class="product-desc">
                      <div class="in">
                          <p> ${item.goods_info}</p>
                      </div>
                  </div>
              </div>
              <div class="info">
                  <div class="pro-wrapper">
                      <div class="title">${item.goods_name}</div>
                      <div class="price">￥${item.goods_price1}</div>
                      <div class="shop-name"></div>
                  </div>

              </div>
          </div>
      </a>
  </li>`;
    });

    list.innerHTML = str;
}
// function oLogin() {
//     let str = `<div class="user-offcanvas-wrap show"><div class="btn-close-offcanvas"></div><div class="user-offcanvas"><div class="container login-container login">
//     <div class="form-title">帐号登录</div>
//     <div class="input-margin login-input">
//       <div class="login-input-box">
//         <div class="input-placeholder">手机号码</div>
//         <span class="feedback"></span>
//         <input class="user-tel" type="tel" maxlength="11">
//       </div>
//     </div>
//     <div class="input-tips not-allow-phone-number">请输入正确的手机号</div>
//     <div class="input-margin">
//       <div class="login-input-box">
//         <div class="input-placeholder">密码</div>
//         <span class="feedback"></span>
//         <input class="user-password" type="password" maxlength="20">
//       </div>
//     </div>
//     <div class="input-margin input-captcha-wrap" style="display:none">
//       <div class="img-captcha-box">
//         <input type="text" class="input-captcha" maxlength="6">
//         <!-- <img id="img-captcha" src="hahaha" alt="" class="img-captcha" /> -->
//       </div>
//     </div>
//     <div class="input-margin login-setting">
//       <label class="checkbox-wrap" for="remember-me">
//         <input id="remember-me" name="remember-me" type="checkbox">&nbsp;记住我
//       </label>
//       <a class="offcanvas-anchor anchor" data-target="forgot-password" href="javascript:;" data-track="登录页-忘记密码">忘记密码</a>
//     </div>
//     <div class="input-margin">
//       <div>
//         <button class="btn btn-login" disabled="disabled" data-track="登录页-登录">登录</button>
//       </div>
//     </div>
//     <div class="other-info">
//       <a class="offcanvas-anchor anchor" data-target="login-with-phone" href="javascript:;" data-track="登录页-手机号快速登录切换">手机号快速登录</a>
//       <p class="br-p"></p>
//       <a class="offcanvas-anchor anchor" data-target="register" href="javascript:;" data-track="登录页-注册新账号">注册新账号</a>
//     </div>
//   </div></div></div>`
//     $("#box").html(str)
// }