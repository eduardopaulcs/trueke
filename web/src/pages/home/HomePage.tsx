import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useMarkets } from '@/hooks/use-markets';
import { useBrands } from '@/hooks/use-brands';
import { HeroSection } from './components/HeroSection';
import { FeaturedMarketsSection } from './components/FeaturedMarketsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FeaturedBrandsSection } from './components/FeaturedBrandsSection';
import { StatsSection } from './components/StatsSection';
import { VendorCtaSection } from './components/VendorCtaSection';
import { LandingNav } from './components/LandingNav';
import { LandingFooter } from './components/LandingFooter';

export function HomePage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: marketsData, isLoading: marketsLoading, error: marketsError } = useMarkets({ limit: 6 });
  const { data: brandsData, isLoading: brandsLoading, error: brandsError } = useBrands({ limit: 6 });

  if (authLoading) return null;
  if (isAuthenticated) return <Navigate to="/home" replace />;

  return (
    <main className="min-h-screen bg-cream">
      <LandingNav />
      <HeroSection />

      <FeaturedMarketsSection
        markets={marketsData?.items ?? []}
        isLoading={marketsLoading}
        error={marketsError}
      />

      <HowItWorksSection />

      <StatsSection
        marketsTotal={marketsData?.pagination.total}
        brandsTotal={brandsData?.pagination.total}
        isLoading={marketsLoading || brandsLoading}
      />

      <FeaturedBrandsSection
        brands={brandsData?.items ?? []}
        isLoading={brandsLoading}
        error={brandsError}
      />

      <VendorCtaSection />

      <LandingFooter />
    </main>
  );
}
