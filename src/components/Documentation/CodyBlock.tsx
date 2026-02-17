import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { Copy } from "lucide-react";
import { useState } from "react";

type Language = 'html' | 'cpp' | 'c' | 'csharp' | 'html'

interface CodyBlockProps {
    text: string;
    language?: Language;
    enableCopy?: boolean;
}

function CopyBlock({ text, language = "html", enableCopy = true }: CodyBlockProps) {
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

            <SyntaxHighlighter language={language} style={docco}>
                {text}
            </SyntaxHighlighter>
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

interface CopyBlockWithLabelProps {
    title: string;
    code: string;
}

function CopyBlockWithLabel({ title, code }: CopyBlockWithLabelProps) {
    return (
        <div>
            <label className="text-xs font-bold text-slate-500 uppercase">{title}</label>
            <CopyBlock text={code} />
        </div>
    )
}

export { CopyBlock, CopyBlockWithLabel };