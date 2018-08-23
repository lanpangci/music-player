(function($, root) {
    //获取index的构造函数
    function Control(length) {
        this.index = 0;
        this.len = length;
    }

    //在原型上处理index
    Control.prototype = {
        //上一首
        prev() {
            return this.getIndex(-1);
        },
        //下一首
        next() {
            return this.getIndex(1);
        },
        //index处理
        getIndex(val) {
            //简单算法
            const curIndex = (this.len + this.index + val) % this.len;
            //将函数里的index重新刷新
            this.index = curIndex;
            return curIndex; 
        }
    }

    //将构造函数释放
    root.Control = Control;

}(window.Zepto, window.player || (window.player = {})))