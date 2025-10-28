import React, { useState, useMemo, useCallback } from 'react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types';
import ProductForm from '../components/ProductForm';

const DashboardPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const totalProducts = useMemo(() => products.length, [products]);
  const totalValue = useMemo(
    () => products.reduce((sum, p) => sum + p.price, 0).toFixed(2),
    [products]
  );

  const handleOpenModal = useCallback((product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        image: product.image,
      });
    } else {
      setEditingProduct(null);
      setFormData({ title: '', price: '', description: '', category: '', image: '' });
    }
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingProduct(null);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image,
      };

      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
      } else {
        addProduct(productData);
      }
      handleCloseModal();
    },
    [formData, editingProduct, addProduct, updateProduct, handleCloseModal]
  );

  const handleDelete = useCallback(
    (id: number) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        deleteProduct(id);
      }
    },
    [deleteProduct]
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3 tracking-tight glow">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your product inventory with ease. Add, edit, and delete products seamlessly.
          </p>
          <div className="mt-4 h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-xl">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-3xl font-bold">{totalProducts}</div>
            <div className="text-muted-foreground">Total Products</div>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-xl">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold">${totalValue}</div>
            <div className="text-muted-foreground">Total Value</div>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-xl">
            <div className="text-4xl mb-2">🏷️</div>
            <div className="text-3xl font-bold">
              {new Set(products.map((p) => p.category)).size}
            </div>
            <div className="text-muted-foreground">Categories</div>
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-card-foreground">Product Management</h2>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg w-full md:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Product
            </button>
          </div>

          {/* Responsive Product List */}
          <div>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4">Image</th>
                    <th className="text-left py-4 px-4">Title</th>
                    <th className="text-left py-4 px-4">Category</th>
                    <th className="text-left py-4 px-4">Price</th>
                    <th className="text-left py-4 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border hover:bg-muted transition-colors"
                    >
                      <td className="py-4 px-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 object-contain rounded"
                        />
                      </td>
                      <td className="py-4 px-4 font-semibold text-card-foreground max-w-xs truncate">
                        {product.title}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{product.category}</td>
                      <td className="py-4 px-4 font-bold text-primary">${product.price}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-md"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                            Edit
                          </button>
                          <div className="h-6 w-px bg-gray-300"></div>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 shadow-md"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden grid grid-cols-1 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-muted/50 rounded-2xl p-4 flex flex-col gap-4 shadow-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 object-contain rounded-lg bg-white p-1"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-card-foreground text-lg">{product.title}</h3>
                      <p className="text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <p className="font-extrabold text-primary text-xl">${product.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="flex items-center gap-2 bg-blue-500 text-white p-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center gap-2 bg-red-500 text-white p-2 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 shadow-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showModal && (
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            editingProduct={editingProduct}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
