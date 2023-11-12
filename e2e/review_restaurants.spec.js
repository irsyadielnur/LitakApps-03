const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Post restaurant review', async ({ I }) => {
  I.seeElement('.resto-card');
  I.click(locate('.resto-card a').first());

  I.seeElement('#review-form');
  I.fillField('#add-name', 'test review');
  I.fillField('#add-review', 'Lamak Bana');
  I.click('#add-submit');

  const lastReview = locate('.isi-review').last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  assert.strictEqual('"Lamak Bana"', lastReviewText.trim());
});
