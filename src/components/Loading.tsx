interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
}

function Loading({ text = "Carregando Sistema", ...props }: LoadingProps) {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white gap-2" {...props}>
            {text}
        </div>
    );
}

export { Loading };
