import favoriteRestoIdb from '../../data/favorite-resto-idb';
import { restoItemTemplate } from '../templates/resto.templates';

const Favorite = {
  async render() {
    return `
      <div class="sub-judul">
        <h2 tabindex="0">Your Favorite List</h2>
        <hr />
      </div>
      <div id="fav-resto"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path 
          fill="#004225" 
          fill-opacity="1" 
          d="M0,160L34.3,170.7C68.6,181,137,203,206,176C274.3,149,343,75,411,58.7C480,43,549,85,617,96C685.7,107,754,85,823,96C891.4,107,960,149,1029,154.7C1097.1,160,1166,128,1234,112C1302.9,96,1371,96,1406,96L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
        </path>
      </svg>
    `;
  },

  async afterRender() {
    const restaurants = await favoriteRestoIdb.getAllResto();
    const favoriteContainer = document.querySelector('#fav-resto');

    restaurants.forEach((resto) => {
      favoriteContainer.innerHTML += restoItemTemplate(resto);
    });
  },
};

export default Favorite;
