import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold">Contador React</h2>
      <div className="text-6xl font-bold">{count}</div>
      <div className="flex gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Disminuir
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Resetear
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Aumentar
        </button>
      </div>
      <p className="text-sm opacity-80 mt-2">
        ✨ Componente React funcionando en Astro con Tailwind CSS
      </p>
    </div>
  );
}
