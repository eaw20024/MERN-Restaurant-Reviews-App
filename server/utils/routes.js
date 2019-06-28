const Restaurants = require('../controllers/restaurants');

module.exports = (app) => {
    app.get("/api/restaurants", Restaurants.getAll);
    app.post("/api/restaurants", Restaurants.create);
    app.get("/api/restaurants/:_id", Restaurants.getOne);
    app.post("/api/reviews/:_id", Restaurants.review);
    app.put("/api/restaurants/:_id", Restaurants.update);
    app.delete("/api/restaurants/:_id", Restaurants.delete);
}