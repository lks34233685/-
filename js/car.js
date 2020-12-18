let container = document.querySelector('.main');
//判断是否有登录
// let login = getCookie('login');
let login = localStorage.getItem('login1');
// let Login = getCookie("login");

// console.log(login);
// localStorage.setItem('url', 'http://test.com/xfxb/html/car.html');
if (!login) {
    location.href = '../html/login.html';
    localStorage.setItem('url', 'http://test.com/xfxb/html/car.html');
}


//获取用户购物车中的数据
pAjax({
    url: '../api/getCarData.php',
    data: { username: login }
}).then(res => {
    // console.log(JSON.parse(res));
    localStorage.setItem('goods', res)
    let reg = JSON.parse(res)
    render(reg);
})

function render(data) {
    if (!data.length) {
        container.innerHTML = `
        <div class="jumbotron">
            <h1>亲爱的用户</h1>
            <p>您购物空空如也，请到列表页选购你商品</p>
            <p>
                <a class="btn btn-primary btn-lg" href="../html/list.html" role="button">去购物</a>
            </p>
        </div>`;
        return
    }
    // console.log(data);

    let allChecked = data.every(item => {
        return item.is_select == 1
    });
    // console.log(allChecked);
    let total = shopNum(data);
    console.log(total);

    let str = `<div class="cartMain">
    <div class="cartMain_hd">
        <ul class="order_lists cartTop">
            <li class="list_chk">
                <!--所有商品全选-->
                <input type="checkbox" id="all" class="whole_check" ${allChecked?'checked' :''}>
                <label for="all" class="allLabel">全选</label>
            </li>
            <li class="list_con">商品信息</li>
            <li class="list_info">商品参数</li>
            <li class="list_price">单价</li>
            <li class="list_amount">数量</li>
            <li class="list_sum">金额</li>
            <li class="list_op">操作</li>
        </ul>
    </div>
    <div class="cartBox">
            <div class="order_content">`;

    // str += `  `;

    data.forEach((item, index) => {
        // console.log(item);
        str += ` 
        <ul class="order_lists" index="${index}">
        <li class="list_chk">
        <input type="checkbox" class="check son_check" ${item.is_select==1 ?'checked':''} goods_id="${item.goods_id}">
    </li>
    <li class="list_con">
    <div class="list_img">
        <a href="javascript:;"><img src="${item.goods_big_logo}" alt=""></a>
    </div>
    <div class="list_text"><a href="javascript:;">${item.goods_name}</a></div>
</li>
<li class="list_info">
<p>${item.goods_specifications}</p>

</li> <li class="list_price">
<p class="price">￥${item.goods_price1}</p>
</li>
<li class="list_amount">
<div class="amount_box" goods_id="${item.goods_id}">
<button class="btn btn-default reduce">-</button>
<button class="btn btn-default nums">${item.cart_number}</button>
<button class="btn btn-default puls ">+</button>
</div>
</li>
<li class="list_sum">
<p class="sum_price">￥${item.goods_price1*item.cart_number}</p>
</li>
<li class="list_op">
<p class="del"><a href="javascript:;" goods_id="${item.goods_id}" class="delBtn del">移除商品</a></p>
</li>
</ul>`
    })

    // str += `  `;
    str += `  </div>
    </div>
    <!--底部-->
    <div class="bar-wrapper">
        <div class="bar-right">
            <div class="piece">已选商品<strong class="piece_num">${total.totalNum}</strong>件</div>
            <div class="totalMoney">共计: <strong class="total_text">${total.totalPrice}</strong></div>
            <button class="btn btn-warning btn-xs pay">结算</button>
            <button class="btn btn-info btn-xs clean">清空购物车</button>
        </div>
    </div>
</div>
`

    container.innerHTML = str;

};

container.onclick = function() {
    let e = window.event;
    //全选
    if (e.target.id == "all") {

        let data = JSON.parse(localStorage.getItem('goods'));
        // console.log(data);
        console.log(e.target.checked);
        data.forEach(item => {
            e.target.checked ? item.is_select = 1 : item.is_select = 0
        });
        localStorage.setItem('goods', JSON.stringify(data));
        render(data);
    }

    // 单选
    if (e.target.className == 'check son_check') {
        console.log(1);
        console.log(e.target.checked);
        let id = e.target.getAttribute('goods_id');
        let data = JSON.parse(localStorage.getItem('goods'));
        data.forEach(item => {
            if (item.goods_id == id) {
                item.is_select = e.target.checked ? 1 : 0;
            }
        });
        // 需要把 修改够的数据存储本地存储中
        localStorage.setItem('goods', JSON.stringify(data));
        render(data);
    }
    //删除  
    if (e.target.classList.contains('del')) {
        let id = e.target.getAttribute('goods_id');
        console.log(1);
        console.log(id);
        pAjax({
            url: '../api/removeCarData.php',
            data: {
                username: login,
                goods_id: id
            }
        }).then(res => {
            let reg = JSON.parse(res);
            console.log(reg);
            if (reg.code) {
                let data = JSON.parse(localStorage.getItem('goods'));
                let reg = data.filter(item => {
                    return item.goods_id != id;
                });
                localStorage.setItem('goods', JSON.stringify(reg));
                render(reg);
            }
        })
    }

    //更新商品的数量

    if (e.target.classList.contains('reduce')) {
        let data = JSON.parse(localStorage.getItem('goods'));
        let id = e.target.parentNode.getAttribute("goods_id");
        console.log(data);
        let obj = data.filter(item => {
            return item.goods_id == id
        })[0];

        console.log(obj);
        let num = obj.cart_number * 1;
        if (num <= 1) {
            num = 1
        } else {
            num--
        }
        pAjax({
            url: '../api/updCarData.php',
            data: {
                username: login,
                goods_id: id,
                goods_num: num
            }
        }).then(res => {
            let reg = JSON.parse(res)
            console.log(reg);
            if (reg.code) {
                obj.cart_number = num;
                localStorage.setItem('goods', JSON.stringify(data));
                render(data);
            }
        })

    }
    if (e.target.classList.contains('puls')) {
        // console.log(1);
        let data = JSON.parse(localStorage.getItem('goods'));
        let id = e.target.parentNode.getAttribute("goods_id");
        let obj = data.filter(item => {
            return item.goods_id == id
        })[0];
        // console.log(obj.cart_number);
        let num = obj.cart_number * 1;
        // console.log(num);
        num++;
        pAjax({
            url: '../api/updCarData.php',
            data: {
                username: login,
                goods_id: id,
                goods_num: num
            }
        }).then(res => {
            let reg = JSON.parse(res)
            if (reg.code) {
                obj.cart_number = num;
                localStorage.setItem('goods', JSON.stringify(data));
                render(data);
            }
        });
        // console.log(obj.cart_number);
    }

    //结算
    if (e.target.classList.contains('pay')) {
        // console.log(1);
        let data = JSON.parse(localStorage.getItem('goods'));
        console.log(data);
        let a = data.filter(item => {
            return item.is_select == 0
        })
        console.log(a);
        data.forEach(item => {
            if (item.is_select == 1) {
                pAjax({
                    url: '../api/removeCarData.php',
                    data: {
                        username: login,
                        goods_id: item.goods_id
                    }
                }).then(res => {

                    console.log(JSON.parse(res));
                })
            }
        })
        render(a)
    }

    //清空
    if (e.target.classList.contains('clean')) {
        console.log(1);
        pAjax({
            url: '../api/clearCarData.php',
            data: {
                username: login
            }
        }).then(res => {
            let reg = JSON.parse(res)
            if (reg.code) {
                localStorage.setItem('goods', JSON.stringify(reg));
                render(reg);
            }
        })
    }
}


function shopNum(goods) {
    let e1 = window.event;
    console.log(e1.target.checked);
    console.log(e1.target.index);
    let ali = document.querySelector(".son_check");
    console.log(ali);
    let res = goods.filter(item => {
        return item.is_select == 1
    });

    //小计

    let totalPri = res.reduce((pre, item) => {
        if (e1.target.checked == true) {
            return pre + item.goods_price1 * item.cart_number
        }
    }, 0);


    // 计算选中商品的数量
    let totalNum = res.reduce((pre, item) => {
        return pre + item.cart_number * 1
    }, 0);
    // 计算选中商品的总价格
    let totalPrice = res.reduce((pre, item) => {
        console.log(item.goods_price1);
        return pre + item.goods_price1 * item.cart_number
    }, 0);




    return {
        totalNum,
        totalPrice,
        // totalPri
    }
}