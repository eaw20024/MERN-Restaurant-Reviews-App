const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const Review = mongoose.model("Review");

class Restaurants {
    getAll(req, res){
        Restaurant.find({}, (err, restaurants) => {
            if(err) { console.log(err); }
            res.json({status: 200, restaurants: restaurants});
        });
    }

    getOne(req, res){
        Restaurant.findOne({_id: req.params._id}, (err, restaurant) => {
            if(err) { console.log(err); }
            res.json({status: 200, restaurant: restaurant});
        });
    }

    review(req, res){
        let r = new Review(req.body);
        r.save( err => {
            if(err) {
                res.json({status: 200, errors: err});
            } else {
                Restaurant.findOneAndUpdate({_id: req.params._id}, {$push: {reviews: r}}, err => {
                    if(err) {
                        res.json({status: 200, errors: err});
                    } else {
                        res.json({status: 200});
                    }
                });
            }
        });
    }

    update(req, res){
        Restaurant.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true}, err => {
            if(err) {
                res.json({status: 200, errors: err});
            } else {
                res.json({status: 200});
            }
        });
    }

    create(req, res){
        // Shows restaurant Object in console
        // console.log(req.body)
        let r = new Restaurant(req.body);
        r.save( err => {
            if(err) {
                res.json({status: 200, errors: err});
            } else {
                res.json({status: 200});
            }
        });
    }

    delete(req, res){
        Restaurant.findOneAndDelete({_id: req.params._id}, err => {
            if(err) { console.log(err); }
            res.json({status: 200});
        });
    }
}

module.exports = new Restaurants();