const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
};

// display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((category) => {
    const categoryItem = document.createElement("li");
    categoryItem.classList.add("navbar-items", "me-2", "mb-2");
    categoryItem.innerHTML = `<a class="nav-link" onclick="loadCategoryNews('${category.category_id}')">${category.category_name}</a>`;
    categoriesContainer.appendChild(categoryItem);
  });
};

// load news by categories
const loadCategoryNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategoryNews(data.data);
};

// display category wise news
const displayCategoryNews = (categoryNews) => {
  // console.log(categoryNews);
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = ``;

  //  categoryNews length
  const categoryId = categoryNews[0].category_id;
  const categoryName = getCategoryName(categoryId);
  // console.log(categoryName);
  const totalCategoryNews = categoryNews.length;
  const categoryDetailsDiv = document.getElementById("category-details");
  categoryDetailsDiv.classList.remove("d-none");
  categoryDetailsDiv.innerHTML = `<p>${totalCategoryNews} items found for category</p>`;
  // console.log(totalCategoryNews);
  // short array short wise
  categoryNews.sort(function (a, b) {
    return b.total_view - a.total_view;
  });
  categoryNews.forEach((news) => {
    // console.log(news);

    // rating
    const totalStars = 5;
    const ratingNumber = `${news.rating.number}`;
    // console.log(ratingNumber);

    // get percentage value from rating Number
    const starPercentage = (ratingNumber / totalStars) * 100;
    // Rounded to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    // console.log(starPercentageRounded);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card", "mb-3");
    newsDiv.innerHTML = `<div class="row g-0 mb-2">
    <div class="col-md-3">
      <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-3 ">
    </div>
    <div class="col-md-9 ">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details.slice(0, 320)}...</p>


      <div class="d-flex mt-5 justify-content-between">
       <!--Author -->
        <div class="author d-flex">
            <img src="${
              news.author.img
            }" class="rounded-circle me-2" style="height:70px";>
            <div class="author-details">
                <p>${news.author.name ? news.author.name : "Unknown"}</p>
                <p class="text-muted">${
                  news.author.published_date
                    ? news.author.published_date.slice(0, 10)
                    : "No Data"
                }</p>
            </div>
        </div>
        <!--Total View -->
           <div class="d-flex justify-content-center align-items-center">
           <strong><i class="fa-regular fa-eye me-1"></i></strong>
              <span>${news.total_view ? news.total_view : "Not Found"}</span>
           </div>
        <!--Rating -->
         <div class="d-flex justify-content-center align-items-center">
            <div class="stars-outer">
              <div class="stars-inner">
              </div>
            </div>
         </div>
        <!--More view link -->
          <div class="d-flex justify-content-center align-items-center mt-2">
                <a onclick="loadNewsDetails('${
                  news._id
                }')" data-bs-toggle="modal" data-bs-target="#newsModal"><i class="fa-solid fa-arrow-right"></i></a>

          </div>
       <div>
       </div>
      </div>
    </div>
   </div>`;
    //  append the news div to the news container
    newsContainer.appendChild(newsDiv);
    // Find the stars-inner element in the news div
    const starsInner = newsDiv.querySelector(".stars-inner");

    // Set the width of the stars-inner element to the starPercentageRounded value
    starsInner.style.width = starPercentageRounded;
  });
};

// get category name
const getCategoryName = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  id = id - 1;
  const categoryName = data.data.news_category[id].category_name;
  // console.log(categoryName);
  return categoryName;
};

// loading news details
const loadNewsDetails = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data[0]);
};

// display the news details in modal
const displayNewsDetails = (news) => {
  console.log(news);
  const modalTitle = document.getElementById("newsModalLabel");
  modalTitle.innerText = `${news.title}`;
  const newsBody = document.getElementById("news-modal-body");
  newsBody.innerHTML = `
<img src="${news.image_url}" class="img-fluid rounded-start p-3 ">
<p class="card-text">${news.details}</p>
<div class="d-flex mt-5 justify-content-around">
       <!--Author -->
        <div class="author d-flex">
            <img src="${
              news.author.img
            }" class="rounded-circle me-2" style="height:70px";>
            <div class="author-details">
                <p>${news.author.name ? news.author.name : "Unknown"}</p>
                <p class="text-muted">${
                  news.author.published_date
                    ? news.author.published_date.slice(0, 10)
                    : "No Data"
                }</p>
            </div>
        </div>
        <!--Total View -->
           <div class="d-flex justify-content-center align-items-center">
           <strong><i class="fa-regular fa-eye me-1"></i></strong>
              <span>${news.total_view ? news.total_view : "Not Found"}</span>
           </div>

       </div>`;
};

loadCategories();
loadCategoryNews("08");
