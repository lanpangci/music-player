(function($, root){
    const $scope = $(document.body);

    //歌曲信息显示
    function renderInderInfo(info) {
        const html = ` 
            <div class="song-name">${info.song}</div>
            <div class="singer-name">${info.singer}</div>
            <div class="album-name">${info.album}</div>
            `
        $scope.find('.song-info').html(html);
    }

    //歌曲图片显示
    function renderImg(image) {
        const img = new Image()
        img.src = image;
        img.onload = () => {
            //高斯模糊
            root.blurImg(img, $scope);
            $scope.find('.img-wrapper').html(img);
        }
    }
    root.render = (data) => {
        renderInderInfo(data);
        renderImg(data.image);
    }

})(window.Zepto, window.player || (window.player = {}));