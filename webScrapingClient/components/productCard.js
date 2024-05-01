class ProductCard extends HTMLElement{
    constructor(){
    super()
    this.attachShadow({mode: "open"})

    this.shadowRoot.innerHTML = `
    <style>
        .product-card {
            border: 1px solid #F0F0F0;
            height: 400px;
            border-radius: 5px;
            position: relative;
        }

        .image-container {
            height: 200px;
            width: 100%;
            padding: 20px 0px;
            background-color: #F7F7F7;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .image-container img {
            height: 100%;
            width: 80%;
            object-fit: contain;
            mix-blend-mode: multiply;
        }

        .product-name {
            font-size: 14px;
            font-family: Geist-Medium;
            overflow: hidden;
            color: #232F3E;
            padding-bottom: 2px;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* Limit to 2 lines */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            min-height: 35px;
        }

        .product-info {
            padding: 2px 16px;
        }

        .product-rating {
            font-size: 14px;
            margin-left: 2px;
            color: #232F3E;
        }

        .product-details {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 45px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #F0F0F0;
        }

        .rating-container {
            display: flex;
            align-items: center;
            padding-left: 16px;
        }

        .product-number-of-ratings {
            font-size: 14px;
            margin-right: 16px;
            color: #232F3E;
        }

        .star-rating {
            display: flex;
            align-items: center;
            color: #FFD700;
        }

        .star-icon {
            margin-right: 4px;
        }

        .product-price {
            font-family: Geist-Bold;
            color: #232F3E;
            font-size: 22px;
            padding: 0;
            margin: 0;
        }
        
        .product-link {
            text-decoration: none;
        }

    </style>
    
    <a href="" class="product-link"> 
    <div class="product-card">
        <div class="image-container">
            <img src="" alt="product image" class="product-image">
        </div>
        <div class="product-info">
             <p class="product-name"></p>
             <p class="product-price"></p>
        </div>
        <div class="product-details">
            <div class="rating-container">
            <div class="star-rating"></div>
                    <p class="product-rating"></p>
            </div>
                <p class="product-number-of-ratings"></p>
            </div>
        </div>
    </a>
    `
    }
    set link(value){
        this.shadowRoot.querySelector(".product-link").href = value
    }
    set image(value) {
        this.shadowRoot.querySelector(".product-image").src = value;
    }
    set price(value){
        this.shadowRoot.querySelector(".product-price").textContent = "R$ " + value
    }
    set name(value) {
        this.shadowRoot.querySelector(".product-name").textContent = value;
    }
    set rating(value) {
        this.shadowRoot.querySelector(".product-rating").textContent = "(" + value + ")";
    }

    set numberOfRatings(value) {
        this.shadowRoot.querySelector(".product-number-of-ratings").textContent = value + " reviews";
    }

    set starRating(rating) {
        const starRatingContainer = this.shadowRoot.querySelector(".star-rating");
        starRatingContainer.innerHTML = '';

        const roundedRating = Math.round(Number(rating));
        for (let i = 1; i <= 5; i++) {
            const starIcon = document.createElement("span");
            starIcon.classList.add("star-icon");
            starIcon.innerHTML = i <= roundedRating ? "★" : "☆";
            starRatingContainer.appendChild(starIcon);
        }
    }

}

customElements.define("product-card", ProductCard)