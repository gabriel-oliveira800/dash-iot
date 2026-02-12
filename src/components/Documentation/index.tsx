import { Terminal, Wifi, Code } from "lucide-react";
import { appIdExample, cppCodeExample, endPointSensor, endPointTrafficLight, sensorUltrasonicExample, trafficLightExample, urlBaseExample } from "../../utils/constants";

import { CopyBlock } from "./CodyBlock";

function Documentation() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">

            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Documentação</h2>
                <p className="text-slate-500">Guia de integração para ESP32, Arduino e outros microcontroladores.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
                    <Terminal size={20} /> 1. Credenciais do Projeto
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                    Use este <strong>App ID</strong> para montar a URL da API Firestore.
                </p>

                < CopyBlock text={appIdExample} enableCopy={false} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
                    <Wifi size={20} /> 2. Endpoints (Firestore REST API)
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                    Envie requisições <strong>PATCH</strong> para atualizar os dados sem apagar os campos existentes.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Url base</label>
                        <CopyBlock text={urlBaseExample} />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Endpoint Semáforo</label>
                        <CopyBlock text={endPointTrafficLight} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Endpoint Sensores</label>
                        <CopyBlock text={endPointSensor} />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-rows-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Code size={20} /> JSON Semáforo
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">Estrutura para enviar via HTTP Body.</p>
                    <CopyBlock text={trafficLightExample} />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Code size={20} /> JSON Sensores
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">Exemplo para modo Ultrassônico.</p>
                    <CopyBlock text={sensorUltrasonicExample} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-emerald-600 mb-4 flex items-center gap-2">
                    <Code size={20} /> Exemplo ESP32 (Arduino IDE)
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                    Snippet simplificado usando <code>HTTPClient.h</code>. Lembre-se de conectar ao WiFi antes.
                </p>
                <CopyBlock text={cppCodeExample} />
            </div>

        </div>

    );
}
export { Documentation };