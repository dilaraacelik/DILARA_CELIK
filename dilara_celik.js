const PRODUCT_URL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"

async function carouselSection() {

    if(window.location.pathname !== '/') {
        console.log('Wrong Page!');
        return;
    }
    
    const productBannerCarousel = document.querySelector("eb-product-carousel")
    const customProductCarousel = document.querySelector(".custom-product-carousel")

    if(customProductCarousel) customProductCarousel.remove()

    const productCarousel = document.createElement('div')
    productCarousel.classList.add('custom-product-carousel')

    const eBebekProducts = await fetchProducts()
    productCarousel.innerHTML = buildHTML(eBebekProducts)
    
    productBannerCarousel.before(productCarousel)
    addFavourite()
}

function addFavourite(){
    const favBtns = document.querySelectorAll(".add-to-wishlist")

    let favourites = JSON.parse(localStorage.getItem('favourites')) || []

    favBtns.forEach(favBtn => {
        const productId = favBtn.dataset.productId

        if(favourites.includes(productId)) {
            const icon = favBtn.querySelector(".toys-icon")
            if(icon) {
                icon.classList.add("toys-icon-heart-orange-filled")
            }
        }
        
        favBtn.addEventListener("click", function () {
            const icon = favBtn.querySelector(".toys-icon")
            icon.classList.toggle("toys-icon-heart-orange-filled")

            if (icon.classList.contains("toys-icon-heart-orange-filled")) {
                if (!favourites.includes(productId)) {
                    favourites.push(productId)
                }
            } else {
                favourites = favourites.filter(id => id !== productId)
            }
            
            localStorage.setItem("favourites", JSON.stringify(favourites))
            console.log(favBtn)
        })
    })

    
}

async function fetchProducts() {
    let eBebekProducts = localStorage.getItem("e_bebek_products")
    if (eBebekProducts) {
        console.log("localdeyim")
        return JSON.parse(eBebekProducts)
    }

    console.log("deneyelim")
    try {
        const res = await fetch(PRODUCT_URL)
        const data = await res.json()
        localStorage.setItem("e_bebek_products", JSON.stringify(data))
        return data
    } catch (err) {
        console.log(err)
        return []
    }
}

const buildHTML = (eBebekProducts) => {
    const html = `
        <div class="banner">
            <div class="container">
                <div class="custom-banner-header">
                    <div class="custom-banner-title">
                        <h2>Beğenebileceğinizi Düşündüklerimiz</h2>
                    </div>
                </div>
                <div class="custom-banner-products">
                    <div class="product-list-wrapper">
                        <div class="product-list">
                            ${eBebekProducts.map(product =>
                            `
                            <div class="product-wrapper">
                                <div class="product-itself">
                                    <a href=${product.url} target="_blank">
                                        <div class="product-info">
                                            <div class="product-media">
                                                    <img src="${product.img}"/>
                                            </div>
                                            <div class="product-name-info">
                                                <h2 class="product-name">
                                                    <b>${product.brand} - </b>
                                                    <span>${product.name}</span>
                                                </h2>
                                            </div>
                                        </div>
                                        <div class="product-price-wrapper">
                                            <div class="product-price">
                                                <span>
                                                    ${(product.price).toString().split(".")[0]}
                                                    <span>
                                                        ,${(product.price).toString().split(".")[1]} TL
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="add-to-wishlist" data-product-id="${product.id}">
                                    <div class="heart">
                                        <div class="icon-wrapper">
                                            <i class="toys-icon toys-icon-heart-outline"></i>
                                            <i class="toys-icon toys-icon-heart-orange-outline hovered"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="add-to-cart">
                                    <button id="addToCartBtn" class="btn btn-add disable btn-add-circle ng-star-inserted">
                                        <div class="inner-btn ng-star-inserted">
                                            <i class="toys-icon toys-icon-plus-blue add-icon"></i>
                                                <i class="toys-icon toys-icon-plus-white add-icon hovered"></i>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            `
                            ).join('')}
                        </div>
                        <button aria-label="back" class="swiper-prev">
                            <i class="toys-icon toys-icon-arrow-left"></i>
                        </button>
                        <button aria-label="next" class="swiper-next">
                            <i class="toys-icon toys-icon-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    return html
}

const buildCSS = () => {
    const css = 
    `
   .Section2A custom-product-crausel {
        padding-bottom: 50px;
    }

    .custom-banner-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: Quicksand-SemiBold;
        font-weight: 700;
    }

    .custom-banner-title h2 {
        color: var(--Primary-Black);
        font-size: 24px;
        margin: 0;
    }

    .custom-banner-products {
        box-shadow: none;
    }

    .custom-banner-products {
        position: relative;
        background-color: #fff;
    }

    .product-list-wrapper {
        width: 100%;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        z-index: 1;
    }

    .product-list-wrapper .product-list {
        position: relative;
        overflow: hidden;
        -webkit-transform: translateZ(0);
        touch-action: manipulation;
    }

    .banner .product-list {
        display: flex;
        padding-bottom: 20px;
        padding-top: 20px;
    }
    .banner .swiper-prev {
        left: -65px;
        bottom: 50%;
        top: auto;
    }
    .banner .swiper-next {
        right: -65px;
        bottom: 50%;
        top: auto;
    }

    .product-wrapper .heart {
        right: 0;
        top: 0;
        z-index: 2;
    }
    .product-wrapper .add-to-cart {
        z-index: 2;
        position: absolute;
        bottom: 4px;
        right: 4px;
    }
    .product-list-wrapper .product-wrapper {
        position: relative;
        min-height: 1px;
        float: left;
        -webkit-backface-visibility: hidden;
        -webkit-tap-highlight-color: transparent;
        min-width: 245.2px;
        margin-right: 16px;
    }
    .product-itself {
        z-index: 1;
        display: block;
        width: 100%;
        font-family: Quicksand-Medium;
        font-size: 12px;
        border: 1px solid var(--Neutral-200);
        border-radius: 8px;
        position: relative;
        text-decoration: none;
        background-color: var(--Neutral-0---White);
        overflow: hidden;
        height: 100%;
        color: unset;
        background: unset;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .product-itself:focus, .product-itself:hover {
        color: unset;
        outline: none;
        border:1px solid var(--Neutral-500,#c1ccd4)
    }
    
    .product-itself:active {
        border:1px solid var(--Neutral-500,#c1ccd4)
    }
    .product-name-info {
        padding-bottom: 13px;
        padding: 0 10px;
    }
    .product-name{
        font-size: 12px;
        color: var(--Primary-Black);
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        margin-bottom: 10px;
    }
    .product-price-wrapper {
        position: relative;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        padding: 6px 10px 15px;
    }
    .product-price {
        font-family: Quicksand-SemiBold;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--Neutral-600);
    }
    .product-media {
        position: relative;
        display: block;
        width: 100%;
        background-color: #fff;
        text-align: center;
        margin: 0 0 1rem;
    }
    .product-media img{
        display: inline-block;
        max-height: 60%;
        border-radius: 10px;
        background-color: #fff;
        width: 100%;
        height: 203px;
        object-fit: contain;
    }

    @media (max-width: 1480px) {
        .product-list-wrapper .product-wrapper {
            min-width: 275.5px;
        }
    }

    @media (max-width: 1280px) {
        .product-list-wrapper .product-wrapper {
            min-width: 299.333px;
        }
    }

    @media (max-width: 992px) {
        .product-list-wrapper .product-wrapper {
            min-width: 337px;
        }
    }
    
    @media (max-width: 768px) {
        .product-list-wrapper .product-wrapper {
            min-width: 247px;
        }
    }
    `
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
}
buildCSS()
carouselSection()