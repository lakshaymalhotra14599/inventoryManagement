import superagent from 'superagent';

const BASE_URL_GET = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com';

export const request = {
  get: (url?: string) => {
    return superagent
      .get(`${BASE_URL_GET}${url}`)
      .set('Accept', 'application/json') 
      .then((response) => response.body) 
      .catch((err) => {
        throw new Error(err.message || 'Failed to fetch data');
      });
  },

};
