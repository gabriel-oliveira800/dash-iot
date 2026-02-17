import { Terminal, Wifi, Code, Camera, Cpu } from "lucide-react";
import { cppCodeExample, endPointSensor, endPointTrafficLight, projectIdExample, sensorUltrasonicExample, sensorUltrasonicWithPhotoExample, trafficLightExample, urlBaseExample } from "../../utils/constants";

import { CopyBlock, CopyBlockWithLabel } from "./CodyBlock";
import { CodeContainer } from "./CodeContainer";
import { Group } from "../Group";

function Documentation() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">

            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Documentação</h2>
                <p className="text-slate-500">Guia de integração para ESP32, Arduino e outros microcontroladores.</p>
            </div>

            <CodeContainer code={projectIdExample}>
                <CodeContainer.Title text="Credenciais do Projeto" icon={<Terminal size={20} />} />
                <CodeContainer.Subtitle text="Use seu project id para montar a URL da API Firestore, exemplo: " />
            </CodeContainer>

            <CodeContainer code={'69F9-5A24-F6F5-967D'}>
                <CodeContainer.Title text="Crie um deviceId" icon={<Cpu size={20} />} />
                <CodeContainer.Subtitle text="Crie um deviceId único para identificar seu dispositivo na dashboard. Clique no botão 'Gerar DeviceId' para gerar um deviceId aleatório." />
            </CodeContainer>

            <CodeContainer>
                <CodeContainer.Title text="Endpoints (Firestore REST API)" icon={<Wifi size={20} />} />
                <CodeContainer.Subtitle text={
                    <p className="text-sm text-slate-600 mb-4">
                        Envie requisições <strong>PATCH</strong> para atualizar os dados sem apagar os campos existentes.
                    </p>
                } />

                <Group>
                    <CopyBlockWithLabel title="Url base" code={urlBaseExample} />
                    <CopyBlockWithLabel title="Endpoint Semáforo" code={endPointTrafficLight} />
                    <CopyBlockWithLabel title="Endpoint Sensor" code={endPointSensor} />
                </Group>
            </CodeContainer>

            <Group className="grid gap-6">
                <CodeContainer>
                    <CodeContainer.Title
                        textColor="text-slate-800"
                        text="JSON Semáforo"
                        icon={<Code size={20} />}
                    />
                    <CodeContainer.Subtitle text="Estrutura para enviar via HTTP Body." />
                    <CopyBlock text={trafficLightExample} />
                </CodeContainer>

                <CodeContainer>
                    <CodeContainer.Title
                        text="Como enviar a Foto (ESP32-CAM)"
                        icon={<Camera size={20} />}
                    />
                    <CodeContainer.Subtitle text={
                        <p className="mb-2">
                            O campo <span className="font-mono bg-slate-100 px-1 rounded">photoUrl</span> aceita dois formatos: uma <strong>URL pública</strong> ou uma <strong>String Base64</strong>.
                        </p>
                    } />

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h4 className="font-bold text-purple-900 mb-2">Opção A: Base64 (Mais fácil para protótipos)</h4>
                        <p className="mb-2">
                            Converta a imagem capturada para Base64 no próprio ESP32 e envie como string.
                            <br /><span className="text-xs text-red-500 font-bold">Atenção: Mantenha a resolução baixa (QVGA) para não exceder o limite de 1MB do Firestore.</span>
                        </p>
                        <CopyBlock text={sensorUltrasonicWithPhotoExample} />
                    </div>
                </CodeContainer>

                <CodeContainer>
                    <CodeContainer.Title
                        textColor="text-slate-800"
                        text="JSON Sensores"
                        icon={<Code size={20} />}
                    />
                    <CodeContainer.Subtitle text="Estrutura para enviar via HTTP Body." />
                    <CopyBlock text={sensorUltrasonicExample} />
                </CodeContainer>
            </Group>

            <CodeContainer className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <CodeContainer.Title
                    textColor="text-emerald-600"
                    text="Exemplo ESP32 (Arduino IDE)"
                    icon={<Code size={20} />}
                />
                <CodeContainer.Subtitle text={
                    <p className="text-sm text-slate-600 mb-4">
                        Snippet simplificado usando <code className="font-bold text-slate-800">HTTPClient.h</code> .Lembre-se de conectar ao WiFi antes.
                    </p>
                } />
                <CopyBlock text={cppCodeExample} language="cpp" />
            </CodeContainer>
        </div>
    );
}
export { Documentation };