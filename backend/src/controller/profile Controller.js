const express = require("express");
const jwt = require("jsonwebtoken");
const Products = require("../models/profile")

require("dotenv").config()

const router = express.Router();

// UPdating Profile

router.patch("/profile/:id", async (req, res) => {
    try {

        if (!req.headers.token) {
            return res.status(500).send("Please enter a token");
        }
        const decode = jwt.verify(req.headers.token, "HashIt")

        if (!decode) {
            return res.status(500).send("Wrong Crediential")
        }

        const User = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean.exec()
        if (User) { return res.status(200).send(User) }
        else {
            return res.status(500).send("User Not Found");
        }
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
})




router.post("/Creatingprofile", async (req, res) => {
    try {

        if (!req.headers.token) {
            return res.status(500).send("Please enter a token");
        }

        const decode = jwt.verify(req.headers.token, "HashIt");

        if (!decode) {
            return res.status(500).send("Wrong Crediential")
        }

        let profile = await Products.create(req.body)
        return res.status(200).send(profile)


    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
})

router.get("/allProfile", async (req, res) => {
    try {
        if (!req.headers.token) {
            return res.status(500).send("Please enter a token");
        }

        const decode = jwt.verify(req.headers.token, "HashIt");

        if (!decode) {
            return res.status(500).send("Wrong Crediential")
        }

        let profile = await Products.find()
        return res.status(200).send(profile)

    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
})



module.exports = router