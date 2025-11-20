import mongoose from "mongoose";
import express from "express";
const router = express.Router();
import Favorite from "../models/favorite.js";

router.post("/", async (req, res) => {
  try {
    const { order, favorites } = req.body;

    const newFavorite = new Favorite({
      user: order, // name, surname, email
      athletes: favorites.map(f => ({
        id: f._id ? new mongoose.Types.ObjectId(f._id) : new mongoose.Types.ObjectId(),
        name: f.athlete,
        image: f.image,
        discipline: f.disciplineName || f.disciplineImg || "Sin disciplina", // poner nombre real
      })),
    });

    await newFavorite.save();
    return res.status(200).send({ message: "Favoritos guardados", newFavorite });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Hubo un error", error: error.message });
  }
});

export default router;
