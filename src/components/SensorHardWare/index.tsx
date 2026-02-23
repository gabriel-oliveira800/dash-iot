import { Activity, AlertTriangle, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getSavedData, saveData } from "../../utils/preferences";
import type { SensorData, SensorType } from "../../data/sensor";

import { SliderLimitTrigger } from "./SliderLimitTrigger";
import { UltrasonicContent } from "./UltrasonicContent";
import { SensorTypeButton } from "./SensorTypeButton";
import { MagneticContent } from "./MagneticContent";
import { StatusBadge } from "../StatusBadge";

interface SensorHardWareProps {
    onReset: () => void;
    sensorData: SensorData | null;
    onLimitChange: (limit: number) => void;
}

function SensorHardWare({ sensorData, onReset, onLimitChange }: SensorHardWareProps) {
    const [type, setType] = useState<SensorType>('ultrasonic')

    const [limit, setLimit] = useState<number>(
        () => getSavedData('@app:limit', 10)
    )
    const [qntPeople, setQntPeople] = useState<number>(
        () => getSavedData('@app:qntPeople', 0)
    )

    const handleReset = () => {
        setQntPeople(0)
        saveData('@app:qntPeople', 0)
        onReset()
    }

    const canCountAgain = useRef(true)

    useEffect(() => {
        if (sensorData == null) return

        if (sensorData.distance < limit && canCountAgain.current) {
            setQntPeople(prev => {
                const newValue = prev + 1
                saveData('@app:qntPeople', newValue)
                return newValue
            })

            canCountAgain.current = false
        }

        if (sensorData.distance > limit) canCountAgain.current = true
    }, [sensorData])


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
                            currentType={type}
                            onClick={() => setType('ultrasonic')}
                            description="Medidor de Distância / Contador"
                        />

                        <SensorTypeButton
                            type="magnetic"
                            currentType={type}
                            onClick={() => setType('magnetic')}
                            title="Magnético" description="Porta/Gaveta Aberta ou Fechada"
                        />

                    </div>

                    <SliderLimitTrigger
                        limit={limit}
                        setLimit={(value) => {
                            setLimit(value);
                            onLimitChange(value);
                        }}
                    />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2 flex flex-col items-center justify-center min-h-62.5">

                    {type === 'ultrasonic' && (
                        <UltrasonicContent
                            limit={limit}
                            data={sensorData}
                            qntPeople={qntPeople}
                            onReset={handleReset}
                        />
                    )}

                    {type === 'magnetic' && (
                        <MagneticContent
                            isOpen={sensorData.distance !== null && sensorData.distance <= limit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export { SensorHardWare };