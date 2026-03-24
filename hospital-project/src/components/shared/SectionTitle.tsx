interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle = ({ title, subtitle, centered = false }: SectionTitleProps) => {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <p className="text-sm text-blue-600 font-medium mb-1">{subtitle}</p>
      )}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default SectionTitle;
