import express from "express";
import Category from "../models/category.js";

const router = express.Router();

// Creación de categoría (name + slug)
router.post("/", async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({ name, slug });
    await category.save();
    return res.status(201).send({ message: "Categoría creada", category });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

// Listar categorías
router.get("/", async (_req, res) => {
  try {
    const categories = await Category.find().select("_id name slug");
    return res
      .status(200)
      .send({ message: "Todas las categorías", categories });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

//Atletas por categoría
router.get("/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const isId = key.match(/^[0-9a-fA-F]{24}$/);
    const category = isId
      ? await Category.findById(key)
      : await Category.findOne({ slug: key });

    if (!category)
      return res.status(400).send({ message: "Categoría no encontrada" });

    const athletes = await (await import("../models/athletes.js")).default
      .find({ categories: category._id })
      .select("_id name images categories")
      .populate("categories", "name slug");

    return res
      .status(200)
      .send({
        message: "Atletas por categoría",
        category: {
          _id: category._id,
          name: category.name,
          slug: category.slug,
        },
        athletes,
      });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

//Actualizar categorías
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({ message: "Categoría no encontrada" });
    }

    if (name) category.name = name;
    if (slug) category.slug = slug;

    await category.save();

    return res.status(200).send({ message: "Categoría actualizada", category });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});


export default router;
