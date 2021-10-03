const getConvertedCurrencyName = (currencyName, flag) => {
  const result = currencyName.split('/');
  if (flag === true) {
    return result[0];
  } return result[1];
};

export default getConvertedCurrencyName;
