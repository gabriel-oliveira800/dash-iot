import { useState } from "react";
import { Copy } from "lucide-react";

function CopyBlock({ text, enableCopy = true }: { text: string, enableCopy?: boolean }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className="relative group cursor-pointer"
            onClick={() => { if (enableCopy) handleCopy(); }}
        >
            <pre className="bg-slate-100 p-4 flex justify-between items-center font-mono text-sm rounded-lg overflow-x-auto">
                {text}
            </pre>

            {enableCopy && (
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer"
                >
                    {copied ? 'Copiado!' : <><Copy size={12} /> Copiar</>}
                </button>
            )}
        </div>
    );
}

export { CopyBlock };