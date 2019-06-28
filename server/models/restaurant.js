const mongoose = require("mongoose");
const ReviewSchema = require('./review'); 

const RestaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: [true, "Restaurant Name is required"],
        minlength: [3, "Restaurant Name must be aleast 3 characters or longer"]
    },
    crusine: {
        type: String,
        required: [true, "Crusine is required"],
        minlength: [3, "Crusine must be atleast 3 characters or longer"]
    },
    reviews: [ ReviewSchema ]
}, {timestamps: true});

mongoose.model("Restaurant", RestaurantSchema);