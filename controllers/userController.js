import User from "../models/User.js";
import Book from "../models/Book.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashPass } from "../utility/hashString.js";
import { createToken } from "../utility/jwt.js";
import { accountActivationMail } from "../utility/mail.js";
import { generateSlug } from "../helpers/helpers.js";

/**
 * @DESC REGISTER NEW STUDENT
 * @ROUTE api/v1/register
 * @METHOD POST
 * @ACCESS PUBLIC
 * @param {*} req 
 * @param {*} res 
 */

export const registerUser = async(req, res) => {

    try {
        const {name, email, password, age, location, gender, bookId} = req.body;

        //validation
        if(!name || !email || !password || !age || !location || !gender){
            // validation message
            return res.status(400).send({message: 'Please enter all fields'})
        }else{

            // email check form database
            const isEmail = await User.findOne().where('email').equals(email);

            if(isEmail){

                // validation message
                return res.status(400).send({message: 'This Email already exists!'})

            }else{

                // create new user and send data
                const user =  await User.create({name, email, age, location, gender,
                    bookId , password : hashPass(password), slug: generateSlug(name)
                });

                // Update book field data
                if(bookId){
                    // Find books collactions data
                    const booksId = await Book.findById(bookId);
                    // update books collection with student id
                    await Book.findByIdAndUpdate(booksId, {
                        $push: {
                            studentId: user._id
                        }
                    })
                };
                
                // Account activation link
                const token = createToken({id: user._id},(1000*60*60*24*3))
                const activationUrl = `${process.env.APP_URL}:${process.env.PORT}/api/v1/activate/${token}`
                
                //send email
                accountActivationMail(email, { name, email, link: activationUrl });
                // validation message
                return res.status(200).send({message: 'successful register User - check your email to Verify Now'})
            };
        }
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
};

/**
 * @DESC Email Confirmation
 * @ROUTE activate/:token
 * @METHOD GET
 * @ACCESS PUBLIC
 * @param {*} req 
 * @param {*} res 
 */

export const userAccountActive = async(req,res) => {
  try {
    const {token} = req.params;

    // verify token
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);

    if(!tokenVerify){
        // Redirect page
        res.render('unverify');
        return res.status(404).send({message: 'Invalid Token! Please Try Again Later'});
    }else{

        let userData = await User.findOne({'_id': tokenVerify.id});
        // Checking the status of the user
        if(userData.isActive == true){
            res.render('active')
            return res.status(400).send({message: 'Account Already Activate'})
        }else{
            // Update the user data
            await User.findByIdAndUpdate(tokenVerify.id, {
                isActive: true                
            })
            res.render('verify')
            return res.status(200).send({message: 'Activation Successful! You can now login with your account.'})
        }
    }
  } catch (error) {
  }
}

/**
 * @DESC LOGIN STUDENT
 * @ROUTE api/v1/login
 * @METHOD POST
 * @ACCESS PUBLIC
 * @param {*} req 
 * @param {*} res 
 */

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        //validation
        if(!email || !password){
            // validation message
            return res.status(400).send({message: 'Please enter Email And Password'})
        }else{

            // email check form database
            const loginUser = await User.findOne().where('email').equals(email);

            if (!loginUser) {
                // validation message
                return res.status(404).send({message: 'Email not found in our database'})
            }else{
                // compare hashed password with input password
                const userPass = bcrypt.compareSync(password , loginUser.password);
                
                if(!userPass) {
                    // validation message
                    return res.status(404).send({message: 'Password is incorrect'});
                }else{

                    if(!loginUser.isActive){
                        // validation message
                        return res.status(400).send({message: 'Pleace Activate Your Account'})
                    }else{
                        // login user token
                        const token = createToken({id: loginUser._id}, (1000*60*60*24*365))
                        res.cookie('studentToken', token);
                        return res.status(200).send({message: 'Login Succefully'})
                    }
                };
            };
        };
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
};

/**
 * @DESC GET ALL STUDENT
 * @ROUTE api/v1/all-sutudent
 * @METHOD GET
 * @ACCESS PRIVATE
 * @param {*} req 
 * @param {*} res 
 */
export const getAllStudent = async (req, res) => {
    try {
        //get all user
        const users = await User.find();
        
        // check user count
        if (!users || users.length === 0){
            return res.status(404).json({success: false, message:"No Users Found"});
        }
        res.json({message: "Population data can only be viewed in the single student view", users}) ;
        
    } catch (error) {
        return res.status(400).send({message: error.message});
    }

  
}

/**
 * @DESC GET single USER
 * @ROUTE api/v1/single-sutudent/:id
 * @METHOD GET
 * @ACCESS PRIVATE
 * @param {*} req 
 * @param {*} res 
 */
export const singleUser = async (req, res) => {
    try {
        //get id from params
        const { id } = req.params;

        //find single user
        const singleUser = await User.findById(id).populate('bookId');

        // check single user
        if (!singleUser){
            return res.status(404).json({success: false, message:"User data not found"});
        };
        return res.status(200).json({success: true, users: singleUser});  
        
    } catch (error) {
        return res.status(400).send({message: error.message});        
    }
};


/**
 * @DESC DELETE single student
 * @ROUTE api/v1/delete-sutudent/:id
 * @METHOD DELETE
 * @ACCESS PUBLIC
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUser = async (req, res) => {
    try {

        //get id from params
        const { id } = req.params;

        //find single user
        const data = await User.findByIdAndDelete(id);

        // check single user
        if (!data){
            return res.status(404).json({success: false, message:"User data not found"});
        };
        res.json({message: "Data deleted", users: data})
        
    } catch (error) {
        return res.status(400).send({message: error.message}); 
    } 
}

/**
 * @DESC UPDATE STUDENT DATA
 * @ROUTE api/v1/update/:id
 * @METHOD PUT/PATCH
 * @ACCESS Private
 * @param {*} req 
 * @param {*} res 
 */

export const updateUser = async (req, res) => {
    try {
        // get params
        const {id} = req.params;

        // data distracting
        const {name, email, age, location, gender, bookId} = req.body;

        // password
        if(req.body.password){
            return res.status(400).json({success: false, error: "You can't change password"});
        }

        // validate
        if(!name || !email){
            return res.status(400).json({success: false, error: 'Please provide name and email'});
        }

        //update user data useing id
        const data = await User.findByIdAndUpdate(id, { name, email, age, location,gender, slug: generateSlug(name), $push: { bookId: bookId }}, { new: true })

        // update books collection with student id
        if(bookId){
            const booksId = await Book.findById(bookId);
            await Book.findByIdAndUpdate(booksId, {
                $push: {
                    studentId: id
                }
            })
        };

        res.status(200).json({ message: "Updated successful",  users: data }) 
        
    } catch (error) {
        return res.status(400).send({message: error.message}); 
    }
}

/**
 * @DESC Logout student
 * @ROUTE api/v1/logout
 * @METHOD POST
 * @ACCESS PUBLIC
 * @param {*} req 
 * @param {*} res 
 */

export const logoutUser = async(req, res) => {
    try {
        res.clearCookie('studentToken');
        return res.status(200).send({message: 'Logged out successfully'})
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
};