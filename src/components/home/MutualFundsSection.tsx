import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTypography } from '../../hooks/useTypography';
import { MutualFundSlider } from '../mutual-funds';

export default function MutualFundsSection() {
  const { t } = useTranslation();
  const { getTypographyClasses } = useTypography();

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24">
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