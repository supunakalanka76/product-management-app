import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export default function ProductCard({
  product,
  onDeleteProduct,
  onEditProduct,
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      {product.image ? (
        <Image
            src={product.image}
            alt={product.name}
            className="h-52 w-full object-cover"
            width={400}
            height={208}
        />
      ) : (
        <div className="flex h-52 items-center justify-center bg-gray-100 text-sm text-gray-400 dark:bg-gray-950 dark:text-gray-500">
          No Image
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditProduct(product)}
              className="rounded-xl p-2 text-blue-500 transition hover:bg-blue-50 dark:hover:bg-blue-950/40"
              aria-label="Edit product"
              title="Edit product"
            >
              <Pencil className="h-4 w-4 cursor-pointer" />
            </button>

            <button
              onClick={() => onDeleteProduct(product.id)}
              className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/40"
              aria-label="Delete product"
              title="Delete product"
            >
              <Trash2 className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            Product
          </span>

          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ${Number(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}