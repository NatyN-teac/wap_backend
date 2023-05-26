const User = require("../models/user");
const MockData = require("../models/data");

const authenticate = (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).json("username and password required.");
  }
  const newUser = new User(req.body.username, req.body.password);
  const userInDB = MockData.users.find((u) => User.compare(u, newUser));
  if (userInDB) {
    const currentDate = new Date().toJSON();
    const token = `${newUser.username}.${currentDate}`;
   
    res.status(200).json({ token });
  } else {
    res.status(403).json({ message: "Wrong credential,please try again!" });
  }
};

module.exports = { authenticate };
