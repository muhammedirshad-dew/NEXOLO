import jwt from "jsonwebtoken";

const generateToken = (res , userId) =>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY,{
        expiresIn : "30d"
    });

    res.cookie("jwt" , token , {
        maxAge : 30*24*60*1000,
        httpOnly : true, // xss attacks
        sameSite :"strict", //CSRF attacks
        secure : process.env.NODE_ENV !== "development "
    })
}


export default generateToken;
