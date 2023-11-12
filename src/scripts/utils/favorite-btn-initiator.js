import favoriteRestoIdb from '../data/favorite-resto-idb';
import { favoriteBtnTemplate, favoritedBtnTemplate } from '../views/templates/resto.templates';

const favoriteBtnInitiator = {
  // eslint-disable-next-line no-shadow
  async init({ favoriteBtnContainer, favoriteRestaurants: favoriteRestoIdb, resto }) {
    this._favoriteBtnContainer = favoriteBtnContainer;
    this._resto = resto;
    this._favoriteRestaurants = favoriteRestoIdb;

    await this._renderBtn();
  },

  async _renderBtn() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  },

  async _isRestoExist(id) {
    const resto = await favoriteRestoIdb.getResto(id);
    return !!resto;
  },

  _renderFavorite() {
    this._favoriteBtnContainer.innerHTML = favoriteBtnTemplate();

    const favoriteBtn = document.querySelector('#favoriteBtn');
    favoriteBtn.addEventListener('click', async () => {
      await favoriteRestoIdb.putResto(this._resto);
      this._renderBtn();
    });
  },

  _renderFavorited() {
    this._favoriteBtnContainer.innerHTML = favoritedBtnTemplate();

    const favoriteBtn = document.querySelector('#favoriteBtn');
    favoriteBtn.addEventListener('click', async () => {
      await favoriteRestoIdb.deleteResto(this._resto.id);
      this._renderBtn();
    });
  },
};

export default favoriteBtnInitiator;
