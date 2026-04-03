import ProductCard from "./ProductCard";

export default function ProductList({
  products,
  totalProducts,
  searchTerm,
  onDeleteProduct,
  onEditProduct,
}) {
  const hasSearch = searchTerm.trim().length > 0;

  if (products.length === 0) {
    if (totalProducts === 0) {
      return (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            No products yet
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Add your first product using the form on the left to get started.
          </p>
        </div>
      );
    }

    if (hasSearch) {
      return (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            No matching products found
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Try a different keyword or clear your search to view all products.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDeleteProduct={onDeleteProduct}
          onEditProduct={onEditProduct}
        />
      ))}
    </div>
  );
}