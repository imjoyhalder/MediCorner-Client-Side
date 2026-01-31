import CategorySection from '@/components/modules/home-page/CategorySection';
import HeroSection from '@/components/modules/home-page/HeroSection';


const HomePage = async() => {
    
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
