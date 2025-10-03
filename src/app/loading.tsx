'use client';

const ringColor = 'border-yellow-500'; // Cor base Ki (DB)
const pulseColor = 'bg-cyan-400'; // Cor de pulso Reiatsu (Bleach)
const textColor = 'text-gray-100';

export default function Loading() {
  return (
    // Fundo escuro, minimalista e afiado (Bleach/Estilo Gótico Tibiano)
    <div className="bg-background flex flex-col items-center justify-center p-4">
      {/* Título do Servidor - Remete a um estilo de RPG Clássico */}
      <h1 className={`mb-8 text-4xl font-extrabold tracking-wider sm:text-5xl ${textColor} drop-shadow-lg`}>
        <span className="text-red-600">WoDBleach</span>
        <span className="text-yellow-500">OT</span>
      </h1>

      {/* O "Reiatsu/Ki Pulse Ring"
        Animação que combina a rotação (DBZ - Ki/Giro) com o pulso (Bleach - Reiatsu/Poder)
      */}
      <div className={`relative flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32`}>
        {/* Anel Externo - Rotação Contínua (Ki - Dragon Ball) */}
        <div
          className={`absolute h-full w-full rounded-full border-4 border-dashed ${ringColor} animate-spin-slow opacity-75`}
          style={{ animationDuration: '4s' }} // Animação mais lenta para um efeito mais dramático
        ></div>

        {/* Círculo Interno - Pulso de Energia (Reiatsu - Bleach) */}
        <div
          className={`h-1/2 w-1/2 rounded-full ${pulseColor} animate-ping opacity-50`}
          style={{ animationDuration: '1.5s' }}
        ></div>

        {/* Centro - Um ponto de luz estático (O Olho do Ciclone) */}
        <div className={`absolute h-4 w-4 rounded-full ${pulseColor} shadow-lg shadow-cyan-400`}></div>
      </div>

      {/* Mensagem de Loading */}
      <p className={`mt-8 font-mono text-xl sm:text-2xl ${textColor} animate-pulse`}>
        Carregando World: <span className="text-red-600">Bankai</span>...
      </p>

      {/* Dica ou Frase Temática do Tibia */}
      <small className={`mt-4 font-serif text-sm text-gray-400 italic`}>
        Aguarde, a Soul Society se conecta ao Mundo Real.
      </small>
    </div>
  );
}
