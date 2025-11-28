import React from 'react';

export default function Banner({ banners, bannerAtual }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-600 py-2" role="region" aria-label="Promoções e informações">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`text-center text-sm font-medium transition-all duration-1000 ${
            index === bannerAtual ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {banner.texto}
        </div>
      ))}
    </div>
  );
}