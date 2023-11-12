import favoriteBtnInitiator from '../../src/scripts/utils/favorite-btn-initiator';
import favoriteRestoIdb from '../../src/scripts/data/favorite-resto-idb';

const createFavoriteButtonPresenterWithRestaurant = async (resto) => {
  await favoriteBtnInitiator.init({
    favoriteBtnContainer: document.querySelector('#favoriteBtnContainer'),
    favoriteRestaurants: favoriteRestoIdb,
    resto,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createFavoriteButtonPresenterWithRestaurant };
