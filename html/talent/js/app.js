// var FETCH_BTN_TEXT = 'Search Repos';
// var LOADING_TEXT = 'Please wait...';
// var CONTENT_LOADER = '<div class="render-wrapper"><div class="loader"></div></div>';
// var CARD_TEMPLATE = ` <div class="card">
//                                 <div class="content">
//                                     <div class="card-content">
//                                      <a href="{0}" target="_blank">{1}</a>
//                                      <span>{2}</span>
//                                      <br>
//                                     <time datetime="2016-1-1">{3}</time>
//                                 </div>
//                             </div>
//                         </div>
//                        `
// var API = {
//     SEARCH_URL: 'https://api.github.com/search/repositories?q={0} in:name,description&per_page=100'
// }

// String.prototype.format = function() {
//     var args = arguments;

//     return this.replace(/\{(\d+)\}/g, function() {
//         return args[arguments[1]];
//     });
// };

// window.onload = function() {
//     const fetchReposBtn = document.getElementById('fetchReposBtn');

//     fetchReposBtn.addEventListener('click', function() {
//         const searchInput = document.getElementById('searchInput');

//         if (searchInput.value.trim() === '') {
//             alert('You have to type something!');
//             return;
//         }

//         fetchReposBtn.innerHTML = LOADING_TEXT;
//         fetchReposBtn.disabled = true;

//         const reposRequest = getRepositories();
//         reposRequest.send();
//         reposRequest.addEventListener('load', function() {
//             fetchReposBtn.innerHTML = FETCH_BTN_TEXT;
//             fetchReposBtn.disabled = false;
//         })
//     });

//     getRepositories().send();
// }

// function getRepositories() {
//     renderLoader();

//     let searchKey = 'a';
//     const searchInput = document.getElementById('searchInput');

//     if(searchInput.value.trim() !== '') {
//         searchKey = searchInput.value.trim();
//     }

//     const xhttp = new XMLHttpRequest();
//     xhttp.addEventListener('load', function() {
//         if(xhttp.status !== 200) {
//             alert('Error occurred from server, please try again!')
//         }
//         const response = JSON.parse(xhttp.response);
//         renderRepositories(response.item)
//     })

//     xhttp.open('GET', API.SEARCH_URL.format(searchKey), true);
//     return xhttp;
// }

// function renderRepositories(items) {
//     const resultArea = document.getElementById('resultArea');
//     resultArea.innerHTML = '';
//     items.forEach(function(result) {
//         const cardContentDiv = document.createElement('div');
//         cardContentDiv.classList.add('card-wrapper')
//         cardContentDiv.innerHTML = CARD_TEMPLATE.format(result.svn_url, result.full_name, result.description, formatDate(result.created_at))

//         resultArea.appendChild(cardContentDiv);
//     })
// }

// function renderLoader() {
//     const resultArea = document.getElementById('resultArea');

//     resultArea.innerHTML = CONTENT_LOADER; 
// }

// const formatDate = function(_date) {
//     const date = new Date(_date);

//     return date.getHours() + ':' +  date.getMinutes() + ' ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
// } 

// window.onload = new function () {
//     var searchBtn = document.getElementById('searchBtn');

//     searchBtn.addEventListener('click', function() {
//             alert('asds')
//     })
    
// }

var SEARCH_URL = 'https://api.github.com/search/repositories?q={0} in:name,description&per_page=100'
var CARD_TEMPLATE = '<div class="card">' +
                    '<div class="content">' +
                    '<div class="card-content">' +
                    '<a href="{0}" target="_blank">{1}</a>' +
                    '<span class="desc">{2}</span>' +
                    '<br>' +
                    '<span class="timeline">{3}</span>' +
                    '</div>' +
                    '</div>' + 
                '</div>';

String.prototype.format = function() {
    var args = arguments;

    return this.replace(/\{(\d+)\}/g, function() {
        return args[arguments[1]];
    });
};

function search() {
    var searchInput = document.getElementById('searchInput');
    var searchBtn = document.getElementById('searchBtn');
    var searchKey = 'a';

    if(searchInput && searchInput.value === '') {
        alert('You have to type search keys');
        return; 
    } else {
        searchKey = searchInput.value;
    }

    searchBtn.innerHTML = 'Please wait...';
    searchBtn.disabled = true;
    var xhttpRequest = getDatas(searchKey);
    xhttpRequest.send();

    xhttpRequest.addEventListener('load', function () {
        searchBtn.innerHTML = 'Search Repos'
        searchBtn.disabled = false;
    });
}

function getDatas(searchKey) {
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', SEARCH_URL.format(searchKey), true);
    xhttp.addEventListener('load', function () {
        if (xhttp.status !== 200) {
            alert('An error occurred from server, please try again');
            return;
        }

        var parsedData = JSON.parse(xhttp.response)

        renderItems(parsedData.items)
    })
    
    return xhttp;
}

function renderItems(items) {
    var resultArea = document.getElementById('resultArea');
    resultArea.innerHTML = '';
    items.forEach(function(result) {
        var cardContentDiv = document.createElement('div');
        cardContentDiv.classList.add('card-wrapper')
        cardContentDiv.innerHTML = CARD_TEMPLATE.format(result.svn_url, result.full_name, result.description, formatDate(result.created_at))

        resultArea.appendChild(cardContentDiv);
    })
}

function formatDate(_date) {
    var date = new Date(_date);
    
    return date.getHours() + ':' +  date.getMinutes() + ' ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
} 
 
window.onload = function() {
    getDatas('a').send();
}