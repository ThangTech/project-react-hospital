import { Link } from 'react-router-dom';

type Breadcrumb = {
  label: string;
  path?: string;
}

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

const PageHero = ({ title, subtitle, breadcrumbs = [] }: PageHeroProps) => {
  return (
    <section className="bg-regal-blue py-12 px-6">

      {breadcrumbs.length > 0 && (
        <nav className="text-sm text-blue-200 mb-3 flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-white">Home</Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <span>/</span>
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-white">{crumb.label}</Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {subtitle && <p className="mt-2 text-blue-100 text-sm">{subtitle}</p>}
    </section>
  );
};

export default PageHero;
