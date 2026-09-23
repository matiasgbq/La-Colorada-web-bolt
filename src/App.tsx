import { useCallback } from 'react';
import { CartProvider } from './cart';
import { useActiveSection } from './hooks';
import { SITE_SECTION_IDS, type Section } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CartSidebar } from './components/CartSidebar';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { IS_FULL_SITE } from './site-mode';

const SECTION_IDS: Section[] = SITE_SECTION_IDS.filter(
  (section) => IS_FULL_SITE || section !== 'menu',
);

export default function App() {
  const active = useActiveSection(SECTION_IDS);

  const navigate = useCallback((s: Section) => {
    const el = document.getElementById(s);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar
          active={active}
          onNavigate={navigate}
          showInteractiveMenu={IS_FULL_SITE}
        />
        <Hero onNavigate={navigate} showInteractiveMenu={IS_FULL_SITE} />
        {IS_FULL_SITE && <MenuSection />}
        <Gallery />
        <Testimonials />
        <Location />
        <Footer />
        {IS_FULL_SITE && <CartSidebar />}
      </div>
    </CartProvider>
  );
}
