const  bcrypt =  require("bcrypt");
const  jwt =  require("jsonwebtoken");
const  User =  require("../Models/User.js");
const express =  require("express") ;
const router =  express.Router() ;  

//registration . 
const register = async (req, res) => {
    try {
      const {
        Name,
        email,
        password,
        Age,
        MovieList ,
      } = req.body;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
        Name,
        email,
        password: passwordHash,
        Age,
        MovieList ,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  //login 
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " })
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({token, user});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

router.post("/register",register) ; 
router.post("/login", login);

module.exports = router ; 