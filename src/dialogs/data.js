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
      let response = ``
      let currencies = Object.keys(data.rates)
      currencies.push('USD')
      currencies.sort().forEach((currency)=>{
        response += `- ${currency}\n`
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
