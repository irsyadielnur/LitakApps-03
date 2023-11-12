import restaurantsSource from '../../data/restaurants.source';
import CONFIG from '../../globals/config';
import { restoItemTemplate } from '../templates/resto.templates';

const Home = {
  async render() {
    return `
      <section class="hero">
        <div tabindex="0" class="hero-tagline">
          <h2>
            Selalu Ada Tempat <br />
            Untuk Merasakan Lezatnya Makanan
          </h2>
          <p tabindex="0">Di LITAK, anda bisa menemukan restaurant rekomendasi di setiap kota yang anda kunjungi</p>
          
          <form role="search" class="search-form">
            <input type="search" id="search-input" placeholder="Search Restaurant..." aria-label="search restaurant" />
            <button type="submit" id="search-btn">Search</button>
          </form>
        </div>

        <div class="hero-slider">
          <div class="slider-item">
            <picture>
              <source media="(max-width: 600px)" srcset="./images/hero-image_1-small.jpg" />
              <img src="./images/hero-image_1-large.jpg" alt="Hero Slider" />
            </picture>

            <picture>
              <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg" />
              <img src="./images/hero-image_2-large.jpg" alt="Hero Slider" />
            </picture>
            
            <picture>
              <source media="(max-width: 600px)" srcset="./images/hero-image_3-small.jpg" />
              <img src="./images/hero-image_3-large.jpg" alt="Hero Slider" />
            </picture>

            <picture>
              <source media="(max-width: 600px)" srcset="./images/hero-image_4-small.jpg" />
              <img src="./images/hero-image_4-large.jpg" alt="Hero Slider" />
            </picture>
            
            <picture>
              <source media="(max-width: 600px)" srcset="./images/hero-image_1-small.jpg" />
              <img src="./images/hero-image_1-large.jpg" alt="Hero Slider" />
            </picture>
          </div>
        </div>
      </section>

      <section class="search-container">
        <div id="showSearchResto"></div>
      </section>

      <error-element></error-element>

      <div class="sub-judul">
        <h2 tabindex="0">Restaurants List</h2>
        <hr />
      </div>

      <div class="daftar-resto"></div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#004225"
          fill-opacity="1"
          d="M0,64L17.1,106.7C34.3,149,69,235,103,261.3C137.1,288,171,256,206,234.7C240,213,274,203,309,202.7C342.9,203,377,213,411,186.7C445.7,160,480,96,514,69.3C548.6,43,583,53,617,96C651.4,139,686,213,720,245.3C754.3,277,789,267,823,250.7C857.1,235,891,213,926,202.7C960,192,994,192,1029,170.7C1062.9,149,1097,107,1131,101.3C1165.7,96,1200,128,1234,165.3C1268.6,203,1303,245,1337,229.3C1371.4,213,1406,139,1423,101.3L1440,64L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
        ></path>
      </svg>
    `;
  },

  async afterRender() {
    const restaurantsHome = await restaurantsSource.Home();
    const restoContainer = document.querySelector('.daftar-resto');
    restaurantsHome.forEach((resto) => {
      restoContainer.innerHTML += restoItemTemplate(resto);
    });

    const searchInput = document.querySelector('#search-input');
    const searchResult = document.querySelector('#showSearchResto');

    const searchData = async (query) => {
      const response = await fetch(`${CONFIG.BASE_URL}search?q=${query}`, {
        method: 'GET',
      });
      return response.json();
    };

    const showSearchResto = (restaurants) => {
      searchResult.innerHTML = ``;
      restaurants.forEach((resto) => {
        searchResult.innerHTML += `
          <div class="resto-card">
            <img src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}" />
            <div class="resto-info">
                <h3 tabindex="0">${resto.name}</h3>
                <p tabindex="0">${resto.city}</p>
                <span>${resto.rating}</span>
            </div>

            <a href="/#/detail/${resto.id}" class="resto-more">Read More</a>
          </div>`;
      });
    };

    const onInput = async () => {
      const query = searchInput.value;
      if (query.length > 2) {
        const dapat = await searchData(query);
        showSearchResto(dapat.restaurants);
      } else {
        searchResult.innerHTML = '';
      }
    };

    searchInput.addEventListener('input', onInput);

    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        onInput();
      }
    });
  },
};

export default Home;
