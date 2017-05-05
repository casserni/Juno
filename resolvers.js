const BASE_URL = 'https://api.fixer.io/'

let fetchData = (relativeURL) =>{
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${relativeURL}`)
    .then(response => {
      resolve(response.json());
    })
  })
}

export const resolvers = {
  Query: {
    currencies: () => {
      return new Promise((resolve, reject)=>{
        fetchData('latest?base=USD')
        .then(data => {
          let currencies = Object.keys(data.rates)
          currencies.push('USD')
          resolve(currencies.sort())
        })
      });
    },
    rate: () => {
      return new Promise((resolve, reject)=> {
        fetchData(`latest?base=USD&symbols=EUR`)
        .then(data => {
          resolve(data.rates['EUR'])
        })
      })
    }
  },
};
