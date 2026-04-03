"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";
import { getProducts, saveProducts } from "@/lib/storage";

export default function Home() {
  const [products, setProducts] = useState(() =>
    typeof window !== "undefined" ? getProducts() : []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light"
  );

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
    toast.success("Product added successfully");
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSelectedProduct(null);
    toast.success("Product updated successfully");
  };

  const deleteProduct = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((prev) => prev.filter((product) => product.id !== productId));

    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }

    toast.success("Product deleted successfully");
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      return name.includes(query) || description.includes(query);
    });
  }, [products, searchTerm]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            padding: "12px 14px",
            fontSize: "14px",
          },
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Product Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
              Add, view, edit, delete, and search products with image URL or
              drag-and-drop upload support.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <>
                <Moon className="h-4 w-4" />
                Dark Mode
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                Light Mode
              </>
            )}
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Total Products
            </p>
            <p className="mt-2 text-2xl font-bold">{products.length}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Search Results
            </p>
            <p className="mt-2 text-2xl font-bold">{filteredProducts.length}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Current Mode
            </p>
            <p className="mt-2 text-2xl font-bold">
              {selectedProduct ? "Editing" : "Adding"}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProductForm
              products={products}
              onAddProduct={addProduct}
              onUpdateProduct={updateProduct}
              selectedProduct={selectedProduct}
              clearSelectedProduct={() => setSelectedProduct(null)}
            />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <ProductList
              products={filteredProducts}
              totalProducts={products.length}
              searchTerm={searchTerm}
              onDeleteProduct={deleteProduct}
              onEditProduct={handleEditProduct}
            />
          </div>
        </div>
      </div>
    </main>
  );
}