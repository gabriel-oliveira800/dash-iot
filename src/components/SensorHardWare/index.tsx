import { Activity, Settings } from "lucide-react";
import { useState } from "react";

import { StatusBadge } from "../StatusBadge";
import type { SensorData } from "../../data/sensor";
import { SensorTypeButton } from "./SensorTypeButton";
import { UltrasonicContent } from "./UltrasonicContent";
import { MagneticContent } from "./MagneticContent";
import { SliderLimitTrigger } from "./SliderLimitTrigger";
import { SimulateSensorTest } from "./SimulateSensorTest";

function SensorHardWare() {
    const [sensorData, setSensorData] = useState<SensorData>({
        type: 'ultrasonic',
        value: 0,
        count: 0,
        isOpen: false,
        limit: 50,
        lastUpdate: new Date()
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Activity className="text-indigo-600" />
                    Sensores de Ambiente
                </h2>
                <StatusBadge timestamp={sensorData.lastUpdate} />
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
                            title="Magnético (Reed Switch)" description="Porta/Gaveta Aberta ou Fechada"
                        />

                    </div>

                    {sensorData.type === 'ultrasonic' && (
                        <SliderLimitTrigger
                            sensorData={sensorData}
                            setSensorData={setSensorData}
                        />
                    )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2 flex flex-col items-center justify-center min-h-[250px]">
                    {sensorData.type === 'ultrasonic' ? (
                        <UltrasonicContent sensorData={sensorData} />
                    ) : (
                        <MagneticContent sensorData={sensorData} />
                    )}
                </div>
            </div>

            <SimulateSensorTest
                sensorData={sensorData}
                simulateSensorUpdate={(data) => setSensorData(prev => ({ ...prev, ...data }))}
            />
        </div>
    );
}

export { SensorHardWare };