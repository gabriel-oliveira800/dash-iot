import type { SensorData } from "../../data/sensor";
import { Camera, Zap } from "lucide-react";

interface SensorTestProps {
    sensorData: SensorData;
    simulateSensorUpdate: (data: Partial<SensorData>) => void;
}

function SimulateUltrasonicSensorTest({ sensorData, simulateSensorUpdate }: SensorTestProps) {
    if (sensorData.type !== 'ultrasonic') return null;

    return (

        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 mt-8">
            <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-mono uppercase tracking-wider">
                <Zap size={14} /> Simulador de Hardware (ESP32)
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                        <label className="text-xs font-bold text-slate-500 mb-1 block">Simular Distância do Objeto (cm)</label>
                        <input
                            type="range" min="0" max="150"
                            value={sensorData.value}
                            onChange={(e) => simulateSensorUpdate({ value: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-e-resize"
                        />
                        <div className="flex justify-between text-xs font-mono mt-1 text-slate-500">
                            <span>0cm</span>
                            <span className="text-slate-800 font-bold">{sensorData.value} cm</span>
                            <span>150cm</span>
                        </div>
                    </div>
                    <button
                        onClick={() => simulateSensorUpdate({ count: sensorData.count + 1 })}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm w-full md:w-auto cursor-pointer"
                    >
                        +1 Pessoa
                    </button>

                    <button
                        onClick={() => simulateSensorUpdate({ count: 0, photoUrl: null })}
                        className="px-4 py-3 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 w-full md:w-auto cursor-pointer"
                    >
                        Resetar
                    </button>
                </div>

                <div className="pt-4 border-t border-slate-200">
                    <button
                        onClick={() => simulateSensorUpdate({
                            count: sensorData.count + 1,
                            photoUrl: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&q=80&t=${Date.now()}`
                        })}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-bold transition-colors cursor-pointer"
                    >
                        <Camera size={16} /> Simular Foto (ESP32-CAM)
                    </button>
                    <p className="text-[10px] text-center text-slate-500 mt-1">
                        Isso simula o envio de uma URL de imagem junto com o incremento do contador.
                    </p>
                </div>
            </div>
        </div >
    );
}

export { SimulateUltrasonicSensorTest };
