interface SectionWrapperProps {
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
}

const SectionWrapper = ({
    style,
    className,
    children,
}: SectionWrapperProps) => {
    return (
        <section style={style} className={className}>
            {children}
        </section>
    );
};

export default SectionWrapper;