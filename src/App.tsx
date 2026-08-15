import { useCallback } from 'react';
import { CartProvider } from './cart';
import { useActiveSection } from './hooks';
import type { Section } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CartSidebar } from './components/CartSidebar';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Location } from './components/Location';
import { Footer } from './components/Footer';

const SECTION_IDS: Section[] = ['inicio', 'menu', 'galeria', 'opiniones', 'ubicacion'];

export default function App() {
  const active = useActiveSection(SECTION_IDS);

  const navigate = useCallback((s: Section) => {
    const el = document.getElementById(s);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar active={active} onNavigate={navigate} />
        <Hero onNavigate={navigate} />
        <MenuSection />
        <Gallery />
        <Testimonials />
        <Location />
        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  );
}
