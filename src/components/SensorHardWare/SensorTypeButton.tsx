import type { SensorType } from "../../data/sensor";

interface SensorTypeButtonProps {
    type: SensorType
    currentType: SensorType
    onClick: () => void;
    title: string;
    description: string;
}

function SensorTypeButton({ type, currentType, onClick, title, description }: SensorTypeButtonProps) {
    const isUltrasonic = type === currentType;

    const style = isUltrasonic ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500' : 'border-slate-200 hover:bg-slate-50';

    return (
        <button
            onClick={onClick}
            className={`cursor-pointer p-3 text-left rounded-lg border transition-all ${style}`}
        >
            <div className="font-bold">{title}</div>
            <div className="text-xs opacity-70">{description}</div>
        </button>
    );
}

export { SensorTypeButton };