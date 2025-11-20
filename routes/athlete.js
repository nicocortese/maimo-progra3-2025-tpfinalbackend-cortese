import express from "express";
const router = express.Router();
import Athlete from "../models/athletes.js";

const findAllAthletes = async (req, res) => {
  try {
    const athletes = await Athlete.find().select("_id name image discipline categories");
    return res
      .status(200)
      .send({ message: "Todos los atletas", athletes: athletes });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const findOneAthlete = async (req, res) => {
  const { id } = req.params;
  try {
    const athlete = await Athlete.findOne({ _id: id }).populate("categories", "name slug image")
    .populate("categories", "name slug image");
    return res.status(200).send({ message: "Atleta encontrado", athlete });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const addAthlete = async (req, res) => {
  const { name, country, discipline, image, medals, history, categories } = req.body;
  try {
    const athlete = new Athlete({ name, country, discipline, image, medals, history, categories });
    await athlete.save();
    return res.status(200).send({ message: "Atleta agregado", athlete });
  } catch (error) {
    console.log("ERROR EN addAthlete:", error); 
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const deleteAthlete = async (req, res) => {
  const { id } = req.params;
  try {
    const athleteToDelete = await Athlete.findOne({ _id: id });
    if (!athleteToDelete) {
      return res.status(404).send({ message: "No existe el atleta", id: id });
    }
    await Athlete.deleteOne({ _id: id });
    return res
      .status(200)
      .send({ message: "Atleta borrado", athlete: athleteToDelete });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

const updateAthlete = async (req, res) => {
  const { id } = req.params;
  const { name, country, discipline, image, medals, history, categories } = req.body;
  try {
    const athleteToUpdate = await Athlete.findOne({ _id: id });
    if (!athleteToUpdate) {
      return res.status(404).send({ message: "No está ese atleta", id: id });
    }
    if (name) {
      athleteToUpdate.name = name;
    }
    if (country) {
      athleteToUpdate.country = country;
    }
    if (discipline) {
      athleteToUpdate.discipline = discipline;
    }

    if ( image ) {
      athleteToUpdate.image = image;
    }

    if (medals) {
      athleteToUpdate.medals = medals;
    }
     if (history) {
      athleteToUpdate.history = history;
    }

    if (categories) {
      athleteToUpdate.categories = categories;
    }

    await athleteToUpdate.save();
    return res
      .status(200)
      .send({ message: "Atleta actualizado", athlete: athleteToUpdate });
  } catch (error) {
    return res.status(501).send({ message: "Hubo un error", error });
  }
};

//CRUD endpoints
router.get("/", findAllAthletes);
router.get("/:id", findOneAthlete);
router.post("/", addAthlete);
router.delete("/:id", deleteAthlete);
router.put("/:id", updateAthlete);
export default router;
