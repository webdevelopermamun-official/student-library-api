import bcrypt from "bcryptjs";

/**
 * make hash password
 */
export const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}