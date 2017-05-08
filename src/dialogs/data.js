const BASE_URL = 'https://api.fixer.io/'

let fetchData = (relativeURL) =>{
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${relativeURL}`)
    .then(response => {
      resolve(response.json());
    })
  })
}

let fetchCurrencies = () => {
  return new Promise((resolve, reject)=>{
    fetchData('latest?base=USD')
    .then(data => {
      let response = `\n\tLook at all of our supported currencies!\n`
      let currencies = Object.keys(data.rates)
      currencies.push('USD')
      currencies.sort().forEach((currency)=>{
        response += `\n\t- ${currency}`
      })
      resolve(response)
    })
  });
}

let fetchExchangeRate = (baseSymbol, newSymbol) => {
  return new Promise((resolve, reject) => {
    fetchData(`latest?base=${baseSymbol}&symbols=${newSymbol}`)
    .then(data => {
      resolve(data.rates[newSymbol].toString())
    })
  })
}
export { fetchCurrencies, fetchExchangeRate }
