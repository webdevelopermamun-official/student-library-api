import mongoose from "mongoose";

// create Student mode
const UserSchema = mongoose.Schema({
    name: { 
        type: String,
        trim: true,
        required: true,
    },
    slug: { 
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    bookId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Book",
        default: []
    },
    accessToken: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }

})

// export
export default mongoose.model("User", UserSchema);