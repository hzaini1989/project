(function(){
    //日历----开始
    "use strict";
    var calendar = function (time, obj) {
        var obj = obj || "body";
        var NewDate = new Date(time.split("-")[0], time.split("-")[1] - 1) || new Date(),
            nYear = NewDate.getFullYear(),	//年
            nMonth = NewDate.getMonth() + 1,	    //月
            nDay = NewDate.getDate(),	        //日
            nWeek = NewDate.getDay();	       //星期
        // 某月有多少天
        var curMonthDate = getDayNum(nYear, nMonth);
        // box
        var calendarBox = $("<div></div>", {"class": "calendar-box zShow swiper-slide"});      //日历外框

        //var head = $('<div></div>', {"class": "cal-head","data-yearmonth":nYear+'-'+nMonth});     //显示  年   月   抬头
        //var headC = '<span>'+nYear + '年' + nMonth + '月'+'</span>';
        //head.html(headC);
        //// 添加星期头
        //calendarBox.append(head);  //  放入到calendar-box盒子里

        // 星期
        //var week_list = $("<ul></ul>", {"class": "week-list"}
        $('.week-list').html("<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>");
        //$('.box-center').append(week_list);

        // 日
        var day_box = $("<ul></ul>", {"class": "day-list"});
        var dayLi = '';

        // 求当月一号是星期几
        var newDate = new Date(nYear, nMonth - 1, 1);
        var curMonthWeek = newDate.getDay();

        //console.log(curMonthWeek,curMonthDate)    //输入当月1号 星期几
        for (var i = 1; i <= 42; i++) {
            if (i <= curMonthWeek) {
                dayLi += '<li class="new"></li>';
            } else if (i >= curMonthWeek && i <= curMonthDate + curMonthWeek) {

                dayLi += '<li data-time=' + nYear + '-' + nMonth + '-' + (i - curMonthWeek) + '><p class="text">' + (i - curMonthWeek) + '</p><p class="end"></p><p class="price"></p><p class="dingwei"><i class="chinas zHide">●</i><i class="locals zHide">●</i></p><p class="jieqi"></p></li>';
            } else {
                dayLi += '<li class="old"></li>';
            }
        }
        day_box.html(dayLi);
        // 插入星期
        //calendarBox.append(week_list);   //星期   放入到canlendar盒子里
        calendarBox.append(day_box);     //天     放入到canlendar盒子里
        $(obj).append(calendarBox);     //放入到   最外框box-cente里
        // 得到当月多少天
        function getDayNum(year, month) {
            //闰月
            var veadar = !(year % 400) || (!(year % 4) && (year % 100));
            var num;
            switch (month) {
                case 2:
                    num = veadar ? 29 : 28;
                    break;
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    num = 31;
                    break;
                default:
                    num = 30;
            }
            return num;
        }
    };

    //addZero
    var addZero = function(num){
        return num <= 9 ? '0' + num : '' + num;
    };
    //   日历------结束

    calendar('2016-6','.box-center');
    calendar('2016-7','.box-center');
    calendar('2016-8','.box-center');
    calendar('2016-9','.box-center');
    calendar('2016-10','.box-center');
    calendar('2016-11','.box-center');
    calendar('2016-12','.box-center');


    // 售罄
    $('[data-time=2016-7-27]').addClass('off').find('.end').text('售罄').css('margin-top','-.2rem').siblings('.price').text('¥1999').css('margin-top','-.05rem');
    $('[data-time=2016-7-22]').addClass('off').find('.end').text('售罄').css('margin-top','-.2rem').siblings('.price').text('¥1999').css('margin-top','-.05rem');
    // 价格
    $('[data-time=2016-7-29]').addClass('on').find('.price').text('¥3999').css('margin-top','-.25rem');
    $('[data-time=2016-11-3]').addClass('on').find('.price').text('¥3999').css('margin-top','-.25rem');
    $('[data-time=2016-10-1]').addClass('on').find('.price').text('¥3999').css('margin-top','-.25rem');
    $('[data-time=2016-9-20]').addClass('on').find('.price').text('¥3999').css('margin-top','-.25rem');


    $('body').on('click','.day-list .on',function(e){   // 有団期的有价格的可以点击
        var $this=$(this),$parents=$('.box-center'),
            $date=$this.attr('data-time'),
            $dataAry = $date.split('-'),$activity=$('.uzai-discount'),$people=$('.uzai-numbers'),$taunts=$('.no-taunts');
        $this.addClass('cur').parents($parents).find('.on').not($this).removeClass('cur');  //  日历団期选中状态
        $activity.show();  // 优惠活动显示
        $people.show();    //  选择出行人数显示
        $taunts.addClass('taunts').html('<span>团期：<b>2015-6-10</b></span>');
        $('.stock').show();
        $('.stock .m').html($dataAry[1]).next().html($dataAry[2]);   // 取得库存日期
        $('.uzai-footer li:first span b').html($date);  // 底部団期改变
        $('.uzai-footer li:eq(1)').css('visibility','visible');  // 行程显示
        $('.uzai-footer li:last i').addClass('active');
    }).on('click','.uzai-footer li .active',function(){
        // TO DO.. 下一步

    });
    $('.people-choose .left i').click(function(){     //  弹窗出现
        var $mask=$('.cal-mask'),$pop=$('#cal-pop');
        $mask.show();
        $pop.fadeIn();
    });
    $('#cal-pop .icon-guanbi').click(function(){    // 关闭弹窗
        var $mask=$('.cal-mask'),$pop=$('#cal-pop');
        $mask.fadeOut();
        $pop.hide();
    });

    // 统筹日历中的样式
    function CreateCalendar(sel){
        this.sel=sel;  // 基础参数
    }
    CreateCalendar.prototype={
        construsctor:CreateCalendar,
        //周六日样色
        addWeekColor:function(){   // 周六日 title
            $('.week-list li').each(function(i){
                var $this=$(this);
                return (i==0 || i==6) ? $this.css('color','red') : '';
            })
        },
        addGreen:function(){    // 默认周六日蓝色颜色样式
            var $box=$('#list .calendar-box');
            $box.each(function(){
                var $this=$(this),$ind=$this.index();
                $this.find('.day-list li').each(function(e){
                    switch (e){
                        case 0:
                        case 6:
                        case 7:
                        case 13:
                        case 14:
                        case 20:
                        case 21:
                        case 27:
                        case 28:
                        case 34:
                        case 35:
                        case 41:
                            return ($(this).hasClass('new') || $(this).hasClass('old')) ? '': $(this).css('color','#76C3EC');
                            break;
                        default :
                    }
                });
            })
        },
        changeNums:function(aLess,aAdd,cLess,cAdd,adult,child){   //  人数选择
            var max=9;
            $(aLess).click(function(){
                $(this).parents('li.clearfix').addClass('myActive').next().removeClass('myActive');
                if(
                    $(adult).html() == 1){
                    return;
                }else{
                    $(adult).html($(adult).html() -1 );
                }
            })
            $(aAdd).click(function(){
                $(this).parents('li.clearfix').addClass('myActive').next().removeClass('myActive');
                if( $(adult).html() < (max - $(child).html())){
                    $(adult).html($(adult).html()-0 +1);
                }else{
                    return;
                }

            })
            $(cLess).click(function(){
                $(this).parents('li.clearfix').addClass('myActive').prev().removeClass('myActive');
                if($(child).html() == 0){
                    return;
                }else{
                    $(child).html($(child).html() -1);
                }

            })
            $(cAdd).click(function(){
                $(this).parents('li.clearfix').addClass('myActive').prev().removeClass('myActive');
                if($(child).html() < (max - $(adult).html())){
                    $(child).html($(child).html()-0+1);
                }else{
                    return;
                }
            })

        },
        getDateCur:function(){  //  添加“今天，明天，后天”
            var GetDateStr=function(){
                var dd = new Date();
                dd.setDate(dd.getDate());//获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth()+1;//获取当前月份的日期
                var d = dd.getDate();
                //console.log(dd,99999)
                return y+"-"+m+"-"+d;

            };
            $('.calendar-box li').each(function(i){
                var $this=$(this);
                var date=$this.attr('data-time');
                if(date == GetDateStr(0)){
                    $this.addClass('now').find('.text').html('今天').end().next().find('.text').html('明天').end().next().find('.text').html('后天');
                }
            });
            $('.calendar-box').each(function(i){    // 今天之前所有団期不可点击
                var $this=$(this);
                $this.find('.day-list li').each(function(e){
                    var $ind=$('.now').index(),$pInd=$('.now').parents('.calendar-box').index();
                    if( e < $ind ){
                        $('.now').parents('.calendar-box').find('.day-list li').eq(e).addClass('off over').removeClass('on').find('.price').css('color','#ddd');
                    }
                    return i < $pInd ? $(this).parents('.calendar-box').find('.day-list li').removeClass('on').addClass('off over') : '';
                })
            })
            //
        }
    };
    var myCalendar = new CreateCalendar();
    myCalendar.addWeekColor();
    myCalendar.addGreen();
    myCalendar.changeNums('.aLess','.aAdd','.cLess','.cAdd','#adult','#child');
    myCalendar.getDateCur();

    // 轮播图--左右滑动和切换
    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        loop:false,
        grabCursor: true,
        paginationClickable: true,
        onTouchEnd:function(){ // 当滑动结束后---月份日期切换同步左右左右切换
            changeMonth();
        }
    });
    $('.arrow-left,.switch-btn .left').on('click', function(e){  //  点击左侧按钮
        e.preventDefault();
        mySwiper.swipePrev();
        changeMonth();

    });
    $('.arrow-right,.switch-btn .right').on('click', function(e){  // 点击右侧按钮
        e.preventDefault();
        mySwiper.swipeNext();
        changeMonth();
    });

    // 切换的时候月份发生变化
    function changeMonth(){
        // 中间部分发生改变
        $('.swiper-slide-active').addClass('myCur').siblings('.swiper-slide').removeClass('myCur');
        var curDay=$('.myCur').find('.new:last').next().attr('data-time'),
            ary = curDay.split('-'),
            $month=$('.switch-btn .center .month');
        $month.html(ary[1]).siblings('.year').find('b:last').html(ary[0]);
        // 左侧发生改变
        if($('.swiper-slide').eq(0).hasClass('myCur')){
            $('.switch-btn .left').html('');
        }else{
            var lastDay = $('.myCur').prev().find('.new:last').next().attr('data-time'),
                lastAry = lastDay.split('-');
            $('.switch-btn .left').html(lastAry[1]+'月');
        }
        // 右侧发生改变
        if($('.swiper-slide:last').hasClass('myCur')){
            $('.switch-btn .right').html('');
        }else{
            var newDay = $('.myCur').next().find('.new:last').next().attr('data-time'),
                newAry = newDay.split('-');
            $('.switch-btn .right').html(newAry[1]+'月');
        };

    }
    changeMonth();

})(window);

