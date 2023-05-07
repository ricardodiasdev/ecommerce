import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link href={"/products/new"} className="btn-primary">
        Add new product
      </Link>
      <table className="basic">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>buttons</td>
              </tr>
            ))}
          </tbody>
        </thead>
      </table>
    </Layout>
  );
};

export default Products;
