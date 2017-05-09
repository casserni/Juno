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
    baseSymbol = baseSymbol.toUpperCase()
    newSymbol = newSymbol.toUpperCase()
    fetchData(`latest?base=${baseSymbol}&symbols=${newSymbol}`)
    .then(data => {
      if(data.rates !== undefined) {
        resolve(`1.00 ${baseSymbol} = ${data.rates[newSymbol]} ${newSymbol}`)
      } else {
        resolve(`I'm sorry, one or more of those currencies is currently not supported. Type "list all currencies" to see all that are available`)
      }
    })
  })
}
export { fetchCurrencies, fetchExchangeRate }
