(function($, root){

    $scope = $(document.body);

    function AudioManager() {
        this.audio = new Audio;
        //状态标识
        this.state = 'pause';
    }
    AudioManager.prototype = {
        //播放功能
        play() {
            this.audio.play();
            //按钮样式改变
            $scope.find('.play-btn').removeClass('pause-btn');
            this.state = 'play';
        },
        //暂停
        pause() {
            this.audio.pause();
            //按钮样式改变
            $scope.find('.play-btn').addClass('pause-btn');
            this.state = 'pause';
        },
        //跳转
        goTo(curTime) {
            this.audio.currentTime = curTime;
            this.play();
        },
        //初始化音频
        setAudio(url) {
            this.audio.src = url;
            this.audio.load();
        }
    }

    root.AudioManager = AudioManager;
})(window.Zepto, window.player || (window.player = {}));