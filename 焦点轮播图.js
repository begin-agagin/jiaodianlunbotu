// 将第一张图在最后再使用一次,实现无限轮播
$(function () {
    // 页码li
    var indexLis = $('#index>li');
    // 图片列表li
    var bannerLis = $('#banner>li');
    // 图片列表li的父元素ul
    var banner = $('#banner');
    // 轮播图可视区域盒子
    var banner_box = $('#banner_box');
    // 下一张按钮
    var right = $('#right');
    // 上一张按钮
    var left = $('#left');
    // 页码被点击样式类名
    var active = 'active';
    // 下方页码索引
    var index = 0;
    // 轮播图定时器
    var timer = null;
    // 给下方页码索引添加自定义属性page
    for (var i = 0; i < indexLis.length; i++) {
        $(indexLis[i]).attr('page', i);
    }
    //下一张
    right.click(nextPage);
    // 下一张
    function nextPage() {
        // 最后一张移动前,索引改为0,banner的left重置为0
        if (index == bannerLis.length - 1) {
            index = 0;
            banner.css('left', 0);
        }

        index++;
        changeClass(index);
        animateMove(banner[0], banner_box.width() * -index);
        // 移动到最后一张,修改第一个小圆点类名
        if (index === bannerLis.length - 1) {
            changeClass(0);
        }
    }
    //上一张
    left.click(function () {
        // 第一张改为最后一张
        if (index == 0) {
            index = bannerLis.length - 1;
            banner.css('left', -banner_box.width() * (bannerLis.length - 1));
        }
        index--;
        changeClass(index);
        animateMove(banner[0], banner_box.width() * -index);
    });

    /**
     * @param {number} index - 当前显示的图片的页码样式
     */
    function changeClass(index) {
        indexLis.eq(index).addClass(active).siblings().removeClass(active);
    }
    // 页码点击事件
    indexLis.click(function () {
        // 小圆点点击后,如果是最后一张,先重置成第一张
        var left = parseInt(banner.css('left'));
        var current = -(bannerLis.length - 1) * banner_box.width();
        if (left === current) {
            banner.css('left', 0);
        }
        //获取索引
        index = $(this).attr('page');
        changeClass(index);
        animateMove(banner[0], banner_box.width() * -index);
    });
    // 自动轮播
    function autoPlay() {
        timer = setInterval(nextPage, 1500);
    }
    // 页面加载后自动开始
    autoPlay();

    // 鼠标移入移除
    banner_box.mouseenter(function () {
        clearInterval(timer);
    }).mouseleave(autoPlay);
    /**
    * banner匀速移动
    * @param {jQueryElement}
    * @param {number} target - 目标位置
    */
    function animateMove(ele, target) {
        // 清除旧的定时器,以本次为准
        clearInterval(ele.timer);
        // 当前banner的left值,$.css(''left)是left值字符串
        var curLeft = parseInt($(ele).css('left'));
        // 移动速度
        var speed = (target - curLeft) / (500 / 10);
        ele.timer = setInterval(function () {
            curLeft += speed;
            $(ele).css("left", curLeft);
            // 根据速度正负值选择结束条件
            if (speed > 0 ? parseInt($(ele).css('left')) >= target : parseInt($(ele).css('left')) <= target) {
                $(ele).css('left', target);
                clearInterval(ele.timer);
            }
        }, 10);
    }
});