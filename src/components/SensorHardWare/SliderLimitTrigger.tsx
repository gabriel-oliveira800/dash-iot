import { Sliders } from "lucide-react";
import type { SensorData } from "../../data/sensor";

interface SliderLimitTriggerProps {
    sensorData: SensorData;
    setSensorData: (data: SensorData) => void;
}

function SliderLimitTrigger({ sensorData, setSensorData }: SliderLimitTriggerProps) {
    return (
        <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Sliders size={12} /> Limite de Trigger
                </label>
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {sensorData.limit || 50}cm
                </span>
            </div>
            <input
                type="range" min="10" max="150"
                value={sensorData.limit || 50}
                onChange={(e) => setSensorData({ ...sensorData, limit: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                Objetos detectados a uma distância menor que este valor serão contados.
            </p>
        </div>
    );
}

export { SliderLimitTrigger };
