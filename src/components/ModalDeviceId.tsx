import { Cpu, RefreshCw, Save, X } from "lucide-react";
import { useState } from "react";
import { DEVICE_ID_KEY } from "../utils/constants";

interface ModalDeviceIdProps {
    savedDeviceId: string;
    isOpen: boolean;
    onSave: (deviceId: string) => void;
    onClose: () => void;
}

function ModalDeviceId({ isOpen, onClose, savedDeviceId, onSave }: ModalDeviceIdProps) {
    if (!isOpen) return null;

    const [deviceId, setDeviceId] = useState(savedDeviceId);
    const generateUUID = () => {
        return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
            const r = (Math.random() * 16) | 0;
            return r.toString(16).toUpperCase();
        });
    };

    const handleSaveDeviceId = () => {
        if (!deviceId.trim()) return;
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
        onSave(deviceId);
    }


    return (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold flex items-center gap-2">
                        <Cpu size={20} /> Configuração do Dispositivo
                    </h3>
                    <button onClick={onClose} className="hover:bg-slate-800 p-1 rounded transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Device ID (Identificador Único)</label>
                    <p className="text-xs text-slate-500 mb-4">Este ID é usado para diferenciar seus dispositivos na nuvem. Use o mesmo ID no seu código Arduino/ESP32.</p>

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={deviceId}
                            onChange={(e) => setDeviceId(e.target.value)}
                            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Ex: NODE-01"
                        />
                        <button
                            onClick={() => setDeviceId(generateUUID())}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg border border-slate-300 flex items-center gap-2 transition-colors cursor-pointer"
                            title="Gerar Auto Código"
                        >
                            <RefreshCw size={16} /> Auto
                        </button>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveDeviceId}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                        >
                            <Save size={16} /> Salvar Config
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDeviceId;