export const resolvers = {
  Query: {
    currencies: () => {
      return new Promise((resolve, reject) => {
        fetch('https://api.fixer.io/latest?base=USD')
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} ($response.statusText)`,
              error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => {
          resolve(response.json());
        })
        .catch(error => reject(Error(`Error in fetch: ${error.message}`)));
      })
      .then(data => {
          let currencies = Object.keys(data.rates)
          currencies.push('USD')
          return currencies.sort()
      });
    },
  },
};
