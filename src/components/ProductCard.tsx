import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-card rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 border"
    >
      <div className="relative h-64 bg-muted flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <span>⭐</span>
              <span className="text-muted-foreground font-semibold">{product.rating.rate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;