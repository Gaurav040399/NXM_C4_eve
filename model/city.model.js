const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
    ip : {type:String, require:true},
    name : {type:String, require:true},
})

const CityModel = mongoose.model("city",citySchema)

module.exports = {
    CityModel
}