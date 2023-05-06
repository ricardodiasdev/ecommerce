import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

const Products = () => {
  return (
    <Layout>
      <Link 
        href={'/products/new'}
        className="btn-primary"
      >
        Add new product
      </Link>
    </Layout>
  );
};

export default Products;
