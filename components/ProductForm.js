import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React, { useState } from "react";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const route = useRouter();

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id }).then(() => {
        toast.success("Product updated!");
        route.push("/products");
      });
    } else {
      //create
      await axios.post("/api/products", data).then(() => {
        toast.success("Product created!");
        route.push("/products");
      });
    }
  };

  const uploadImage = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for(const file of files) {
        data.append("files", file);
      }
      const res = await axios.post("/api/upload", data, {
        headers: {"Content-Type":"multipart/form-data"}
      });
      console.log(res.data);
    }
  };

  return (
    <form onSubmit={saveProduct}>
      <div className="flex flex-col">
        <label>Product name</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Photos</label>
        <div className="mb-2">
          <label
            className="
              w-24 
              h-24 
              flex 
              flex-col 
              items-center 
              justify-center
               text-gray-500
               bg-gray-200
               rounded-lg
               cursor-pointer
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Upload</div>
            <input type="file" className="hidden" onChange={uploadImage} />
          </label>
          {!images?.length && <div>No photos in this product.</div>}
        </div>
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
