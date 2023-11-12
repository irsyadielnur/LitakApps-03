import favoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';
import * as TestFactories from './helpers/testFactories';

describe('Favorite A Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = `<div id="favoriteBtnContainer"></div>`;
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the movie has not been liked before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unfavorite restaurant"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#favoriteBtn').dispatchEvent(new Event('click'));

    const resto = await favoriteRestoIdb.getResto(1);
    expect(resto).toEqual({ id: 1 });

    await favoriteRestoIdb.deleteResto(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    await favoriteRestoIdb.putResto({ id: 1 });
    document.querySelector('#favoriteBtn').dispatchEvent(new Event('click'));

    expect(await favoriteRestoIdb.getAllResto()).toEqual([{ id: 1 }]);
    await favoriteRestoIdb.deleteResto(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({});

    document.querySelector('#favoriteBtn').dispatchEvent(new Event('click'));
    expect(await favoriteRestoIdb.getAllResto()).toEqual([]);
  });
});
