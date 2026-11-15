import { useEffect, useState } from "react";

export default function ProductFormModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setName(initialData.name);
        setPrice(String(initialData.price));
      } else {
        setName("");
        setPrice("");
      }
      setNameError(false);
      setPriceError(false);
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const numericPrice = Number(price);

    const invalidName = trimmedName.length === 0;
    const invalidPrice = !numericPrice || numericPrice <= 0;

    setNameError(invalidName);
    setPriceError(invalidPrice);

    if (invalidName || invalidPrice) return;

    onSubmit({
      id: isEdit ? initialData.id : undefined,
      name: trimmedName,
      price: numericPrice,
    });
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Tutup"
        >
          &times;
        </button>

        <h2>{isEdit ? "Edit Produk" : "Tambah Produk"}</h2>
        <p className="modal-subtitle">
          {isEdit
            ? "Perbarui informasi produk yang dipilih."
            : "Masukkan informasi produk baru."}
        </p>

        {isEdit && initialData && (
          <p className="product-id-highlight">ID: {initialData.id}</p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="productName">Nama Produk</label>
            <input
              id="productName"
              type="text"
              placeholder={isEdit ? "" : "Contoh: Pulpen"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            {nameError && (
              <small className="error-text">Nama produk wajib diisi.</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Harga (Rp)</label>
            <input
              id="productPrice"
              type="number"
              min="1"
              placeholder={isEdit ? "" : "Contoh: 5000"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <small className={`helper-text ${priceError ? "invalid" : ""}`}>
              Harga harus lebih dari 0.
            </small>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
