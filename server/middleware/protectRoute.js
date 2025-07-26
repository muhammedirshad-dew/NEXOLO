import jwt from "jsonwebtoken"

const protectRoute = async (req , res ,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({error : "Unauthorized: No token Provided "})
        }

        const decoded = jwt.verify(token , process.env.)
    } catch (error) {
        console.log(`Error in protectRoute middleware: ${error}`)
        res.status(500).json({error : "Internal server error"})
    }
}

export default protectRoute;