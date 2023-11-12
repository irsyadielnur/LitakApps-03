import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';
import favoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await favoriteRestoIdb.getAllResto()).forEach(async (resto) => {
      await favoriteRestoIdb.deleteResto(resto.id);
    });
  });

  itActsAsFavoriteRestaurantModel(favoriteRestoIdb);
});
