const FETCH_BTN_TEXT = 'Refresh News';
const LOADING_TEXT = 'Please wait...';
const CONTENT_LOADER = '<div class="render-wrapper"><div class="loader"></div></div>';
const USER_PROFILE = 'https://news.ycombinator.com/user?id=';
const CARD_TEMPLATE = ` <div class="card">
                                <div class="content">
                                    <div class="card-content">
                                     <a href="{0}" target="_blank">{1}</a>
                                     <br>
                                    <time datetime="2016-1-1">{2}</time>
                                </div>
                            </div>
                        </div>
                       `
                    

const API = {
    ORDER_CREATED_DATE: 'https://hn.algolia.com/api/v1/search_by_date?tags=(story,poll)'
}


String.prototype.format = function() {
    var args = arguments;

    return this.replace(/\{(\d+)\}/g, function() {
        return args[arguments[1]];
    });
};

window.onload = () => {
    const fetchNewsBtn = document.getElementById('fetchNewsBtn');

    fetchNewsBtn.addEventListener('click', () => {
        fetchNewsBtn.innerHTML = LOADING_TEXT;
        fetchNewsBtn.disabled = true;

        const newsRequest = getNews();
        newsRequest.send();
        newsRequest.addEventListener('load', () => {
            fetchNewsBtn.innerHTML = FETCH_BTN_TEXT;
            fetchNewsBtn.disabled = false;
        })
    });

    getNews().send();
}

const getNews = () => {
    renderLoader();

    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', () => {
        if(xhttp.status !== 200) {
            alert('Error occurred from server, please try again!')
        }
        const {hits} = JSON.parse(xhttp.response);
        renderNews(hits)
    })

    xhttp.open('GET', API.ORDER_CREATED_DATE, true);
    return xhttp;
}

const renderNews = (hits) => {
    const resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = '';
    hits.forEach(result => {
        const cardContentDiv = document.createElement('div');
        cardContentDiv.classList.add('column')
        cardContentDiv.classList.add('is-one-quarter')
        cardContentDiv.innerHTML = CARD_TEMPLATE.format(result.url, result.title, formatDate(result.created_at))

        resultArea.appendChild(cardContentDiv);
    })
}

const renderLoader = () => {
    const resultArea = document.getElementById('resultArea');

    resultArea.innerHTML = CONTENT_LOADER; 
}

const formatDate = (_date) => {
    const date = new Date(_date);

    return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
} 