import { Camera, RefreshCcw } from "lucide-react";
import type { SensorData } from "../../data/sensor";
import { placeholderBase64 } from "../../utils/constants";

const ensureBase64Prefix = (value?: string | null): string | undefined => {
    if (!value) return undefined;
    if (value.startsWith("data:image")) return value;
    return `data:image/jpeg;base64,${value}`;
};

interface UltrasonicContentProps {
    limit: number;
    qntPeople: number;
    data: SensorData;
    onReset: () => void;
}

function UltrasonicContent({
    limit,
    qntPeople,
    data,
    onReset,
}: UltrasonicContentProps) {
    const { photoUrl } = data;
    const url = ensureBase64Prefix(photoUrl);
    return (
        <div className="w-full text-center">
            <div className="mb-2 text-slate-500 font-medium">Contagem de Pessoas</div>
            {url ? (
                <div className="relative mb-6 rounded-lg overflow-hidden border-2 border-indigo-100 shadow-lg group inline-block cursor-pointer">
                    <img
                        src={url}
                        alt="Última Detecção"
                        className="block w-auto h-auto max-w-full rounded-lg"
                        onError={e => e.currentTarget.src = placeholderBase64}
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

            <div className="text-7xl font-bold text-slate-800 mb-6 font-mono tracking-tighter flex items-center justify-center gap-2">
                {qntPeople ? String(qntPeople).padStart(3, '0') : '000'}

                <button
                    onClick={onReset}
                    className="px-4 py-3 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 w-full md:w-auto cursor-pointer"
                >
                    <RefreshCcw size={20} />
                </button>
            </div>



            <div className="relative w-full bg-slate-100 rounded-full h-6 overflow-hidden mb-2">
                <div
                    className={`absolute left-0 h-full transition-all ${data.distance <= limit ? 'bg-orange-500' : 'bg-indigo-500'}`}
                    style={{ width: `${Math.min(data.distance, 150) / 1.5}%` }}
                />
                <div
                    className="absolute top-0 bottom-0 w-1 bg-red-500/50 z-10"
                    style={{ left: `${limit / 1.5}%` }}
                />
            </div>

            <div className="flex justify-between items-center mt-2 mb-12">
                <span className={`text-sm font-mono font-bold ${data.distance <= limit ? 'text-orange-600 animate-pulse' : 'text-slate-500'}`}>
                    Distância: {data.distance}cm
                </span>
                <span className="text-xs text-slate-400 font-mono">
                    Limite Configurado: {limit}cm
                </span>
            </div>
        </div>
    );
}

export { UltrasonicContent };
