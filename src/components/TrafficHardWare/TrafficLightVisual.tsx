interface TrafficLightVisualProps {
    color: string;
    label: string;
}

function TrafficLightVisual({ color, label }: TrafficLightVisualProps) {
    return (
        <div className="bg-gray-900 px-2 py-4 rounded-xl shadow-2xl border border-gray-700 flex flex-col gap-4 items-center w-24">
            <div className={`w-12 h-12 rounded-full border-4 border-gray-800 transition-all duration-300 ${color === 'red' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'bg-red-900 opacity-30'}`} />
            <div className={`w-12 h-12 rounded-full border-4 border-gray-800 transition-all duration-300 ${color === 'yellow' ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]' : 'bg-yellow-900 opacity-30'}`} />
            <div className={`w-12 h-12 rounded-full border-4 border-gray-800 transition-all duration-300 ${color === 'green' ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]' : 'bg-green-900 opacity-30'}`} />
            <span className="text-gray-400 text-xs font-mono mt-2">{label}</span>
        </div>
    );
}

export { TrafficLightVisual }