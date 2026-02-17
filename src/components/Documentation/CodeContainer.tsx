import { CopyBlock } from "./CodyBlock";

interface CodeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    code?: string | null;
}

function CodeContainer({ children, code, ...props }: CodeContainerProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200" {...props}>
            {children}
            {code && <CopyBlock text={code} enableCopy={false} />}
        </div>
    );
}

interface CodeContainerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    text: string | React.ReactNode;
    icon?: React.ReactNode | null;
    textColor?: string | null;
}


function CodeContainerTitle({ text, icon, textColor, ...props }: CodeContainerTitleProps) {
    return (
        <h3 className={`text-lg font-bold ${textColor || 'text-indigo-600'} mb-4 flex items-center gap-2`} {...props}>
            {typeof text === 'string' ? (<>{icon} {text}</>) : text}
        </h3>
    )
}

function CodeContainerSubtitle({ text, icon, textColor, ...props }: CodeContainerTitleProps) {
    return (
        typeof text === 'string' ? (
            <p  {...props} className={`text-sm ${textColor || 'text-slate-600'} mb-4`}>{text}</p>
        ) : (text)
    )
}

CodeContainer.Title = CodeContainerTitle;
CodeContainer.Subtitle = CodeContainerSubtitle;

export { CodeContainer };