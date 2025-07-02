import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { FundCard } from './FundCard';
import type { FundCardProps } from './types';

const SAMPLE_FUNDS: FundCardProps[] = [
  {
    id: '1',
    title: 'ICAP Conservative Fund',
    description: 'A low-risk fund focused on capital preservation through investments in high-quality fixed income securities and money market instruments.',
    riskLevel: 'low',
    isShariaCompliant: true,
    icon: '/icons/cube.svg'
  },
  {
    id: '2',
    title: 'ICAP Balanced Fund',
    description: 'A medium-risk fund that seeks to achieve both capital growth and income through a diversified portfolio of stocks and bonds.',
    riskLevel: 'medium',
    isShariaCompliant: false,
    icon: '/icons/pyramid.svg'
  },
  {
    id: '3',
    title: 'ICAP Growth Fund',
    description: 'A high-risk fund aimed at maximizing capital appreciation through investments in growth stocks and other high-potential securities.',
    riskLevel: 'high',
    isShariaCompliant: true,
    icon: '/icons/hexagon.svg'
  },
  {
    id: '4',
    title: 'ICAP Islamic Fund',
    description: 'A Sharia-compliant fund that invests in a diversified portfolio of Islamic securities and Sukuk instruments.',
    riskLevel: 'medium',
    isShariaCompliant: true,
    icon: '/icons/pyramid.svg'
  }
];

export function MutualFundSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <div className="max-w-[1062px] mx-auto px-6">
      <div className="py-[12px]">
        <div ref={sliderRef} className="keen-slider">
          {SAMPLE_FUNDS.map((fund) => (
            <div 
              key={fund.id} 
              className="keen-slider__slide"
              style={{
                minWidth: 'calc(330px + 24px + (0.02 * 330px))',
                minHeight: 'calc(454px + 24px + (0.02 * 454px))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px'
              }}
            >
              <FundCard {...fund} />
            </div>
          ))}
        </div>

        {loaded && instanceRef.current && (
          <div className="flex justify-between items-center mt-12">
            <div className="flex gap-2">
              {[...Array(SAMPLE_FUNDS.length)].map((_, idx) => (
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
                disabled={currentSlide === SAMPLE_FUNDS.length - 1}
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