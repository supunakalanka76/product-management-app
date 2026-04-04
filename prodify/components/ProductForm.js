"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImagePlus, Info, Upload, X } from "lucide-react";
import Image from "next/image";

const initialFormData = {
  name: "",
  price: "",
  description: "",
  image: "",
};

export default function ProductForm({
  products,
  onAddProduct,
  onUpdateProduct,
  selectedProduct,
  clearSelectedProduct,
}) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const nextFormData = selectedProduct
      ? {
          name: selectedProduct.name || "",
          price: selectedProduct.price?.toString() || "",
          description: selectedProduct.description || "",
          image: selectedProduct.image || "",
        }
      : initialFormData;

    queueMicrotask(() => {
      if (!isCancelled) {
        setFormData(nextFormData);
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    return () => {
      isCancelled = true;
    };
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidImageUrl = (value) => {
    if (!value) return true;
    if (value.startsWith("data:image")) return true;

    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol);
    } catch {
      return false;
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB");
      return;
    }

    try {
      const base64Image = await convertFileToBase64(file);

      setFormData((prev) => ({
        ...prev,
        image: base64Image,
      }));

      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Failed to process image");
    }
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files?.[0];
    await handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    await handleFile(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    clearSelectedProduct();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedPrice = formData.price.trim();
    const trimmedDescription = formData.description.trim();
    const trimmedImage = formData.image.trim();

    if (!trimmedName || !trimmedPrice) {
      toast.error("Product name and price are required");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("Product name must be at least 2 characters");
      return;
    }

    if (trimmedName.length > 80) {
      toast.error("Product name must be under 80 characters");
      return;
    }

    const parsedPrice = Number(trimmedPrice);

    if (Number.isNaN(parsedPrice)) {
      toast.error("Price must be a valid number");
      return;
    }

    if (parsedPrice <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (parsedPrice > 10000000) {
      toast.error("Price is too large");
      return;
    }

    if (trimmedDescription.length > 300) {
      toast.error("Description must be under 300 characters");
      return;
    }

    if (trimmedImage && !isValidImageUrl(trimmedImage)) {
      toast.error("Please enter a valid image URL");
      return;
    }

    const duplicateProduct = products.find((product) => {
      const sameName =
        product.name.trim().toLowerCase() === trimmedName.toLowerCase();
      const differentId = selectedProduct ? product.id !== selectedProduct.id : true;
      return sameName && differentId;
    });

    if (duplicateProduct) {
      toast.error("A product with this name already exists");
      return;
    }

    const productData = {
      id: selectedProduct ? selectedProduct.id : Date.now(),
      name: trimmedName,
      price: parsedPrice,
      description: trimmedDescription,
      image: trimmedImage,
    };

    if (selectedProduct) {
      onUpdateProduct(productData);
    } else {
      onAddProduct(productData);
    }

    resetForm();
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {selectedProduct
            ? "Update the selected product details."
            : "Create a new product with pricing, description, and image support."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500 dark:focus:ring-gray-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter product price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500 dark:focus:ring-gray-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500 dark:focus:ring-gray-800"
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {formData.description.trim().length}/300 characters
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Paste image URL"
            value={formData.image.startsWith("data:image") ? "" : formData.image}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500 dark:focus:ring-gray-800"
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Use a direct image link or upload an image below.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Image
          </label>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-3xl border-2 border-dashed p-6 text-center transition ${
              isDragging
                ? "border-black bg-gray-100 dark:border-white dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mb-3 rounded-full bg-white p-3 shadow-sm dark:bg-gray-900">
                <Upload className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Drag & drop an image here
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                or click to choose a file
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Max file size: 2MB
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>

        {formData.image && (
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Image Preview
                </span>
              </div>

              <button
                type="button"
                onClick={removeImage}
                className="rounded-full p-1 text-gray-500 transition hover:bg-white hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <X className="h-4 w-4 cursor-pointer" />
              </button>
            </div>

            <Image
                src={formData.image}
                alt="Preview"
                className="h-48 w-full rounded-2xl object-cover"
                width={400}
                height={192}
            />
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Product data is stored in browser localStorage. Uploaded images are
              saved as base64 strings, so avoid using very large files.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-2xl bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer"
          >
            {selectedProduct ? "Update Product" : "Add Product"}
          </button>

          {selectedProduct && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}