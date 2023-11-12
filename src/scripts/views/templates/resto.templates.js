import CONFIG from '../../globals/config';

const restoDetailTemplate = (resto) => `
    <div class="detail-title">
        <h2 tabindex="0">${resto.restaurant.name}</h2>
    </div>

    <div class="detail-info">
        <picture>
            <source class="lazyload" srcset="${CONFIG.BASE_IMAGE_SMALL_URL + resto.restaurant.pictureId}" type="image/webp" media="all and (max-width: 500px)" />

            <source class="lazyload" srcset="${CONFIG.BASE_IMAGE_SMALL_URL + resto.restaurant.pictureId}" type="image/jpeg" media="all and (max-width: 500px)" />

            <source class="lazyload" srcset="${CONFIG.BASE_IMAGE_MEDIUM_URL + resto.restaurant.pictureId}" type="image/webp" media="all and (min-width: 500px) and (max-width: 900px)" />

            <source class="lazyload" srcset="${CONFIG.BASE_IMAGE_MEDIUM_URL + resto.restaurant.pictureId}" type="image/jpeg" media="all and (min-width: 500px) and (max-width: 900px)" />

            <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_MEDIUM_URL + resto.restaurant.pictureId}" alt="${resto.restaurant.name}" />
        </picture>
        <span class="detail-info-rating">${resto.restaurant.rating}</span>
    
        <p tabindex="0"><span>City: </span>${resto.restaurant.city}</p>
        <p tabindex="0"><span>Address: </span>${resto.restaurant.address}</p>

        <br />
        <h4 tabindex="0">Foods Menu:</h4>
        <ul>
            ${resto.restaurant.menus.foods.map((food) => `<li tabindex="0">${food.name}</li>`).join('')}
        </ul>

        <br />
        <h4 tabindex="0">Drinks Menu:</h4>
        <ul>
            ${resto.restaurant.menus.drinks.map((drink) => `<li tabindex="0">${drink.name}</li>`).join('')}
        </ul>
    </div>

    <div class="detail-info-more">
        <h4 tabindex="0">Description:</h4>
        <p tabindex="0" class="desc">${resto.restaurant.description}</p>

        <br />
        <h4 tabindex="0">Customer Reviews:</h4>
        <ul class="review-list">
            ${resto.restaurant.customerReviews
              .map(
                (review) => `
            <li tabindex="0" class="review-item">
            <p><span class="reviewer">${review.name}</span> - <span class="isi-review">"${review.review}"</span></p> 
            <p class="review-date">${review.date}</p>
            </li>`
              )
              .join('')}
        </ul>

        <br />
        <h4 tabindex="0">Add Review :</h4>
        <form id="review-form">
            <div class="name-form">
                <label for="add-name">Your Name:</label>
                <input type="text" name="add-name" id="add-name" placeholder="Your Name..." />
            </div>

            <div class="add-review-form">
                <label for="add-review">Review:</label>
                <textarea name="add-review" id="add-review" rows="5" placeholder="Your Review..."></textarea>
            </div>

            <div class="submit-form">
                <button type="submit" id="add-submit">Submit Review</button>
            </div>
        </form>
    </div>
`;

const restoItemTemplate = (resto) => `
    <div class="resto-card">
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_SMALL_URL + resto.pictureId}" alt="${resto.name}" />
        <div class="resto-info">
            <h3 tabindex="0">${resto.name}</h3>
            <p tabindex="0">${resto.city}</p>
            <span tabindex="0" name="rating restaurants">${resto.rating}</span>
        </div>

        <a href="/#/detail/${resto.id}" class="resto-more">Read More</a>
    </div>
`;

const favoriteBtnTemplate = () => `
  <button aria-label="favorite this restaurant" id="favoriteBtn" class="favorite">
    <i class="fa-regular fa-bookmark" style="color: #ffb000;"></i>
  </button>
`;

const favoritedBtnTemplate = () => `
  <button aria-label="unfavorite restaurant" id="favoriteBtn" class="favorite">
    <i class="fa-solid fa-bookmark" style="color: #ffb000;"></i>
  </button>
`;

export { restoDetailTemplate, restoItemTemplate, favoriteBtnTemplate, favoritedBtnTemplate };
