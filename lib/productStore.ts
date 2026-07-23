import { initialProducts, Product } from "./dataStore";

const PRODUCTS_KEY = "nsv_admin_products";

export function getAdminProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts;
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : initialProducts;
  } catch {
    return initialProducts;
  }
}

export function saveAdminProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function addAdminProduct(product: Product): Product[] {
  const existing = getAdminProducts();
  const updated = [...existing, product];
  saveAdminProducts(updated);
  return updated;
}

export function updateAdminProduct(id: string, changes: Partial<Product>): Product[] {
  const existing = getAdminProducts();
  const updated = existing.map((p) => (p.id === id ? { ...p, ...changes } : p));
  saveAdminProducts(updated);
  return updated;
}

export function toggleAdminProductStock(id: string): Product[] {
  const existing = getAdminProducts();
  const updated = existing.map((p) => (p.id === id ? { ...p, available: !p.available } : p));
  saveAdminProducts(updated);
  return updated;
}
