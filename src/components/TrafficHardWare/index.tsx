import { AlertTriangle, ArrowRightLeft, Zap } from "lucide-react";
import { useState } from "react";

import { TrafficLightVisual } from "./TrafficLightVisual";
import { StatusBadge } from "../StatusBadge";
import type { TrafficData } from "../../data/traffic";

function TrafficHardWare() {
    const [trafficData, setTrafficData] = useState<TrafficData>({
        mode: 'normal',
        light1: 'red',
        light2: 'green',
        lastUpdate: new Date(),
    });

    const simulateTrafficUpdate = (newData: TrafficData) => {
        setTrafficData({ ...trafficData, ...newData, lastUpdate: new Date() });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <ArrowRightLeft className="text-indigo-600" />
                    Controle de Tráfego
                </h2>
                <StatusBadge timestamp={trafficData.lastUpdate} />
            </div>

            {trafficData.mode === 'error' && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r shadow-sm mb-6 flex items-start gap-3">
                    <AlertTriangle />
                    <div>
                        <p className="font-bold">Alerta de Manutenção</p>
                        <p>O sistema detectou uma falha nos circuitos ou lâmpadas. O semáforo está em modo de segurança.</p>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 justify-items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-lg font-semibold text-slate-600">Via Principal (Norte/Sul)</span>
                    <TrafficLightVisual color={trafficData.mode === 'error' ? 'yellow' : trafficData.light1} label="ID: SEM-01" />
                </div>
                <div className="hidden md:block w-px bg-slate-200 self-stretch"></div>
                <div className="flex flex-col items-center gap-4">
                    <span className="text-lg font-semibold text-slate-600">Via Secundária (Leste/Oeste)</span>
                    <TrafficLightVisual color={trafficData.mode === 'error' ? 'yellow' : trafficData.light2} label="ID: SEM-02" />
                </div>
            </div>

            <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 mt-8">
                <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-mono uppercase tracking-wider">
                    <Zap size={14} /> Simulador de Hardware (ESP32)
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                        onClick={() => simulateTrafficUpdate({ mode: 'normal', light1: 'green', light2: 'red' } as TrafficData)}
                        className="px-4 py-2 bg-white border border-slate-300 rounded hover:bg-slate-50 text-sm cursor-pointer"
                    >
                        Estado 1 (Verde/Vermelho)
                    </button>
                    <button
                        onClick={() => simulateTrafficUpdate({ mode: 'normal', light1: 'yellow', light2: 'red' } as TrafficData)}
                        className="px-4 py-2 bg-white border border-slate-300 rounded hover:bg-slate-50 text-sm cursor-pointer"
                    >
                        Estado 2 (Amarelo/Vermelho)
                    </button>
                    <button
                        onClick={() => simulateTrafficUpdate({ mode: 'normal', light1: 'red', light2: 'green' } as TrafficData)}
                        className="px-4 py-2 bg-white border border-slate-300 rounded hover:bg-slate-50 text-sm cursor-pointer"
                    >
                        Estado 3 (Vermelho/Verde)
                    </button>
                    <button
                        onClick={
                            () => simulateTrafficUpdate(
                                {
                                    mode: 'error', light1: 'yellow', light2: 'yellow'
                                } as TrafficData
                            )
                        }
                        className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded hover:bg-red-100 text-sm cursor-pointer"
                    >
                        Simular Dano/Erro
                    </button>
                </div>
            </div>
        </div>
    );
}

export { TrafficHardWare };