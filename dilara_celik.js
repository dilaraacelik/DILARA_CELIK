const MAINPAGE = "https://www.e-bebek.com/"
const PRODUCT_URL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"

async function carouselSection() {

    const productBannerCarousel = document.querySelector("eb-product-carousel")

    const productCarousel = document.createElement('div')
    productCarousel.classList.add('custom-product-carousel')

    const eBebekProducts = await fetchProducts()
    productCarousel.innerHTML = buildHTML(eBebekProducts)



    productBannerCarousel.before(productCarousel)

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
                                            <div class="product-content">
                                                <div class="product-tags">çok satar</div>
                                                <div class="product-media">
                                                    <figure>
                                                        <img style="width: 100px; height:auto" src="${product.img}"/>
                                                    </figure>
                                                </div>
                                            </div>
                                            <div class="product-name-info">
                                                <h2 class="product-name">
                                                    <b>${product.brand} - </b>
                                                    <span>${product.name}</span>
                                                </h2>
                                                <div class="product-ratio">
                                                    <cx-star-rating>
                                                        <cx-icon>
                                                        </cx-icon>
                                                        <cx-icon>
                                                        </cx-icon>
                                                    </cx-star-rating>
                                                    <p class="rev-count">(5)</p>
                                                </div>
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
                                <div class="add-to-wishlist">

                                </div>
                                <div class="add-to-cart">
                                    <button id="addToCartBtn" type="submit" class="btn btn-add disable btn-add-circle ng-star-inserted">
                                        <div class="inner-btn ng-star-inserted">
                                            <i class="toys-icon toys-icon-plus-blue add-icon"></i>
                                                <i class="toys-icon toys-icon-plus-white add-icon hovered"></i>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            `
                            ).join('')}
                            
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
        </div>
    `
    return html
}
carouselSection()