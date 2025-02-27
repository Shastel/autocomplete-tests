function createAutoComplete(arrData) {
  return function(queryStr) {
    let res;
    if (queryStr === "" || queryStr === undefined) {
        res = [];
    } else {
        const lowerQueryStr = queryStr.toLowerCase();
        res = arrData.filter((item) => item.toLowerCase().startsWith(lowerQueryStr));
    }
    return res;
  }
}

module.exports = {createAutoComplete};
