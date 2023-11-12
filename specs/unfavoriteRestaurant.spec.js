import favoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';
import * as TestFactories from './helpers/testFactories';

describe('UnFavorite a Restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = `<div id="favoriteBtnContainer"></div>`;
  };

  beforeEach(async () => {
    addFavoriteButtonContainer();
    await favoriteRestoIdb.putResto({ id: 1 });
  });

  afterEach(async () => {
    await favoriteRestoIdb.deleteResto(1);
  });

  it('should display unfavorite widget when the restaurant has been favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unfavorite restaurant"]')).toBeTruthy();
  });

  it('should not display favorite widget when the restaurant has been favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove liked movie from the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('[aria-label="unfavorite restaurant"]').dispatchEvent(new Event('click'));
    expect(await favoriteRestoIdb.getAllResto()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked movie is not in the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    await favoriteRestoIdb.deleteResto(1);

    document.querySelector('[aria-label="unfavorite restaurant"]').dispatchEvent(new Event('click'));
    expect(await favoriteRestoIdb.getAllResto()).toEqual([]);
  });
});
