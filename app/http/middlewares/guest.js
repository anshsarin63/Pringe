var express = require("express");
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    return next();
}

module.exports = isLoggedIn;