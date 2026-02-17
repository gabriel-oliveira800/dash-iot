import { Camera } from "lucide-react";
import type { SensorData } from "../../data/sensor";

function UltrasonicContent({ sensorData }: { sensorData: SensorData }) {
    return (
        <div className="w-full text-center">
            <div className="mb-2 text-slate-500 font-medium">Contagem de Pessoas</div>
            {sensorData.photoUrl ? (
                <div className="relative mb-6 rounded-lg overflow-hidden border-2 border-indigo-100 shadow-lg group inline-block cursor-pointer">
                    <img
                        src={sensorData.photoUrl}
                        alt="Última Detecção"
                        className="block w-auto h-auto max-w-full rounded-lg"
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/400x300?text=Erro+na+Imagem';
                        }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Captura Recente
                    </div>
                </div>

            ) : (
                <div className="h-24 w-full flex items-center justify-center bg-slate-50 rounded-lg mb-4 border border-dashed border-slate-300">
                    <div className="text-slate-400 flex flex-col items-center gap-1 text-xs">
                        <Camera size={20} />
                        <span>Aguardando Captura</span>
                    </div>
                </div>
            )}

            <div className="text-7xl font-bold text-slate-800 mb-6 font-mono tracking-tighter">
                {sensorData.count ? String(sensorData.count).padStart(3, '0') : '000'}
            </div>

            <div className="relative w-full bg-slate-100 rounded-full h-6 overflow-hidden mb-2">
                <div
                    className={`absolute left-0 h-full transition-all duration-300 ${sensorData.value <= (sensorData.limit || 50) ? 'bg-orange-500' : 'bg-indigo-500'}`}
                    style={{ width: `${Math.min(sensorData.value, 150) / 1.5}%` }}
                />
                <div
                    className="absolute top-0 bottom-0 w-1 bg-red-500/50 z-10"
                    style={{ left: `${(sensorData.limit || 50) / 1.5}%` }}
                />
            </div>

            <div className="flex justify-between items-center mt-2">
                <span className={`text-sm font-mono font-bold ${sensorData.value <= (sensorData.limit || 50) ? 'text-orange-600 animate-pulse' : 'text-slate-500'}`}>
                    Distância: {sensorData.value}cm
                </span>
                <span className="text-xs text-slate-400 font-mono">
                    Limite Configurado: {sensorData.limit || 50}cm
                </span>
            </div>
        </div>
    );
}

export { UltrasonicContent };
