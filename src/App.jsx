import { useMemo, useState } from "react";
import { initialProducts } from "./data/initialProducts";
import ProductCard from "./components/ProductCard";
import ProductFormModal from "./components/ProductFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  const [formModal, setFormModal] = useState({
    isOpen: false,
    mode: "add",
    product: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    product: null,
  });

  const filteredProducts = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
  }, [products, searchQuery]);

  const handleOpenAdd = () => {
    setFormModal({ isOpen: true, mode: "add", product: null });
  };

  const handleOpenEdit = (product) => {
    setFormModal({ isOpen: true, mode: "edit", product });
  };

  const handleCloseForm = () => {
    setFormModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSaveProduct = ({ id, name, price }) => {
    if (formModal.mode === "add") {
      const nextId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts((prev) => [...prev, { id: nextId, name, price }]);
    } else {
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, name, price } : item))
      );
    }
    handleCloseForm();
  };

  const handleOpenDelete = (product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleCloseDelete = () => {
    setDeleteModal({ isOpen: false, product: null });
  };

  const handleConfirmDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    handleCloseDelete();
  };

  return (
    <div className="page-wrapper">
      <main className="container">
        <header className="page-header">
          <div>
            <h1>Manajemen Produk</h1>
            <p className="subtitle">
              Kelola daftar produk dan harga dalam satu tempat.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAdd}
          >
            + Tambah Produk
          </button>
        </header>

        <section className="toolbar">
          <div className="search-box">
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span className="total-count">{products.length} produk</span>
        </section>

        <section className="product-grid" aria-live="polite">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))
          ) : (
            <div className="empty-state">
              Tidak ada produk yang cocok dengan pencarian.
            </div>
          )}
        </section>

        <footer className="page-footer">
          <p>
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </footer>
      </main>

      <ProductFormModal
        isOpen={formModal.isOpen}
        mode={formModal.mode}
        initialData={formModal.product}
        onClose={handleCloseForm}
        onSubmit={handleSaveProduct}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        product={deleteModal.product}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
