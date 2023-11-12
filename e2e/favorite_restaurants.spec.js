const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('favorite one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.resto-card a');
  const firstRestaurantCard = locate('.resto-card a').first();
  const firstRestaurantCardBtn = await I.grabTextFrom(firstRestaurantCard);
  I.click(firstRestaurantCard);

  I.seeElement('#favoriteBtn');
  I.click('#favoriteBtn');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-card');

  const favoritedCardBtn = await I.grabTextFrom('.resto-card a');
  assert.strictEqual(firstRestaurantCardBtn, favoritedCardBtn);
});

Scenario('unfavorite one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.resto-card a');
  const firstCardRestaurant = locate('.resto-card a').first();
  const firstCardRestaurantBtn = await I.grabTextFrom(firstCardRestaurant);
  I.click(firstCardRestaurant);

  I.seeElement('#favoriteBtn');
  I.click('#favoriteBtn');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-card');
  const favoritedRestaurantBtn = await I.grabTextFrom('.resto-card a');

  assert.strictEqual(firstCardRestaurantBtn, favoritedRestaurantBtn);

  I.seeElement('.resto-card');
  const likedCardTitle = await I.grabTextFrom('.resto-card a');
  I.click(likedCardTitle);

  I.seeElement('#favoriteBtn');
  I.click('#favoriteBtn');

  I.amOnPage('/#/favorite');
  I.seeElement('#fav-resto');
});
