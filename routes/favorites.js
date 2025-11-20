import express from "express";
const router = express.Router();
import Favorite from "../models/favorite.js";

router.post("/", async (req, res) => {
    try {
        const { user, athlete, image, discipline} = req.body;
        const favorite = new favorite({
            user,
            athlete,
            image,
            discipline
        });
        await favorite.save();
        return res.status(200).send({ message: "Favorito guardado", favorite})
    } catch (error) {
        return res.status(500).send({
            message: "Hubo un error", error
        })
    }
})

export default router;