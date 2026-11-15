import { formatRupiah } from "../utils/formatRupiah";

export default function DeleteConfirmModal({
  isOpen,
  product,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !product) return null;

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

        <div className="delete-icon-wrapper" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>

        <h2 className="text-center">Hapus Produk?</h2>
        <p className="modal-subtitle text-center">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="delete-preview-box">
          <span className="card-id">ID: {product.id}</span>
          <strong className="card-title">{product.name}</strong>
          <span className="card-price">{formatRupiah(product.price)}</span>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(product.id)}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}
