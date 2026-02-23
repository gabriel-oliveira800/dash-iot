import { ArrowRightLeft, Database } from "lucide-react";

interface MagneticContentProps {
    isOpen: boolean;
}

function MagneticContent({ isOpen }: MagneticContentProps) {
    return (
        <div className="text-center">
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${isOpen ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {isOpen ? <ArrowRightLeft size={48} /> : <Database size={48} />}
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
                {isOpen ? 'ABERTO / AFASTADO' : 'FECHADO / SEGURO'}
            </h3>
            <p className="text-slate-500 mt-2">Status do sensor magnético</p>
        </div>
    );
}

export { MagneticContent };
