const usermodel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

//signin token
exports.sendtoken = (user,statusCode,res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};

//Register
exports.registerController = async (req,res,next) => { 
    try {
        const { username, email, password } = req.body;
        //existing user
        if (existingEmail) {
            return next(new errorResponse('Email already registered',500))
        }
        const user = await userModel.create({ username, email, password })
        this.sendtoken(user,201,res)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//login
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return next(new errorResponse('Please provide email or password'))
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return next(new errorResponse("Invalid Credentials", 401))
        }
        const isMatch = await userModel.matchPassword(password)
        if (!isMatch) {
            return next(new errorHandler("Invalid Credentials", 401))
        }
        //res
        this.sendtoken(user, 200, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//Logout
exports.logoutController = async (req,res) => {
    res.clearCookie("refreshToken")
    return res.status(200).json({
        success: true,
        message:"Logged out Successfully"
    })
};
