import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import restaurantsSource from '../../data/restaurants.source';
import favoriteBtnInitiator from '../../utils/favorite-btn-initiator';
import { restoDetailTemplate } from '../templates/resto.templates';
import favoriteRestoIdb from '../../data/favorite-resto-idb';

const Detail = {
  async render() {
    return `
      <div class="detail-resto"></div>
      <div id="favoriteBtnContainer"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path 
          fill="#004225" 
          fill-opacity="1" 
          d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,144C840,128,960,128,1080,144C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
        </path>
      </svg>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await restaurantsSource.detailResto(url.id);
    const restoContainer = document.querySelector('.detail-resto');
    restoContainer.innerHTML = restoDetailTemplate(resto);

    favoriteBtnInitiator.init({
      favoriteBtnContainer: document.querySelector('#favoriteBtnContainer'),
      favoriteRestaurants: favoriteRestoIdb,
      resto: {
        id: resto.restaurant.id,
        name: resto.restaurant.name,
        city: resto.restaurant.city,
        rating: resto.restaurant.rating,
        pictureId: resto.restaurant.pictureId,
      },
    });

    document.getElementById('review-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('add-name').value;
      const review = document.getElementById('add-review').value;

      const response = await fetch(`${CONFIG.BASE_URL}review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: resto.restaurant.id,
          name,
          review,
        }),
      });

      if (response.ok) {
        const updatedResto = await restaurantsSource.detailResto(url.id);
        restoContainer.innerHTML = restoDetailTemplate(updatedResto);
      } else {
        console.error('Failed to add review');
      }
    });
  },
};

export default Detail;
