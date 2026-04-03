export const getProducts = () => {
  if (typeof window === "undefined") return [];

  try {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
  } catch {
    return [];
  }
};

export const saveProducts = (products) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("products", JSON.stringify(products));
  } catch {
    console.error("Failed to save products to localStorage");
  }
};