const User = require("./user");
const Product = require("./product");
exports.users = [
    new User('johnsmith','123456'),
    new User('user@unique','111232'),
    new User('nateuse','123456'),
    new User('manueljona','098765'),
]
exports.isAuthenticatedUser = (username) => {
    let user = this.users.find((u) => u.username === username);
    return user !== undefined;
}
exports.myCart = [];
exports.products = [
  new Product(1, "Apple", 2, "apple.jpeg", 10),
  new Product(2, "Mango", 1.5, "mango.jpeg", 15),
  new Product(3, "Orange", 4, "orange.jpeg", 8),
];

