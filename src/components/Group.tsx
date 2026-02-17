export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}


function Group({ children, ...props }: GroupProps) {
    return (
        <div className="space-y-4" {...props}>
            {children}
        </div>
    )
}

export { Group };