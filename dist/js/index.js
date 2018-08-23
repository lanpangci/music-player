const $ = window.Zepto;
const root = window.player;
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: (data) => {
            root.render(data[0]);
        },
        error: () => {
            console.log('error');
        }
    })
}

getData('http://localhost:8090/dist/mock/data.json');