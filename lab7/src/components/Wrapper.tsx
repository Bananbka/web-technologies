type WrapperProps = {
    className?: string;
    children: React.ReactNode;
};

export function Wrapper({className, children}: WrapperProps) {
    const styles: string = className ? className : "min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 w-screen gap-6";
    return <div className={styles}>
        {children}
    </div>
}