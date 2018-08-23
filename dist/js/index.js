const $ = window.Zepto;
const root = window.player;
const $scope = $(document.body);
let AudioManager = new root.AudioManager();
let control;
let index = 0;

//点击事件
function bindClick(data) {
    //上一首
    $scope.on('click', '.prev-btn', () => {
        console.log(1);
        //获取index
        index = control.prev();
        //刷新歌曲
        root.render(data[index]);
        //初始化音乐
        AudioManager.setAudio(data[index].audio);
        //播放
        AudioManager.play();
    })
    //下一首
    $scope.on('click', '.next-btn', () => {
        //获取index
        index = control.next();
        //刷新歌曲
        root.render(data[index]);
        //初始化音乐
        AudioManager.setAudio(data[index].audio);
        //播放
        AudioManager.play();
    })
    //点击播放
    //点击暂停
    $scope.on('click', '.play-btn', () => {
        //根据state判断播放暂停
        if(AudioManager.state === 'play') {
            AudioManager.pause();
        }else {
            AudioManager.play();
        }
    })
}


//发送数据请求
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: (data) => {
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
        },
        error: () => {
            console.log('error');
        }
    })
}

getData('http://localhost:8090/dist/mock/data.json');