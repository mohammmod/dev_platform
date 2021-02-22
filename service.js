function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

var Person = function (name) {
    this._name = name;
};

module.exports = {
    insert
  }