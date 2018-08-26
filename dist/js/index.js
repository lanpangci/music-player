const $ = window.Zepto;
const root = window.player;
const $scope = $(document.body);
const AudioManager = new root.AudioManager();
const { renderAllTime, start, stop, bindTouch } = root.processor;
const { formatList, songSign } = root.songList;
let control;
let source;
let index = 0;

//点击事件
function bindClick() {
    //初始化音乐
    $scope.on('play:start', () => {
        //刷新歌曲
        root.render(source[index]);
        //初始化音乐
        AudioManager.setAudio(source[index].audio);
        //播放
        AudioManager.play();
        //音乐列表标记移动
        songSign(index);
        //时间显示
        renderAllTime(source[index].duration);
        //开始刷新
        start();
    })

    //上一首
    $scope.on('click', '.prev-btn', () => {
        //获取index
        index = control.prev();
        $scope.trigger("play:start");
    })
    //下一首
    $scope.on('click', '.next-btn', () => {
        //获取index
        index = control.next();
        $scope.trigger("play:start");
    })
    //点击播放
    //点击暂停
    $scope.on('click', '.play-btn', () => {
        //根据state判断播放暂停
        if (AudioManager.state === 'play') {
            AudioManager.pause();
            stop();
        } else {
            AudioManager.play();
            start();
        }
    })
    //音乐列表被点击
    $scope.on('click', '.list-btn', () => {
        $scope.find('.song-list').css('display', 'block');
    })
    $scope.on('click', 'li', (e) => {
        index = $(e.target).index();
        $scope.find('.song-list').css('display', 'none;');
        $scope.trigger("play:start");
    })
    $scope.on('click', '.close-btn', () => {
        $scope.find('.song-list').css('display', 'none;');
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
            //时间线拖拽
            //将AudioManager传入实现跳转
            bindTouch(AudioManager);
            $scope.trigger("play:start");
        },
        error: () => {
            console.log('error');
        }
    })
}

getData('http://localhost:8090/dist/mock/data.json');