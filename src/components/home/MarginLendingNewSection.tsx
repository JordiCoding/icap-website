import React, { useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useTypography } from '../../hooks/useTypography';
import Button from '../ui/Button';

const MarginLendingNewSection: React.FC = () => {
  const { t } = useTranslation();
  const { getTypographyClasses } = useTypography();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <section 
      ref={ref}
      className="relative bg-white py-[150px] md:py-[200px] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 lg:pr-30">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-y-12 lg:gap-x-[100px] rtl:lg:flex-row-reverse">
          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex-shrink-0 flex justify-center lg:justify-start"
          >
            <img
              src="/images/marginlending.png"
              alt="Margin Lending"
              className="w-[500px] h-auto object-contain"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex-1"
          >
            <div className="text-center lg:text-right">
              {/* Title */}
              <h2 className={`text-4xl lg:text-5xl text-icap-primary mb-6 ${getTypographyClasses('title')}`}>
                <Trans
                  i18nKey="marginLending.title"
                  components={[
                    <span className="text-[#C87D55]" />,
                    <br />
                  ]}
                />
              </h2>
              
              {/* Subtitle */}
              <p className={`text-lg text-gray-600 mb-8 ${getTypographyClasses('body')}`}>
                {t('marginLending.subtitle')}
              </p>
              
              {/* Button */}
              <Button 
                variant="black" 
                as="a" 
                href="#"
              >
                {t('marginLending.button')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarginLendingNewSection; 