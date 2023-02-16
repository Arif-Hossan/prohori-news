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
    categoryNews.forEach(news=>{
     console.log(news);
    });
}
loadCategories();
