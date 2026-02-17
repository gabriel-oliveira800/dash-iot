import { Activity, AlertTriangle, Settings } from "lucide-react";

import { SimulateUltrasonicSensorTest } from "./SimulateUltrasonicSensorTest";
import { SimulateMagneticSensorTest } from "./SimulateMagneticSensorTest";

import { SliderLimitTrigger } from "./SliderLimitTrigger";
import { UltrasonicContent } from "./UltrasonicContent";
import { SensorTypeButton } from "./SensorTypeButton";
import type { SensorData } from "../../data/sensor";
import { MagneticContent } from "./MagneticContent";
import { StatusBadge } from "../StatusBadge";

interface SensorHardWareProps {
    sensorData: SensorData | null;
    setSensorData: (data: SensorData) => void;
}

function SensorHardWare({ sensorData, setSensorData }: SensorHardWareProps) {
    if (!sensorData) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="text-indigo-600" />
                        Sensores de Ambiente
                    </h2>
                    <StatusBadge timestamp={new Date()} />
                </div>
                <div className="bg-slate-100 border-l-4 border-slate-500 text-slate-700 p-4 rounded-r shadow-sm mb-6 flex items-start gap-3">
                    <AlertTriangle />
                    <div>
                        <p className="font-bold">Carregando dados...</p>
                        <p>Por favor, aguarde enquanto os dados são carregados.</p>
                    </div>
                </div>
            </div>
        );
    }

    const simulateSensorUpdate = (newData: Partial<SensorData>) => {
        setSensorData({ ...sensorData, ...newData });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Activity className="text-indigo-600" />
                    Sensores de Ambiente
                </h2>
                <StatusBadge timestamp={new Date()} />
            </div>


            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-1">
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <Settings size={16} /> Configurações
                    </h3>

                    <div className="flex flex-col gap-2 mb-6">
                        <SensorTypeButton
                            type="ultrasonic"
                            title="Ultrassônico"
                            currentType={sensorData.type}
                            description="Medidor de Distância / Contador"
                            onClick={() => setSensorData({ ...sensorData, type: 'ultrasonic' })}
                        />

                        <SensorTypeButton
                            type="magnetic"
                            currentType={sensorData.type}
                            onClick={() => setSensorData({ ...sensorData, type: 'magnetic' })}
                            title="Magnético" description="Porta/Gaveta Aberta ou Fechada"
                        />

                    </div>

                    {sensorData.type === 'ultrasonic' && (
                        <SliderLimitTrigger
                            sensorData={sensorData}
                            setSensorData={setSensorData}
                        />
                    )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2 flex flex-col items-center justify-center min-h-62.5">
                    {sensorData.type === 'ultrasonic' ? (
                        <UltrasonicContent sensorData={sensorData} />
                    ) : (
                        <MagneticContent sensorData={sensorData} />
                    )}
                </div>
            </div>

            <SimulateUltrasonicSensorTest
                sensorData={sensorData}
                simulateSensorUpdate={simulateSensorUpdate}
            />

            <SimulateMagneticSensorTest
                sensorData={sensorData}
                simulateSensorUpdate={simulateSensorUpdate}
            />
        </div>
    );
}

export { SensorHardWare };