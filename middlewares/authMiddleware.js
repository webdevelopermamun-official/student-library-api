import jwt from 'jsonwebtoken'
import User from "../models/User.js";

// auth redirect
export const authMiddleware = async (req, res, next) => {

   try {
        const token = req.cookies.studentToken;
        if(token){
            // verify token
            const tokenCheck =  jwt.verify(token, process.env.JWT_SECRET);

            if(tokenCheck){
                const userData = await User.findById(tokenCheck.id)
                if(userData){
                    next()
                }else{
                    res.clearCookie('studentToken');
                    return res.status(404).send({message: 'Token User Data Not Found'})
                }
            }
        }else{
            res.clearCookie('studentToken');
            return res.status(400).send({message: 'You are Not Allowed Please Login now'})
        }
    
   } catch (error) {
        return res.status(401).send({message: 'Token Not Found'})
   }
}