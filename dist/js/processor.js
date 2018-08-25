(function($, root) {
    const $scope = $(document.body);
    let lastPercent = 0;
    let curDuration;
    let startTime;
    let frameId;

    //将秒转化为分
    function formatTime(duration) {
        const minute = Math.floor(duration / 60);
        const second = Math.floor(duration % 60);
        const minStr = minute < 10 ? '0' + minute : minute;
        const secStr = second < 10 ? '0' + second : second;

        return minStr + ':' + secStr;
    }
    //显示歌曲的总时间
    function renderAllTime(duration) {
        //初始化百分比
        lastPercent = 0;
        //将总时间放到上一个作用域
        //便于计算经过时间所占百分比
        curDuration = duration;
        //时间处理
        const timeStr = formatTime(duration);
        //插入页面
        $scope.find('.all-time').html(timeStr);
    }

    //实时更新播放时间
    function updata(percent) {
        //计算已播放时间
        let curTime = curDuration * percent;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
    }

    //已播放时长显示
    function start() {
        //开始播放的时间
        startTime = new Date().getTime();
        //刷新时间
        function frame() {
            //当前时间
            console.log(1);
            const curTime = new Date().getTime();
            //播放时间所占总时间的百分比
            const percent = lastPercent + (curTime - startTime) / 1000 / curDuration;
            //判断是否播完
            if(percent < 1) {
                //一定时间刷新
                frameId = requestAnimationFrame(frame);
                updata(percent);
            }else {
                //播放完跳转下一首
                $scope.find('.next-btn').trigger('click');
            }
        }
        frame();
    }

    function stop() {
        //将当前百分比存储起来
        const stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) / 1000 / curDuration;
        cancelAnimationFrame(frameId);
    }

    root.processor = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop
    }

}(window.Zepto, window.player ||(window.player = {})));