var express = require("express");
function isLoggedIn(res, req, next) {
  if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    return next();
}

module.exports = isLoggedIn;