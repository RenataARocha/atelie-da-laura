
export default function Banner({ banners, bannerAtual }) {
  return (
<div className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-500 py-2 shadow-md shadow-purple-100/40" role="region" aria-label="Promoções e informações">
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