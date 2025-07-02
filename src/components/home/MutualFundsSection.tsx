import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MutualFundSlider } from '../mutual-funds';

export default function MutualFundsSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Section Header */}
      <div className="mx-auto max-w-[90%] sm:max-w-[85%] md:max-w-4xl lg:max-w-5xl px-4 text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-normal leading-[1.2] tracking-tight">
            <span className="text-[#C87D55]">Grow</span> Your Wealth with Confidence
          </h2>
          <p className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-[90%] sm:max-w-[80%] md:max-w-2xl mx-auto">
            Explore a diverse range of expertly managed funds tailored to your goals
          </p>
        </motion.div>
      </div>

      {/* Mutual Fund Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MutualFundSlider />
      </motion.div>
    </section>
  );
} 