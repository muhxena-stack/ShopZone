import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';

interface ProductDetailPageProps {
  productId: number;
  onNavigate: (path: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const { getProductById } = useProducts();
  const { isAuthenticated } = useAuth();
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => onNavigate('/products')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6">
        <button
          onClick={() => onNavigate('/products')}
          className="mb-6 text-primary hover:text-primary/80 font-semibold flex items-center gap-2 transition-colors"
        >
          ← Back to Products
        </button>

        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="bg-muted rounded-2xl p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {product.category}
                </div>
                <h1 className="text-4xl font-bold text-card-foreground mb-4">{product.title}</h1>
                <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

                {product.rating && (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-2xl">⭐</span>
                      <span className="text-2xl font-bold text-card-foreground">{product.rating.rate}</span>
                      <span className="text-muted-foreground">/ 5</span>
                    </div>
                    <span className="text-muted-foreground">({product.rating.count} reviews)</span>
                  </div>
                )}

                <div className="text-5xl font-bold text-primary mb-8">
                  ${product.price}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 border-2 border-border shadow-lg hover:shadow-primary/50">
                  🛒 Add to Cart
                </button>
                {isAuthenticated && (
                  <button
                    onClick={() => onNavigate('/dashboard')}
                    className="bg-muted text-muted-foreground px-8 py-4 rounded-xl font-bold hover:bg-muted/80 transition-all border-2 border-border shadow-lg"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;