import type { SensorData } from "../../data/sensor";
import { Zap } from "lucide-react";

interface SimulateSensorTestProps {
    sensorData: SensorData;
    simulateSensorUpdate: (data: Partial<SensorData>) => void;
}

function SimulateSensorTest({ sensorData, simulateSensorUpdate }: SimulateSensorTestProps) {
    return (
        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 mt-8">
            <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-mono uppercase tracking-wider">
                <Zap size={14} /> Simulador de Hardware (ESP32)
            </div>

            {sensorData.type === 'ultrasonic' ? (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                        <label className="text-xs font-bold text-slate-500 mb-1 block">Simular Distância do Objeto (cm)</label>
                        <input
                            type="range" min="0" max="150"
                            value={sensorData.value}
                            onChange={(e) => simulateSensorUpdate({ value: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs font-mono mt-1 text-slate-500">
                            <span>0cm</span>
                            <span className="text-slate-800 font-bold">{sensorData.value} cm</span>
                            <span>150cm</span>
                        </div>
                    </div>
                    <button
                        onClick={() => simulateSensorUpdate({ count: sensorData.count + 1 })}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm w-full md:w-auto"
                    >
                        +1 Pessoa
                    </button>
                    <button
                        onClick={() => simulateSensorUpdate({ count: 0 })}
                        className="px-4 py-3 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 w-full md:w-auto"
                    >
                        Resetar
                    </button>
                </div>
            ) : (
                <div className="flex gap-4">
                    <button
                        onClick={() => simulateSensorUpdate({ isOpen: true })}
                        className={`flex-1 py-3 rounded-lg font-bold border transition-colors ${sensorData.isOpen ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300'}`}
                    >
                        Simular "Abrir"
                    </button>
                    <button
                        onClick={() => simulateSensorUpdate({ isOpen: false })}
                        className={`flex-1 py-3 rounded-lg font-bold border transition-colors ${!sensorData.isOpen ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300'}`}
                    >
                        Simular "Fechar"
                    </button>
                </div>
            )}
        </div>
    );
}

export { SimulateSensorTest };
