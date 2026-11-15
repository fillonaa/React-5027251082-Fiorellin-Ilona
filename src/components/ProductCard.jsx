import { formatRupiah } from "../utils/formatRupiah";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <div>
        <span className="card-id">ID: {product.id}</span>
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">{formatRupiah(product.price)}</p>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => onDelete(product)}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
