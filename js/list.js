let list = document.querySelector(".inner");
let page = document.querySelector(".page");

let defaultInfo = {
    len: 20,
    num: 1
};
pAjax({
    url: "../api/getData.php",
    data: {
        start: defaultInfo.num,
        len: defaultInfo.len
    }
}).then((res) => {
    new Pagination(page, {
        pageInfo: {
            pagenum: 1,
            pagesize: defaultInfo.len,
            total: res.total,
            totalpage: Math.ceil(res.total / defaultInfo.len)
        },
        textInfo: {
            first: '首页',
            prev: '上一页',
            list: '',
            next: '下一页',
            last: '最后一页'
        },
        change: function(num) {
            defaultInfo.num = num;
            getData();
            sortsNum(JSON.parse(res).list);
            scrollTo(0, 0)
        }
    });
});

async function getData() {
    let res = await pAjax({
        url: '../api/getData.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len
        }
    });
    // console.log(res);
    console.log(JSON.parse(res).list);
    // let a = JSON.parse(res);
    renderHtml(JSON.parse(res).list);

};

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

function sortsNum(nums) {
    // let defaultSort = document.querySelector("#defaultSort");

    //默认排序
    // defaultSort.onclick = function() {
    //     console.log(1);
    //     console.log(nums);
    //     let a = nums.find(nums.goods_id)
    //     console.log(a);


    // };
    $("#defaultSort").click(function() {
        console.log(1);
        console.log(this);
        console.log(nums);
        let res1 = nums.sort(function(a, b) {

            return a.goods_id - b.goods_id
        })
        renderHtml(res1);
    });

    //按价格从低到高
    $("#priceSort").click(function() {
        console.log(1);
        let res2 = nums.sort(function(a, b) {
            return a.goods_price1 - b.goods_price1
        })
        renderHtml(res2);
    });
    //销量排序
    $("#salesRanking").click(function() {
        console.log(1)
        let res3 = nums.sort(function(a, b) {
            return b.cart_number - a.cart_number
        })
        renderHtml(res3);
    })
}