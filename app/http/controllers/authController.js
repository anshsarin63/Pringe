const passport = require("passport");
const User = require("../../models/user");
function authController() {
  return {
    async login(req, res) {
      await res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    },
    cartRegister(req, res) {
      const { name, email, password } = req.body;
      // console.log(req.body);
      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Already registered");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
        if (result) {
          req.flash("error", "Already registered");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      const user = new User({
        name: name,
        email: email,
        password: password,
      });

      user
        .save()
        .then((user) => {
          //login
          res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          res.redirect("/register");
        });
    },
    postLogin(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user,(err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect("/");
        });
      })(req, res, next);
    },
    async logout(req, res) {
      await req.logout();
      return res.redirect("/login");
    }
  };
}

module.exports = authController;
