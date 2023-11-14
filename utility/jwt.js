import jwt from "jsonwebtoken";

// create token
export const createToken = (payload, exp = 86400000) => {
    let newToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: exp});
    return newToken;
}
