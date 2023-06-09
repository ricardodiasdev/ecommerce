import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongooseConnect";
import { Product } from "@/models/Product";
import mongoose from "mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  mongoose.Promise = clientPromise;

  if (method === "GET") {
    if (req.query?.id) {
      return res.json(await Product.findOne({ _id: req.query.id }));
    }
    res.json(await Product.find());
  }

  if (method === "POST") {
    const { title, description, price } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
    });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, _id } = req.body;
    await Product.updateOne({ _id }, { title, description, price });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
