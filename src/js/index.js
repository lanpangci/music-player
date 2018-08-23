const $ = window.Zepto;
const root = window.player;
const $scope = $(document.body);
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
    })
    //下一首
    $scope.on('click', '.next-btn', () => {
        //获取index
        index = control.next();
        //刷新歌曲
        root.render(data[index]);
    })
}


//发送数据请求
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: (data) => {
            control = new root.Control(data.length);
            //绑定点击事件
            bindClick(data);
            //刷新第一首歌
            root.render(data[index]);
        },
        error: () => {
            console.log('error');
        }
    })
}

getData('http://localhost:8090/dist/mock/data.json');