import type { SensorData } from "../../data/sensor";
import { Zap } from "lucide-react";

interface SensorTestProps {
    sensorData: SensorData;
    simulateSensorUpdate: (data: Partial<SensorData>) => void;
}

function SimulateMagneticSensorTest({ sensorData, simulateSensorUpdate }: SensorTestProps) {
    if (sensorData.type !== 'magnetic') return null;

    return (
        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 mt-8">
            <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-mono uppercase tracking-wider">
                <Zap size={14} /> Simulador de Hardware (ESP32)
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => simulateSensorUpdate({ isOpen: true })}
                    className={`flex-1 py-3 rounded-lg font-bold border transition-colors cursor-pointer ${sensorData.isOpen ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300'}`}
                >
                    Simular "Abrir"
                </button>
                <button
                    onClick={() => simulateSensorUpdate({ isOpen: false })}
                    className={`flex-1 py-3 rounded-lg font-bold border transition-colors cursor-pointer ${!sensorData.isOpen ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300'}`}
                >
                    Simular "Fechar"
                </button>
            </div>
        </div>
    );
}

export { SimulateMagneticSensorTest };
