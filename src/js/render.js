(function($, root){
    const $scope = $(document.body);
    function renderInderInfo(info) {
        const html = ` 
            <div class="song-name">${info.song}</div>
            <div class="singer-name">${info.singer}</div>
            <div class="album-name">${info.album}</div>
            `
        $scope.find('.song-info').html(html);
    }
    function renderImg(image) {
        const img = new Image()
        img.src = image;
        img.onload = () => {
            root.blurImg(img, $scope);
            $scope.find('.img-wrapper').html(img);
        }
    }
    root.render = (data) => {
        renderInderInfo(data);
        renderImg(data.image);
    }

})(window.Zepto, window.player || (window.player = {}));