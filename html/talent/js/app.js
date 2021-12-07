const FETCH_BTN_TEXT = 'Search Repos';
const LOADING_TEXT = 'Please wait...';
const CONTENT_LOADER = '<div class="render-wrapper"><div class="loader"></div></div>';
const CARD_TEMPLATE = ` <div class="card">
                                <div class="content">
                                    <div class="card-content">
                                     <a href="{0}" target="_blank">{1}</a>
                                     <span>{2}</span>
                                     <br>
                                    <time datetime="2016-1-1">{3}</time>
                                </div>
                            </div>
                        </div>
                       `
                    

const API = {
    SEARCH_URL: 'https://api.github.com/search/repositories?q={0} in:name,description&per_page=100'
}


String.prototype.format = function() {
    var args = arguments;

    return this.replace(/\{(\d+)\}/g, function() {
        return args[arguments[1]];
    });
};

window.onload = () => {
    const fetchReposBtn = document.getElementById('fetchReposBtn');

    fetchReposBtn.addEventListener('click', () => {
        const searchInput = document.getElementById('searchInput');

        if (searchInput.value.trim() === '') {
            alert('You have to type something!');
            return;
        }

        fetchReposBtn.innerHTML = LOADING_TEXT;
        fetchReposBtn.disabled = true;

        const reposRequest = getRepositories();
        reposRequest.send();
        reposRequest.addEventListener('load', () => {
            fetchReposBtn.innerHTML = FETCH_BTN_TEXT;
            fetchReposBtn.disabled = false;
        })
    });

    getRepositories().send();
}

const getRepositories = () => {
    renderLoader();

    let searchKey = 'a';
    const searchInput = document.getElementById('searchInput');

    if(searchInput.value.trim() !== '') {
        searchKey = searchInput.value.trim();
    }

    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', () => {
        if(xhttp.status !== 200) {
            alert('Error occurred from server, please try again!')
        }
        const {items} = JSON.parse(xhttp.response);
        renderRepositories(items)
    })

    xhttp.open('GET', API.SEARCH_URL.format(searchKey), true);
    return xhttp;
}

const renderRepositories = (items) => {
    const resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = '';
    items.forEach(result => {
        const cardContentDiv = document.createElement('div');
        cardContentDiv.classList.add('column')
        cardContentDiv.classList.add('is-one-quarter')
        cardContentDiv.innerHTML = CARD_TEMPLATE.format(result.url, result.full_name, result.description, formatDate(result.created_at))

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