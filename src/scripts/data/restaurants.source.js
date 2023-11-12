import API_ENDPOINT from '../globals/api-endpoint';

class restaurantsSource {
  static async Home() {
    const loader = document.querySelector('.loading');
    try {
      const response = await fetch(API_ENDPOINT.HOME, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseJson = await response.json();

      setTimeout(() => {
        loader.classList.add('loading-hidden');
      }, 2000);

      return responseJson.restaurants;
    } catch (error) {
      console.error('Error while fetching data:', error);

      setTimeout(() => {
        loader.classList.add('loading-hidden');
        const errorElement = document.querySelector('error-element');
        errorElement.style.display = 'block';
      }, 2000);
    }
  }

  static async detailResto(id) {
    const loader = document.querySelector('.loading');
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id), {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseJson = await response.json();

      setTimeout(() => {
        loader.classList.add('loading-hidden');
      }, 2000);

      return responseJson;
    } catch (error) {
      console.error('Error while fetching data:', error);

      setTimeout(() => {
        loader.classList.add('loading-hidden');
        const errorElement = document.querySelector('error-element');
        errorElement.style.display = 'block';
      }, 2000);
    }
  }
}

export default restaurantsSource;
