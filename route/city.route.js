const express = require("express");
const { CityModel } = require("../model/city.model");
const cityRoute = express.Router();

cityRoute.get("/", async(req,res)=>{
    try {
        const cities = await CityModel.find();
        res.status(200).send({msg:"All City and their IP adderss", CityandIP : cities})
    } catch (err) {
        res.status(400).send("Something Went wrong")
    }
})
cityRoute.post("/add",async (req,res)=>{
    try {
        const newCity = new  CityModel(req.body)
        await newCity.save();
        res.status(200).send({msg:"new City and IP address has been added",newCity: newCity})
    } catch (err) {
        res.status(400).send("Something Went wrong")
    }
})
cityRoute.patch("/update/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const updatedData = await CityModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).send({msg: "Data has been updated", updatedData : updatedData})
        
    } catch (err) {
        res.status(400).send("Something Went wrong")
    }
})
cityRoute.delete("/delete/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const deletedData = await CityModel.findByIdAndDelete({_id:id});
        res.status(200).send({msg: "Data has been Deleted",DeleteData : deletedData})
    } catch (err) {
        res.status(400).send("Something Went wrong")
    }
})

module.exports = {
    cityRoute
}