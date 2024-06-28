const API_URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

let NewsCategoryHeading = document.querySelector('h2.news-category-heading');

async function fetchNews(query) {
    let res = await fetch(`${API_URL}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    let data = await res.json();

    displayNews(data.articles);
}

function displayNews(data) {
    let newsContainer = document.querySelector('.news-cards-container');
    newsContainer.innerHTML = "";
    data.forEach((news) => {
        if(news.urlToImage) {
            let div = document.createElement('div');
            div.innerHTML = `
                <div class="news-card" onclick="redirectToLink('${news.url}')">
                    <img src="${news.urlToImage}">
                    <div class="overlay-content">
                        <div class="news-channel">${news.source.name}</div>
                        <div class="bottom">
                            <div class="news-title">
                                <h2>${news.title}</h2>
                            </div>
                            <p class="published-date">${(news.publishedAt).substring(0, 10)}</p>
                        </div>
                        <div class="news-content">
                            <p>${news.description}</p>
                        </div>
                    </div>
                </div>
            `;
            newsContainer.append(div);
        }
    });
}

function redirectToLink(url) {
    window.location.href = url;
}

let allNavLinks = document.querySelectorAll('.nav-links a');
allNavLinks.forEach(navLink => {
    navLink.addEventListener("click", function(event) {
        event.preventDefault();
        let query = navLink.innerText.trim();
        fetchNews(query);
        NewsCategoryHeading.innerText = query
    });
});

let searchBtn = document.querySelector('.search-btn')
searchBtn.addEventListener("click", function(){
    let searchInput = document.querySelector('.search-input')
    let query = searchInput.value

    fetchNews(query)
    NewsCategoryHeading.innerText = query
})

let searchInput = document.querySelector('.search-input')
searchInput.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        let query = searchInput.value

        fetchNews(query)
        NewsCategoryHeading.innerText = query
    }
})