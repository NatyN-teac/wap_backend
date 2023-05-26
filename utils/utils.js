const datastore = require("../models/data");

exports.hasExpired = (time) => {
  const convertedDate = new Date(time);
  const today = new Date(); 

  if(today.getFullYear() === convertedDate.getFullYear()) {
     const daysDifference = Math.abs(today.getDate() - convertedDate.getDate());
       if (daysDifference > 2) return true;
  }
  
  return false;
};

exports.isValid = (req) => {
   try{
  const tokensQuery = req.headers.authorization;
  const tokens = tokensQuery.split(".");
  return (datastore.isAuthenticatedUser(tokens[0].substring(7)) === true) && (!this.hasExpired(tokens[1]) === true)
   }catch {
    throw new Error(`No query parameter found`)
   }
};
