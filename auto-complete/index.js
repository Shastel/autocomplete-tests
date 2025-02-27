function createAutoComplete(arrData) {
  return function(queryStr) {
    let res;
    if (queryStr === "") {
        res = [];
    } else {
        const lowerQueryStr = queryStr.toLowerCase();
        res = arrData.filter((item) => item.toLowerCase().startsWith(lowerQueryStr));
    }
    return res;
  }
}

module.exports = {createAutoComplete};

const data = ["java", "php", "javascript", "python"];
const autocomplete = createAutoComplete(data);
console.log(autocomplete("mongo"));