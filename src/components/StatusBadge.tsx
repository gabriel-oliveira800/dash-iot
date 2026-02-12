import { Wifi } from "lucide-react";

interface StatusBadgeProps {
    timestamp: Date;
}

function StatusBadge({ timestamp }: StatusBadgeProps) {
    const timeVal = timestamp.getTime() || 0;
    const diff = Date.now() - timeVal;
    const isOnline = diff < 15000;

    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <Wifi size={12} />
            {isOnline ? 'ONLINE' : 'OFFLINE (Simulado)'}
        </div>
    );
};

export { StatusBadge };
