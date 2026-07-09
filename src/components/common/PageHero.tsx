import heroImage from '../../assets/hero-image.jpg';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  variant?: 'image' | 'gradient';
  overlayColor?: 'blue' | 'purple' | 'teal' | 'indigo';
  accentText?: string;
}

const overlayGradients: Record<string, string> = {
  blue: 'from-blue-600/80 via-blue-600/50 to-transparent',
  purple: 'from-purple-600/80 via-purple-600/50 to-transparent',
  teal: 'from-teal-600/80 via-teal-600/50 to-transparent',
  indigo: 'from-indigo-600/80 via-indigo-600/50 to-transparent',
};

function renderTitle(title: string, accentText?: string) {
  if (!accentText || !title.includes(accentText)) {
    return <>{title}</>;
  }
  const parts = title.split(accentText);
  return (
    <>
      {parts[0]}
      <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
        {accentText}
      </span>
      {parts[1] || ''}
    </>
  );
}

function PageHero({ title, subtitle, variant = 'image', overlayColor = 'blue', accentText }: PageHeroProps) {
  if (variant === 'gradient') {
    return (
      <section
        className="relative w-full h-[250px] md:h-[350px] overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a3e 40%, #24243e 100%)' }}
      >
        {/* Radial glow - more visible */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(ellipse at center bottom, rgba(99,102,241,0.25) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Content - centered */}
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div className="max-w-3xl px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {renderTitle(title, accentText)}
            </h1>
            {subtitle && (
              <p className="mt-5 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 40V20C240 5 480 0 720 10C960 20 1200 35 1440 20V40H0Z" fill="white" />
          </svg>
        </div>
      </section>
    );
  }

  // Image variant
  const gradient = overlayGradients[overlayColor];
  return (
    <section className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
      <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} aria-hidden="true" />
      <div className="relative z-10 flex items-center h-full">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-3 text-base md:text-lg text-white/80 max-w-2xl">{subtitle}</p>}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 40V20C240 5 480 0 720 10C960 20 1200 35 1440 20V40H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

export default PageHero;
