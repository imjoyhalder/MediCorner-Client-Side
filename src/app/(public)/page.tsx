import FooterSection from '@/components/layouts/footer';
import { Navbar } from '@/components/layouts/navbar1';
import CategorySection from '@/components/modules/home-page/CategorySection';
import HeroSection from '@/components/modules/home-page/HeroSection';
import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Main content */}
            <main className="flex-1">
                <HeroSection />
                <CategorySection />
            </main>
        </div>
    );
};

export default HomePage;
