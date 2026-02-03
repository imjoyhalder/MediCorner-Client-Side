

import CategorySection from '@/components/modules/category/category-section';
import FAQSection from '@/components/modules/home-page/FAQSection';
import FeaturedMedicines from '@/components/modules/home-page/featuresMedicine';
import HeroSection from '@/components/modules/home-page/HeroSection';
import TrustSection from '@/components/modules/home-page/trustSection';


const HomePage = async() => {
    
    return (
        <div className="flex flex-col min-h-screen">
            {/* Main content */}
            <main className="flex-1">
                <HeroSection />
                <CategorySection/>
                <FeaturedMedicines/>
                <TrustSection/>
                <FAQSection/>
            </main>
        </div>
    );
};

export default HomePage;
