import { BookOpen, Cpu, Server, Settings } from "lucide-react";
import type { Tab } from "./TabsContent";

interface HeaderProps {
    activeTab: Tab;
    deviceId: string | null;
    openModal: () => void;
    setActiveTab: (tab: Tab) => void;
}

function Header({ deviceId, activeTab = 'traffic', openModal, setActiveTab }: HeaderProps) {
    return (
        <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-indigo-500 p-2 rounded-lg">
                        <Server size={24} className="text-white" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight">I.O.T Cloud</h1>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>Monitoramento Unificado v1.7</span>
                            <span className="text-slate-600">|</span>

                            {
                                !deviceId ? (
                                    <button
                                        onClick={openModal}
                                        className={`cursor-pointer whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 bg-emerald-600 text-white`}
                                    >
                                        <Settings size={12} />
                                        Gerar Identificador
                                    </button>


                                ) : (
                                    <button
                                        onClick={openModal}
                                        className="p-2 flex items-center gap-1 hover:text-white transition-colors bg-slate-800 rounded border border-slate-700 hover:border-slate-500 cursor-pointer"
                                    >
                                        <Cpu size={10} />
                                        <span className="font-mono px-2 truncate">{deviceId}</span>
                                        <Settings size={10} />
                                    </button>
                                )
                            }

                        </div>
                    </div>

                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setActiveTab('traffic')}
                        className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'traffic' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
                    >
                        Semáforo
                    </button>
                    <button
                        onClick={() => setActiveTab('sensor')}
                        className={`cursor-pointer whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sensor' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
                    >
                        Sensores
                    </button>
                    <button
                        onClick={() => setActiveTab('docs')}
                        className={`cursor-pointer whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'docs' ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-900/50'}`}
                    >
                        <BookOpen size={16} /> Docs / API
                    </button>
                </div>
            </div>
        </header>
    );
}

export { Header };
