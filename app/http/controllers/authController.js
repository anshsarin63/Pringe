const User = require("../../models/user");
function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    },
    cartRegister(req, res) {
      const { name, email, password } = req.body;
      // console.log(req.body);
      if (!name || !email || !password) {
        req.flash('error', 'All fields are required');
        req.flash('name', name);
        req.flash('email', email);
        return res.redirect("/register");
      }

      User.exists({ email: email },(err,result)=>{
        if (result) {
          req.flash('error', 'Already registered');
          req.flash('name', name);
          req.flash('email', email);
          return res.redirect("/register");
        }
        if (result) {
          req.flash("error", "Already registered");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      })

      const user = new User({
        name: name,
        email: email,
        password: password
      });

      user.save().then((user)=>{
        //login
        res.redirect("/");
      }).catch((err)=>{
        req.flash('error', 'Something went wrong');
        res.redirect("/register");
      })
    },
  };
}

module.exports = authController;
