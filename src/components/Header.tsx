import { BookOpen, Server } from "lucide-react";
import type { Tab } from "./TabsContent";

interface HeaderProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

function Header({ activeTab = 'traffic', setActiveTab }: HeaderProps) {
    return (
        <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-indigo-500 p-2 rounded-lg">
                        <Server size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">I.O.T Cloud</h1>
                        <p className="text-xs text-slate-400">Monitoramento dos Sensores</p>
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
