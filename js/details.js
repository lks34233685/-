let reg = /id=(\d+)/;

console.log(reg);

if (!reg.test(location.search)) {
    location.href = '../html/list.html'
};


let id = reg.exec(location.search)[1];
let container = document.querySelector('.product');
console.log(id);
$.ajax({
    url: '../api/getDetail.php',
    method: 'get',
    dataType: 'json',
    data: { id },
    async: true,
    success: function(res) {
        renderHtml(res.detail)
    },
    error: function(err) {
        console.log(err);
    },
    // timeout: 2000,
    //设置this的指向
    // context: window

});
//
//tab切换
$(".product").on("mouseover", "#proBannerNavs ol li", function() {
    // console.log($("#proBannerNavs ol li"));
    // console.log($(this));
    let index = $(this).index();
    // console.log(index);
    $(this).addClass('active').siblings().removeClass('active');
    // console.log($(".slick-track img"));
    $(".slick-track img").eq(index).addClass('slick-active').siblings().removeClass('slick-active');
    $(".showbox img").eq(index).addClass('active').siblings().removeClass('active');
    $(".slick-track img").eq(index).css({
        "opacity": 1,
        " z - index": 999,
    }).siblings().css({
        "z-index": 998,
        "opacity": 0
    });
    // console.log($(".slick-dots li"));
    $(".slick-dots li").eq(index).addClass('slick-active').siblings().removeClass('slick-active');
    //获取放大镜小图地址
    let oSrc = $(this).find("img").attr("src");
    //把oSrc添加到放大镜展示图中
    $(".showbox img").attr({ src: oSrc });
    console.log(oSrc);
});

//放大镜
$(".product").on("mouseover", ".slick-track img", function() {
    Zoomhover($(".probox img"), $(".hoverbox"), $(".showbox img"));
})

//增加数量
$(".product").on("click", ".add-btn", function() {
    let $t = $("#product-num");
    $t.val(Math.abs(parseInt($t.val())) + 1)
    if (parseInt(t.val()) != 1) {
        $('.minus-btn').attr('disabled', false);
    };
});

//减少数量
$(".product").on("click", ".minus-btn", function() {
    let $t = $("#product-num");
    $t.val(Math.abs(parseInt($t.val())) - 1);
    if (parseInt(t.val()) < 1) {
        $t.val() = 1
    };
})

container.onclick = function() {
    let e = window.event.target;
    let login = localStorage.getItem('login1');
    if (e.id == 'buyItNowBtn') {
        if (!login) {
            localStorage.setItem('url', 'http://test.com/xfxb/html/details.html?id=' + id)
            return
        }

        pAjax({
            url: '../api/addCarData.php',
            data: {
                username: login,
                goods_id: id
            }
        }).then(res => {
            console.log(res);
            location.href = '../html/car.html?id=' + id;
        })

    }

    if (e.id == 'addToCartBtn') {
        console.log(1);

        if (!login) {
            localStorage.setItem('url', 'http://test.com/xfxb/html/details.html?id=' + id)
            return
        }

        pAjax({
            url: '../api/addCarData.php',
            data: {
                username: login,
                goods_id: id
            }
        }).then(res => {
            console.log(res);
            console.log("添加成功");
        })
    }
}





function renderHtml(data) {
    console.log(data);
    let str =
        `
        <div class="breadbars">
            <a href="/category/parentId/1" class="r"><span>${data.cat_two_id}</span></a>
            <span>&gt;</span>
            <a href="/category/4" class="r"><span>${data.cat_three_id}</span></a>
            <span>&gt;</span>
            <span class="cur">${data.goods_name}</span>
        </div>
        <div class="pro-intro" data-goods="${data.goods_id}">
            <div class="imgs">
                <div id="proBanner" class="main slick-initialized slick-slider" role="toolbar">
                    <div aria-live="polite" class="slick-list draggable show">
                        <div class="slick-track probox" style="opacity: 1; width: 2040px;" role="listbox">
                            <img src="${data.goods_small_logo1}" alt="" class="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide00" style="width: 510px; position: relative; left: 0px; top: 0px; z-index: 999; opacity: 1;">
                            <img src="${data.goods_small_logo2}" alt="" class="slick-slide" data-slick-index="1" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide01" style="width: 510px; position: relative; left: -510px; top: 0px; z-index: 998; opacity: 0;">
                            <img src="${data.goods_small_logo3}" alt="" class="slick-slide" data-slick-index="2" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide02" style="width: 510px; position: relative; left: -1020px; top: 0px; z-index: 998; opacity: 0;">
                            <img src="${data.goods_small_logo4}" alt="" class="slick-slide" data-slick-index="3" aria-hidden="true" tabindex="-1" role="option" aria-describedby="slick-slide03" style="width: 510px; position: relative; left: -1530px; top: 0px; z-index: 998; opacity: 0;"></div>
                            <div class="mask" style="display: none; left: 222px; top: 0px;"></div>
                    </div>
                    <div class="hoverbox"></div>
                    <ul class="slick-dots" style="display: block;" role="tablist">
                        <li class="slick-active" aria-hidden="false" role="presentation" aria-selected="true" aria-controls="navigation00" id="slick-slide00"><button type="button" data-role="none" role="button" aria-required="false" tabindex="0">1</button></li>
                        <li aria-hidden="true" role="presentation" aria-selected="false" aria-controls="navigation01" id="slick-slide01"><button type="button" data-role="none" role="button" aria-required="false" tabindex="0">2</button></li>
                        <li aria-hidden="true" role="presentation" aria-selected="false" aria-controls="navigation02" id="slick-slide02"><button type="button" data-role="none" role="button" aria-required="false" tabindex="0">3</button></li>
                        <li aria-hidden="true" role="presentation" aria-selected="false" aria-controls="navigation03" id="slick-slide03"><button type="button" data-role="none" role="button" aria-required="false" tabindex="0">4</button></li>
                    </ul>
                </div>
                <div class="showbox"> 
                <img calss src="${data.goods_small_logo2}" alt=""> 
            </div>
                <div id="proBannerNavs" class="list">
                    <ol class="clearfix">
                        <li class="active">
                            <img src="${data.goods_small_logo1}" alt="">
                        </li>
                        <li>
                            <img src="${data.goods_small_logo2}" alt="">
                        </li>
                        <li>
                            <img src="${data.goods_small_logo3}" alt="">
                        </li>
                        <li>
                            <img src="${data.goods_small_logo4}" alt="">
                        </li>
                    </ol>
                </div>
            </div>
            <div class="enlarge" style="display: none; width: 355.45px; height: 462.963px; background-position: -394.55px -532.407px; background-image: url(${data.goods_small_logo4});"></div>
            <div class="intro">
                <div class="share">
                    <a href="javascript:;" class="share-icon"></a>
                    <div class="share-pop transition">
                        <a class="sina" href="javascript:;" target="_blank"></a>
                        <a class="qzone" href="javascript:;" target="_blank"></a>
                    </div>
                </div>
                <div type="hidden" id="mallCode">1_1014287_0220004366</div>
                <h2 class="title">${data.goods_name}</h2>

                <div class="pri-wrapper active">
                    <h1 class="pri">￥<span id="price-span">${data.goods_price1}</span>
                    </h1>

                </div> 
                <div class="pri-wrapper">
                    <h1 class="pri">￥<span id="price-span">${data.goods_price2}</span>
                    </h1>

                </div> 
                <div class="pri-wrapper">
                    <h1 class="pri">￥<span id="price-span">${data.goods_price3}</span>
                </h1>
                </div> 
                <div class="pri-wrapper ">
                    <h1 class="pri">￥<span id="price-span">${data.goods_price4}</span>
                </h1>
                </div> 
                <div class="pri-wrapper ">
                    <h1 class="pri">￥<span id="price-span">${data.goods_price5}</span>
                </h1>
                </div>

                <div class="size label">选择规格</div>
                <ol class="size-list clearfix">
                    <li class="active" data-sku="4366" data-goods-channel-id="${data.goods_id}">${data.goods_specifications}</li>
                    <li class data-sku="4366" data-goods-channel-id="${data.goods_id}">${data.goods_specifications2}</li>
                    <li class data-sku="4366" data-goods-channel-id="${data.goods_id}">${data.goods_specifications3}</li>
                    <li class data-sku="4366" data-goods-channel-id="${data.goods_id}">${data.goods_specifications4}</li>
                    <li class data-sku="4366" data-goods-channel-id="${data.goods_id}">${data.goods_specifications5}</li>
                </ol>
                <div class="ch clearfix">
                    <span class="num label">数量</span>
                    <div id="num-picker" class="np">
                        <input id="product-num" type="text" value="1">
                        <div class="num-action">
                            <a class="add-btn" href="javascript:;" data-track="商品详情-添加商品数据-点击" data-opt-label="${data.goods_name}" data-opt-value="${data.goods_id}"></a>
                            <a class="minus-btn" href="javascript:;" 
                            type="button" data-track="商品详情-减少商品数据-点击" data-opt-label="${data.goods_name}" data-opt-value="${data.goods_id}"></a>
                        </div>
                    </div>

                </div>
                <div class="btns">
                    <button id="buyItNowBtn" data-track="商品详情-立即购买-点击" data-opt-label="${data.goods_name}" data-opt-value="${data.goods_id}">立即购买</button>
                    <button id="addToCartBtn" data-track="商品详情-加入购物车-点击" data-opt-label="${data.goods_name}" data-opt-value="${data.goods_id}">加入购物车</button>
                </div>
                <div class="sh">
                    <span class="text" data-track="商品详情-幸福承诺-点击" data-opt-label="${data.goods_name}	" data-opt-value="${data.goods_id}">
                        幸福承诺
                    </span>
                    <div class="transition">
                        <ol>
                            <li>
                                <strong>就敢退</strong>
                                <span>实物不对板，退款不退货！</span>
                            </li>
                            <li>
                                <strong>就敢减</strong>
                                <span>约定时间！迟到1分钟减1元！</span>
                            </li>
                            <li>
                                <strong>就敢送</strong>
                                <span>迟到30分钟免费赠送！</span>
                            </li>
                            <li>
                                <strong>就敢赔</strong>
                                <span>早到或迟到60分钟以上，双倍赔付！</span>
                            </li>
                        </ol>
                    </div>
                    <a href="/region" target="_blank" class="show-delivery-region-menu" data-track="商品详情-查看配送区域-点击" data-opt-label="${data.goods_name}	" data-opt-value="${data.goods_id}">查看配送区域</a>
                    <div class="delivery-region-menu-pop transition">
                        <a class="show-delivery-region" href="javascript:;">弹窗</a>
                        <a class="" href="/region" target="_blank">新窗口</a>
                    </div>
                </div>

            </div>
        </div>
        ${data.goods_introduce} 
        ${data.goods_select}`;
    $(".product").html(str);

}


//放大镜效果函数
function Zoomhover(imgbox, hoverbox, showbox) {
    var l = imgbox.offset().left;
    var t = imgbox.offset().top;
    var w = hoverbox.width();
    var h = hoverbox.height();
    var time;
    //鼠标移入
    $(".probox img,.hoverbox").mouseover(function(e) {
        var x = e.pageX;
        var y = e.pageY;
        //放大图展示
        $(".hoverbox,.showbox").show();
        hoverbox.css("opacity", "0.3")
        time = setTimeout(function() {
            Zoom(imgbox, hoverbox, l, t, x, y, w, h, showbox)
        }, 1)
    }).mousemove(function(e) {
        var x = e.pageX;
        var y = e.pageY;
        time = setTimeout(function() {
            Zoom(imgbox, hoverbox, l, t, x, y, w, h, showbox)
        }, 1)
    }).mouseout(function() {
        showbox.parent().hide()
        hoverbox.hide();
    })
}
//放大镜定位
function Zoom(imgbox, hoverbox, l, t, x, y, h_w, h_h, showbox) {
    var moveX = x - l - (h_w / 2);
    //鼠标区域距离
    var moveY = y - t - (h_h / 2);
    //鼠标区域距离
    if (moveX < 0) {
        moveX = 0
    }
    if (moveY < 0) {
        moveY = 0
    }
    if (moveX > imgbox.width() - h_w) {
        moveX = imgbox.width() - h_w
    }
    if (moveY > imgbox.height() - h_h) {
        moveY = imgbox.height() - h_h
    }
    //判断鼠标使其不跑出图片框
    var zoomX = showbox.width() / imgbox.width()
        //求图片比例
    var zoomY = showbox.height() / imgbox.height()

    showbox.css({
        left: -(moveX * zoomX),
        top: -(moveY * zoomY)
    })
    hoverbox.css({
            left: moveX,
            top: moveY
        })
        //确定位置

}