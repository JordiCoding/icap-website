import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { NewsCard } from './NewsCard';
import type { NewsCardProps } from '../../types/news';

interface NewsSliderProps {
  articles: NewsCardProps[];
}

export function NewsSlider({ articles }: NewsSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [shouldShowNavigation, setShouldShowNavigation] = useState(true);
  const [maxSlide, setMaxSlide] = useState(0);

  // Calculate slides per view based on screen width
  const getSlidesPerView = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  // Update navigation visibility and max slide based on screen size and number of articles
  useEffect(() => {
    const updateSliderSettings = () => {
      if (!articles) return;
      
      const slidesPerView = getSlidesPerView();
      const totalArticles = articles.length;
      
      // Show navigation based on number of articles vs visible slides
      setShouldShowNavigation(totalArticles > slidesPerView);
      
      // Calculate max slide index based on total articles and slides per view
      setMaxSlide(Math.max(0, totalArticles - slidesPerView));
    };

    updateSliderSettings();
    window.addEventListener('resize', updateSliderSettings);
    
    return () => {
      window.removeEventListener('resize', updateSliderSettings);
    };
  }, [articles]);

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "snap",
    slides: { 
      perView: 1,
      spacing: 0,
    },
    breakpoints: {
      // Tablet - 2 cards
      '(min-width: 768px)': {
        slides: { 
          perView: 2,
          spacing: 0,
        }
      },
      // Desktop - 3 cards
      '(min-width: 1024px)': {
        slides: { 
          perView: 3,
          spacing: 0,
        }
      }
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Loading state
  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-[1062px] mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-[300px] bg-gray-200 rounded-[20px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1062px] mx-auto px-6">
      <div className="py-[12px]">
        <div ref={sliderRef} className="keen-slider">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="keen-slider__slide"
              style={{
                minWidth: 'calc(330px + 24px + (0.02 * 330px))',
                minHeight: 'calc(300px + 24px + (0.02 * 300px))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px'
              }}
            >
              <NewsCard {...article} />
            </div>
          ))}
        </div>

        {loaded && instanceRef.current && shouldShowNavigation && (
          <div className="flex justify-between items-center mt-12">
            <div className="flex gap-2">
              {[...Array(maxSlide + 1)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${currentSlide === idx ? 'w-8 bg-[#C87D55]' : 'w-2 bg-gray-300'}
                  `}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => instanceRef.current?.prev()}
                disabled={currentSlide === 0}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  border border-gray-200 bg-white
                  hover:bg-gray-50 disabled:opacity-50
                  transition-all duration-200
                `}
                aria-label="Previous slide"
              >
                <svg
                  className="h-6 w-6 rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() => instanceRef.current?.next()}
                disabled={currentSlide >= maxSlide}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  bg-[#C87D55] text-white
                  hover:bg-[#B66D45] disabled:opacity-50
                  transition-all duration-200
                `}
                aria-label="Next slide"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 