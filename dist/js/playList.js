//歌曲列表
(function($, root) {
    const $scope = $(document.body);

    //插入列表
    function formatList(data) {
        let listStr = ``;
        data.forEach((ele, index) => {
            listStr += `<li>${ele.song}</li>`;
        })
        $scope.find('.list').html(listStr);
        songSign(index);
    }
    //标记正在播放的歌曲
    function songSign(index) { 
        $scope.find('.sign').removeClass('sign');
        $scope.find('li').eq(index).addClass('sign');
    }

    root.songList = {
        formatList: formatList,
        songSign: songSign
    }
}(window.Zepto, window.player || (window.player = {})));