import mongoose from "mongoose";

// create Student mode
const BookSchema = mongoose.Schema({
    bookName: { 
        type: String,
        trim: true,
        required: true,
    },
    slug: { 
        type: String,
        trim: true,
    },
    writerName: { 
        type: String,
        trim: true,
    },
    studentId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    status: {
        type: Boolean,
        default: true
    }

})

// export
export default mongoose.model("Book", BookSchema);