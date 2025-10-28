import React from 'react';
import type { Product } from '../types';

interface ProductFormProps {
  formData: {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  editingProduct: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  editingProduct,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-card rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-3xl font-bold mb-6 text-primary">
          {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h3>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-card-foreground font-semibold mb-2">Nama Produk</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan nama produk"
              required
            />
          </div>

          <div>
            <label className="block text-card-foreground font-semibold mb-2">Harga</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-colors"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-card-foreground font-semibold mb-2">Kategori</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-colors"
              placeholder="contoh: elektronik, pakaian"
              required
            />
          </div>

          <div>
            <label className="block text-card-foreground font-semibold mb-2">URL Gambar</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-colors"
              placeholder="https://example.com/gambar.jpg"
              required
            />
          </div>

          <div>
            <label className="block text-card-foreground font-semibold mb-2">Deskripsi</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan deskripsi produk"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:shadow-lg transition-all border-2 border-border shadow-lg transform hover:-translate-y-1"
            >
              {editingProduct ? 'Perbarui Produk' : 'Tambah Produk'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-muted text-muted-foreground py-3 rounded-xl font-bold hover:bg-muted/80 transition-all border-2 border-border shadow-lg hover:shadow-accent/40"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;