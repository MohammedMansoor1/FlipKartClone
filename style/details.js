let searchUrl = new URLSearchParams(window.location.search);
let id = searchUrl.get("id");

let hamburger = document.querySelector("#hamburger");
let navRight = document.querySelector(".nav-right");
let catgContainer = document.querySelector(".catg-container");
let card = document.querySelector(".items-cart-container");
let relevance = document.querySelector("#links-relevance");
let sortBy = document.querySelector("#sortBy");
let popularity = document.querySelector("#popularity");
let highToLow = document.querySelector("#HighToLow");
let newestFirst = document.querySelector("#newestFirst");
let filterSubImg = document.querySelector(".filter-subImg-container");
let filterImgContainer = document.querySelector(".filter-img-container");
let itemsContainer = document.querySelector(".items-content-container");
let cartItem = document.querySelector(".cart-items");

let showSate = false;

hamburger.addEventListener("click", function () {
  showSate = !showSate;
  console.log(showSate);
  if (showSate) {
    navRight.setAttribute("id", "show-menu-items");
  } else {
    navRight.setAttribute("id", "");
  }
});

async function fetchAllData() {
  let fetchAllData = await fetch("https://dummyjson.com/products");
  let resAllData = await fetchAllData.json();
  return resAllData;
}

async function fetchApi() {
  let fetchData = await fetch(`https://dummyjson.com/products/${id}`);
  let resData = await fetchData.json();
  return resData;
}

window.onload = async function () {
  catgContainer.innerHTML = `
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>
    <div class="shimmer"></div>`;

  let data = await fetchApi();
  // console.log(data);
  displayItems(data);

  let productsImg = data.images;

  let eachImg = productsImg.map((src) => {
    let subImg = document.createElement("img");
    subImg.src = src;
    subImg.alt = "";
    subImg.srcset = "";
    subImg.classList.add("subImg-clicked");

    subImg.addEventListener("mouseover", () => {
      displayImg(src);
    });

    return subImg;
  });

  filterSubImg.innerHTML = "";
  eachImg.forEach((img) => {
    filterSubImg.appendChild(img);
  });

  if (localStorage.length === 0) {
    cartItem.style.opacity = "0";
  } else {
    cartItem.innerHTML = `${localStorage.getItem("count")}`;
  }

  function displayImg(e) {
    filterImgContainer.innerHTML = `<img
  src="${e}"
  alt=""
/><div class="filter-btn">
<button class="add-to-cart-Btn" onclick="addToCart()">
  <svg
    class="V3C5bO"
    width="14"
    height="14"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="_1bS9ic"
      d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
      fill="#fff"
    ></path></svg
  >ADD TO CART
</button>
<button class="buy-now-Btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
  >
    <path d="M0 0v7.7h2.1V14L7 5.6H4.2L7 0" fill="#FFF" />
  </svg>
  Buy Now
</button>
</div>`;
  }

  let thumbnail = data.thumbnail;
  filterImgContainer.innerHTML = `<img
  src="${thumbnail}"
  alt=""
/><div class="filter-btn">
<button class="add-to-cart-Btn" onclick="addToCart()">
  <svg
    class="V3C5bO"
    width="14"
    height="14"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="_1bS9ic"
      d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
      fill="#fff"
    ></path></svg
  >ADD TO CART
</button>
<button class="buy-now-Btn">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
  >
    <path d="M0 0v7.7h2.1V14L7 5.6H4.2L7 0" fill="#FFF" />
  </svg>
  Buy Now
</button>
</div>`;

  let AllData = await fetchAllData();
  let allProducts = AllData.products;
  UniqCatg(allProducts);
};

async function UniqCatg(products) {
  console.log(products);
  let catg = products.map((e) => {
    return e.category;
  });

  let uniqCatg = catg.filter((item, index) => {
    return catg.indexOf(item) === index;
  });
  let elemCatgs = uniqCatg.map((item) => {
    let capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
    let elem = `<div class="catg-item" onclick=dispCatg('${item}')>${capitalizedItem}<svg class="main-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z">
                            </path>
                        </svg></div>`;
    return elem;
  });

  catgContainer.innerHTML = elemCatgs.join("");
}

function displayItems(item) {
  itemsContainer.innerHTML = `<a href="#">
        <div class="cart-title">
        <a href="#">${item.title}</a>
        <br>
        <div class="cart-title-content">
            <div class="cart-rating">
             ${item.rating} &#9733;
            </div>
            <div class="cart-stock">
             &nbsp; +${
               item.stock
             } Items are left in stock &nbsp;&nbsp;&nbsp;<img class="cart-assured-img" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="">
         </div>
        </div>
        <div class="cart-price-container">
        <div class="cart-price">
         &#36 ${item.price}/-
        </div>
        <div class="cart-btn-price">
            <div class="actualAmt">
             &#36; ${actualAmtCalc(item)}
         </div>
         <div class="disPer">
               ${item.discountPercentage.toFixed(0)}%off
         </div>
        </div>
    </div>
</div>
            <div class="cart-des">
                <ul>
                 <li><img class="des-img" src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="">${
                   item.description
                 }<li>
                </ul>
         </div>
        </div>
    </a>`;
  function actualAmtCalc(item) {
    let actualAmt = (item.price * item.discountPercentage) / 100;
    let totalAmt = actualAmt + item.price;
    return totalAmt.toFixed(0);
  }
}

function dispCatg(id) {
  window.location.href = `catg.html?id=${id}`;
}

let searchInp = document.querySelector("#search");
searchInp.addEventListener("keyup", async function (e) {
  let inputVal = e.target.value;
  let data = await fetchApi();
  let products = data.products;

  let searchData = products.filter(function (e) {
    let title = e.title.toLowerCase();
    return title.includes(inputVal);
  });
  displayItems(searchData);
});

let count = 0;

async function addToCart() {
  let data = await fetchApi();
  let productDetails = data;

  count = parseInt(localStorage.getItem("count"), 10) || 0;

  let newCount = ++count;

  localStorage.setItem("count", newCount);

  console.log(localStorage);

  let dataLS = JSON.parse(localStorage.getItem("dataCart")) || [];
  dataLS.push(productDetails);

  localStorage.setItem("dataCart", JSON.stringify(dataLS));

  cartItem.innerHTML = `${localStorage.getItem("count")}`;
}
