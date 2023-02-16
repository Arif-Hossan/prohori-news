const loadCategories = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data =await res.json();
    displayCategories(data.data.news_category);
};
// display categories
const displayCategories = categories =>{
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('navbar-items','me-2', 'mb-2');
    categoryItem.innerHTML=
    `<a class="nav-link" onclick="loadCategoryNews('${category.category_id}')">${category.category_name}</a>`;;

    categoriesContainer.appendChild(categoryItem);
    });
};
// load news by categories
const loadCategoryNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryNews(data.data);
}
// display category wise news
const displayCategoryNews = categoryNews =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent=``;
    // short array short wise
    categoryNews.sort(function (a,b){return b.total_view- a.total_view})
    categoryNews.forEach(news=>{
        console.log(news);
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('card','mb-3');
    newsDiv.innerHTML=
    `<div class="row g-0 mb-2">
    <div class="col-md-3">
      <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-3 ">
    </div>
    <div class="col-md-9 ">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details.slice(0,320)}...</p>

      </div>
      <div class="d-flex mt-5 justify-content-between">
      <!--Author -->
        <div class="author d-flex">
            <img src="${news.author.img}" class="rounded-circle me-2" style="height:70px";>
            <div class="author-details">
                <p>${news.author.name?news.author.name:"Unknown"}</p>
                <p class="text-muted">${news.author.published_date.slice(0,10)}</p>
            </div>
        </div>
      <!--Total View -->
           <div class="d-flex justify-content-center align-items-center">
           <strong><i class="fa-regular fa-eye"></i></strong>
           <span>${news.total_view}</span>
           </div>
       <div>
       </div>
      </div>
    </div>
   </div>`;
   newsContainer.appendChild(newsDiv);
    });
}
loadCategories();
