'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BASE_URL = 'https://api.fixer.io/';

var fetchData = function fetchData(relativeURL) {
  return new Promise(function (resolve, reject) {
    fetch('' + BASE_URL + relativeURL).then(function (response) {
      resolve(response.json());
    });
  });
};

var fetchCurrencies = function fetchCurrencies() {
  return new Promise(function (resolve, reject) {
    fetchData('latest?base=USD').then(function (data) {
      var response = '\n\tLook at all of our supported currencies!\n';
      var currencies = Object.keys(data.rates);
      currencies.push('USD');
      currencies.sort().forEach(function (currency) {
        response += '\n\t- ' + currency;
      });
      resolve(response);
    });
  });
};

var fetchExchangeRate = function fetchExchangeRate(baseSymbol, newSymbol) {
  return new Promise(function (resolve, reject) {
    baseSymbol = baseSymbol.toUpperCase();
    newSymbol = newSymbol.toUpperCase();
    fetchData('latest?base=' + baseSymbol + '&symbols=' + newSymbol).then(function (data) {
      if (data.rates !== undefined) {
        resolve('1.00 ' + baseSymbol + ' = ' + data.rates[newSymbol] + ' ' + newSymbol);
      } else {
        resolve('I\'m sorry, one or more of those currencies is currently not supported. Type "list all currencies" to see all that are available');
      }
    });
  });
};

exports.fetchCurrencies = fetchCurrencies;
exports.fetchExchangeRate = fetchExchangeRate;