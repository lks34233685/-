//js工具库
//1、计算任意参数之和
function sum(a) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        sum += a[i];
    }
    //把结果返回出去
    return sum;
}

//2、任意参数的最大值
function maxNum(a) {
    var max = a[0];
    for (var i = 0; i < a.length; i++) {
        if (a[i] > max) {
            max = a[i]
        }
    }
    return max;
}

//3、任意参数的最小值
function minNum(a) {
    var min = a[0];
    for (var i = 0; i < a.length; i++) {
        if (a[i] < min) {
            min = a[i]
        }
    }
    return min;
}

//4、封装a-b的随机整数，包含a、b
function getRandomNum(a, b) {
    if (a > b) {
        return parseInt(Math.random() * (b - a + 1) + a);
    } else {
        return parseInt(Math.random() * (a - b + 1) + b);
    }

}

//5、封装一个随机颜色 rgb(0-255，0-255，0-255)
function getRandomColor() {
    var r = getRandomNum(0, 255);
    var g = getRandomNum(0, 255);
    var b = getRandomNum(0, 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// 6.封装任意数组翻转
function reverse(arr) {
    var newArr = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        newArr[newArr.length] = arr[i];
    }
    return newArr;
};

// 7.封装任意数组冒泡排序
function sort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp
            }
        }
    }
    return arr;
}

//8.封装闰年
function isRunYear(year) {
    //如果是闰年就返回true，否则，返回false
    var flag = false;
    if (year % 4 == 0 && year % 100 == 0 || year % 400 == 0) {
        flag = true;
    }
    return flag;
}

//9.封装数组去重
function norepeat(a) {
    //定义一个新数组
    var newArr = [];
    for (var i = 0; i < a.length; i++) {
        // 通过indexOf判断新数组newArr中是否有这个数据
        if (newArr.indexOf(a[i]) === -1) {
            // 添加到新数组newArr中
            newArr.push(a[i])
        }
    }
    return newArr
}

//10.封装数组排序

//11.封装数组筛选
function screen(a, num) {
    //定义一个新数组
    var newArr = [];
    for (var i = 0; i < a.length; i++) {
        // 当arr的数据小于n时，添加到新数组newArr中
        if (a[i] < num) {
            newArr.push(a[i])
        }
    }
    return newArr;
}

//12.封装判断“回文字符串”
function fun(str) {
    var str1 = str.split('').reverse().join('');
    return str === str1 ? true : false;
}

// 13.封装一个时间格式的函数 2020-11-07  15:30:32  星期六 格式的时间
function formatTime(date, fuhao) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    // 如果 日期是 10号之后的 直接写本身，如果日期小于 10 的是，需要在日期前面 +0
    day = day >= 10 ? day : "0" + day;
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var week = date.getDay(); //返回值的是 数字

    var arr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    week = arr[week];

    fuhao = fuhao ? fuhao : "/";
    // 如果不传递符号这个参数的时候  ，需要做一个处理
    return `${year}${fuhao}${month}${fuhao}${day}  ${hours}:${min}:${sec}  ${week}`
}

//14. 封装一个计算两个时间差的函数
function timeDifference(date1, date2) {
    // 先算两个时间对象到格林威治时间的时间差
    var time1 = date1.getTime();
    var time2 = date2.getTime();

    // 两个时间的时间差的时间戳
    var time = Math.abs(time1 - time2);

    // 计算两个时间差的天数
    var day = parseInt(time / 1000 / 60 / 60 / 24);

    // 计算小时 
    // var hours = time / 1000 / 60 / 60 / 24 - day;
    var hours = parseInt((time / 1000 / 60 / 60) % 24);

    // 计算 分钟
    var min = parseInt((time / 1000 / 60) % 60);

    // 计算秒数
    var sec = parseInt(time / 1000 % 60);

    // 昨天2020年 11月 8号 12:10:20
    // 今天2020年 11月 9号 13:10:10
    // 1天 0小时 59分50秒

    // 把计算的day hours min sec 当成函数的返回值
    var obj = {
        day: day,
        hours: hours,
        min: min,
        sec: sec
    }
    return obj;
    // console.log(`两个时间相差${day}天${hours}小时${min}分${sec}秒`);
}

// 15.封装一个函数 把url的参数转化为 对象
function changeObj(str) {
    var arr = str.split("&");
    var obj = {}; //定义一个空对象用
    arr.forEach(function(item) {
        var newArr = item.split("=");
        obj[newArr[0]] = newArr[1];
    });
    return obj
}

//16. 封装一个函数 兼容的获取元素的样式
// 你要获取哪个元素的什么样式  box width
function getStyle(ele, attr) {
    var res;
    if (window.getComputedStyle) {
        res = window.getComputedStyle(ele)[attr];
    } else {
        res = ele.currentStyle[attr];
    }
    return res;
}

//17. 封装一个事件监听的函数
// 事件源ele，事件类型type, 事件处理函数callback 可变
function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback)
    } else {
        ele.attachEvent("on" + type, callback);
    }
}

function animation(ele, obj, callback) {
    // 记录定定时器的个数
    let timerLen = 0;
    for (let key in obj) {
        // 没for循环一次 那么timerLen 加一次
        timerLen++;
        let attr = key;
        let target = obj[key];
        // 获取元素的当前值
        let style;
        let speed;
        // 开启这次定时器之前 先清空定时器
        clearInterval(ele[attr]);

        // 定义一个定时器 来执行动画的
        // 把定时器当成元素的属性存储起来
        // attr = width ele[attr] = ele.width
        // ele.height
        ele[attr] = setInterval(() => {
            // 没执行一次定时器的时候就需要获取元素的最新的当前值
            // opacity 的取值为 0-1 ===》0-100
            if (attr == "opacity") {
                // 不能取整， 因为透明度没有单位 而且透明度的取整为0-1 有小数
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }
            speed = (target - style) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;
            if (target == style) {
                clearInterval(ele[attr]);
                // 没结束一个定时器，就让timerLen - 1
                timerLen--;
                // 如果在这个位置 去写动画结束 执行的代码，会执行多次，有几个定时就会执行几次
                //    ele.style.backgroundColor = "green";
            }

            // 如果属性为透明度的时候 ，样式是不需要单位的
            if (attr == "opacity") {
                // 因为上面获取的时候 *100
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }

            console.log(timerLen);
            // 当timerLen = 0的时候说明所有动画都结束
            if (timerLen == 0) {
                //  当有callback的时候那么久执行callback
                // 如果没有callback 就不用 当callback没有传递参数的时候，callback = undefined
                callback && callback();
            }
        }, 30)
    }
}


// 最大公约数
function gcd(x, y) {
    if ((x - y) < 0) {
        var k = x;
        x = y;
        y = k;
    }
    while (num2 != 0) {
        var remainder = x % y;
        x = y;
        y = remainder;
    }
    return x;
};
//最小公倍数
function lcm(x, y) {
    return (x * y) / gcd(x, y);
}

/* 
    18. 封装一个动画函数
    参数：
        目标值
        给谁做动画
        做什么样式的动画（css属性）


    思考：多属性的动画？
*/
// var timer;
function move(ele, obj, callback) {
    // 记录定定时器的个数
    let timerLen = 0;
    for (let key in obj) {
        // 没for循环一次 那么timerLen 加一次
        timerLen++;
        let attr = key;
        let target = obj[key];
        // 获取元素的当前值
        let style;
        let speed;
        // 开启这次定时器之前 先清空定时器
        clearInterval(ele[attr]);

        // 定义一个定时器 来执行动画的
        // 把定时器当成元素的属性存储起来
        // attr = width ele[attr] = ele.width
        // ele.height
        ele[attr] = setInterval(() => {
            // 没执行一次定时器的时候就需要获取元素的最新的当前值
            // opacity 的取值为 0-1 ===》0-100
            if (attr == "opacity") {
                // 不能取整， 因为透明度没有单位 而且透明度的取整为0-1 有小数
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }
            speed = (target - style) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;
            if (target == style) {
                clearInterval(ele[attr]);
                // 没结束一个定时器，就让timerLen - 1
                timerLen--;
                // 如果在这个位置 去写动画结束 执行的代码，会执行多次，有几个定时就会执行几次
                //    ele.style.backgroundColor = "green";
            }

            // 如果属性为透明度的时候 ，样式是不需要单位的
            if (attr == "opacity") {
                // 因为上面获取的时候 *100
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }

            // 当timerLen = 0的时候说明所有动画都结束
            if (timerLen == 0) {
                //  当有callback的时候那么久执行callback
                // 如果没有callback 就不用 当callback没有传递参数的时候，callback = undefined
                callback && callback();
            }
        }, 30)
    }
}

// 获取样式的函数
function getStyle(ele, attr) {
    var style;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele)[attr];
    } else {
        style = ele.currentStyle[attr];
    }
    return style;
}

//19. 封装一个函数 兼容的获取元素的样式
// 你要获取哪个元素的什么样式  box width
function getStyle(ele, attr) {
    var res;
    if (window.getComputedStyle) {
        res = window.getComputedStyle(ele)[attr];
    } else {
        res = ele.currentStyle[attr];
    }
    return res;
}

//20.封装一个面向对象脱拽函数
//调用方式 new Drag(参数)
let Drag = function(ele) {
    this.ele = ele;

    this.init();

}
Drag.prototype = {

    constructor: Drag,
    init: function() {
        //鼠标按下时候实现拖拽
        this.ele.onmousedown = () => {
                this.down();
            }
            //鼠标抬起 停止拖拽
        document.onmouseup = this.up;
    },
    down: function() {
        let e = window.event;
        // let x = e.offsetX;
        // let y = e.offsetY;
        this.x = e.offsetX;
        this.y = e.offsetY;

        document.onmousemove = () => {
            // this.move(x,y)
            this.move()
        }
    },
    move: function() {
        let event = window.event;
        let left = event.clientX - this.x;
        let top = event.clientY - this.y;

        let leftMax = window.innerWidth - this.ele.offsetWidth;
        let topMax = window.innerHeight - this.ele.parentNode.offsetHeight;
        if (left <= 0) {
            left = 0;
        } else if (left >= leftMax) {
            left = leftMax;
        };
        if (top <= 0) {
            top = 0;
        } else if (top >= topMax) {
            top = topMax;
        }

        this.ele.parentNode.style.left = left + 'px';
        this.ele.parentNode.style.top = top + 'px';
    },
    up: function() {
        document.onmousemove = null;
    }

}
Object.defineProperty(Drag.prototype, 'constructor', {
    enumerable: false
});

//20.封装获取当前时间
function getdate() {
    const dt = new Date();
    const y = dt.getFullYear();
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    const hh = dt.getHours().toString().padStart(2, 0);
    const mm = dt.getMinutes().toString().padStart(2, 0);
    const ss = dt.getSeconds().toString().padStart(2, 0);
    const time = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    return time;
}