import Layout from "@/components/Layout";
import React from "react";

const NewProduct = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <h1>New Product</h1>
        <label>Product name</label>
        <input type="text" placeholder="Product name" />
        <label>Product name</label>
        <textarea placeholder="Description"></textarea>
        <label>Product name</label>
        <input type="text" placeholder="Price" />
      </div>
      <button className="btn-primary">Save</button>
    </Layout>
  );
};

export default NewProduct;
