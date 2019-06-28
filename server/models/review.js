const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "Customer name is required"],
        minlength: [2, "Customer name must be 2 characters or longer"]
    },
    reviewDescription: {
        type: String,
        required: [true, "Review Description is required"],
        minlength: [10, "Review Description must be 10 characters or longer"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    }
}, {timestamps: true});

mongoose.model("Review", ReviewSchema);

module.exports = ReviewSchema;