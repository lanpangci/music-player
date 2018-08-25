const $ = window.Zepto;
const root = window.player;
const $scope = $(document.body);
const AudioManager = new root.AudioManager();
const { renderAllTime, start, stop, updata } = root.processor;
const { formatList, songSign } = root.songList;
let control;
let source;
let index = 0;

//点击事件
function bindClick() {
    //上一首
    $scope.on('click', '.prev-btn', () => {
        //获取index
        index = control.prev();
        //刷新歌曲
        root.render(source[index]);
        //初始化音乐
        AudioManager.setAudio(source[index].audio);
        //播放
        AudioManager.play();
        //时间显示
        renderAllTime(source[index].duration);
        start();
    })
    //下一首
    $scope.on('click', '.next-btn', () => {
        //获取index
        index = control.next();
        //刷新歌曲
        root.render(source[index]);
        //初始化音乐
        AudioManager.setAudio(source[index].audio);
        //播放
        AudioManager.play();
        renderAllTime(source[index].duration);
        start();
    })
    //点击播放
    //点击暂停
    $scope.on('click', '.play-btn', () => {
        //根据state判断播放暂停
        if(AudioManager.state === 'play') {
            AudioManager.pause();
            stop();
        }else {
            AudioManager.play();
            start();
        }
    })
    $scope.on('click', '.list-btn', () => {
        $scope.find('.song-list').css('display', 'block');
    })
    $scope.on('click', 'li', (e) => {
        index = $(e.target).index();
        //刷新歌曲
        root.render(source[index]);
        //初始化音乐
        AudioManager.setAudio(source[index].audio);
        //播放
        AudioManager.play();
        renderAllTime(source[index].duration);
        songSign(index);
        start();
        $scope.find('.song-list').css('display', 'none;');
    })
    $scope.on('click', '.close-btn', () => {
        $scope.find('.song-list').css('display', 'none;');
    })
}

//触碰跳转
function bindTouch() {
    $slidePoint = $scope.find('.slider-point');
    const offset = $scope.find('.pro-wrapper').offset();
    //获取时间线距左侧距离
    const left = offset.left;
    //获取时间线长度
    const width = offset.width;

    $slidePoint.on('touchstart', () => {
        //触碰开始
        //时间线移动和时间刷新停止
        stop();
    }).on('touchmove', (e) => {
        const x = e.changedTouches[0].clientX;
        //拖拽长度所占总长度比例
        let percent = (x - left) / width;
        //防止不超出时间线范围
        if(percent < 0) {
            percent = 0;
        }
        if(percent > 1) {
            percent = 1;
        }
        //实时更新播放时间和时间线
        updata(percent);
    }).on('touchend', (e) => {
        const x = e.changedTouches[0].clientX;
        let percent = (x - left) / width;
        if(percent < 0) {
            percent = 0;
        }
        if(percent > 1) {
            percent = 1;
        }
        //获取已播放时间
        const curTime = percent * source[index].duration;
        //时间开始刷新
        start(percent);
        //跳转播放
        AudioManager.goTo(curTime);
    })
}

//发送数据请求
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: (data) => {
            //将数据绑定到全局
            source = data
            //初始化歌曲列表
            formatList(data, index);
            songSign(index);
            //上下首切换
            control = new root.Control(data.length);
            //绑定点击事件
            bindClick(data);
            //刷新第一首歌
            root.render(data[index]);
            //初始化音乐
            AudioManager.setAudio(data[index].audio);
            //播放
            AudioManager.play();
            //时间显示
            renderAllTime(data[index].duration);
            start();
            bindTouch();
        },
        error: () => {
            console.log('error');
        }
    })
}

getData('http://localhost:8090/dist/mock/data.json');