import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

app.listen(3000, () => console.log("Server running"));



router.post("/", async (req, res) => {
  try {
    const { title, price, stock } = req.body;

    if (!title || price < 0 || stock < 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const product = await Product.create({ title, price, stock });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const { title, price, stock } = req.body;

    if (price < 0 || stock < 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, stock },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/out/of/stock", async (req, res) => {
  try {
    const products = await Product.find({ stock: 0 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
