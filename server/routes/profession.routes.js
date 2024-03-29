const express = require("express");
const Profession = require("../models/Profession");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Profession.find();
        res.status(200).json(list);
    } catch (e) {
        res.status(500).send({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

module.exports = router;
