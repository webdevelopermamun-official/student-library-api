import { generateSlug } from "../helpers/helpers.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * @DESC Upload A New Book
 * @ROUTE api/v1/book
 * @METHOD POST
 * @ACCESS PRIVATE
 * @param {*} req 
 * @param {*} res 
 */

export const createBook = async(req, res) => {
    try {
        //
        const {bookName, writerName, studentId} = req.body;
        //validation
        if(!bookName || !writerName){
            // validation message
            return res.status(400).send({message: 'All fields Required'})
        }else{
                // create new user and send data
                const book =  await Book.create({ 
                    bookName, writerName, studentId, slug: generateSlug(bookName)})

                // update Student data
                if(studentId){
                    const getId = await User.findById(studentId);
                    await User.findByIdAndUpdate(getId, {
                        $push: {
                            bookId: book._id
                        }
                    })
                };

                // validation message
                return res.status(200).send({message: 'Successfuly Upload new Book'})
        }
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
};

/**
 * @DESC GET ALL Book
 * @ROUTE api/v1/book
 * @METHOD GET
 * @ACCESS PRIVATE
 * @param {*} req 
 * @param {*} res 
 */
export const getAllBook = async (req, res) => {
    try {
        //get all Books
        const books = await Book.find();

        // check Books count
        if (!books || Book.length === 0){
            return res.status(404).json({success: false, message:"No Books Found"});
        }
        res.json({message: "Population data can only be viewed in the single Book view", books})   
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
};


/**
 * @DESC UPDATE BOOK DATA
 * @ROUTE api/v1/update-book/:id
 * @METHOD PUT/PATCH
 * @ACCESS Private
 * @param {*} req 
 * @param {*} res 
 */

export const updatebook = async (req, res) => {
    try {
        // get params
        const {id} = req.params;

        // data distracting
        const {bookName, writerName, studentId} = req.body;

        //update book data
        const updatedBook = await Book.findByIdAndUpdate(id, { bookName, writerName,
            $push: { studentId: studentId }}, {new: true})

        // update student collection with books id
        if(studentId){
            const studenstId = await User.findById(studentId);
            await User.findByIdAndUpdate(studenstId, {
                $push: {
                    bookId: id
                }
            })
        };
        res.status(200).json({ message: "Updated successful",  users: updatedBook })  
        
    } catch (error) {
        return res.status(400).send({message: error.message}); 
    }
}


/**
 * @DESC GET single book
 * @ROUTE api/v1/single-book/:id
 * @METHOD GET
 * @ACCESS PRIVATE
 * @param {*} req 
 * @param {*} res 
 */
export const singlebook = async (req, res) => {
    try {
        //get id from params
        const { id } = req.params;

        //find single book
        const singlebook = await Book.findById(id).populate('studentId');

        // check single book
        if (!singlebook){
            return res.status(404).json({success: false, message:"book data not found"});
        };
        return res.status(200).json({success: true, Books: singlebook});  
        
    } catch (error) {
        return res.status(400).send({message: error.message});        
    }
};


/**
 * @DESC DELETE single book
 * @ROUTE api/v1/delete-book/:id
 * @METHOD DELETE
 * @ACCESS PUBLIC
 * @param {*} req 
 * @param {*} res 
 */
export const deleteBook = async (req, res) => {
    try {

        //get id from params
        const { id } = req.params;

        //find single user
        const data = await Book.findByIdAndDelete(id);

        // check single user
        if (!data){
            return res.status(404).json({success: false, message:"Book data not found"});
        };
        res.json({message: "Data deleted", users: data})
        
    } catch (error) {
        return res.status(400).send({message: error.message}); 
    } 
}