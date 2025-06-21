import { Trans, useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "../ui/Button";
import TextBlock from "../common/TextBlock";

const MarginLendingSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      ref={ref}
      className="bg-no-repeat bg-cover bg-right lg:bg-center py-[150px] md:py-[237px] overflow-hidden"
      style={{ backgroundImage: "url(/images/margin-lending-background.jpg)" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end rtl:justify-start">
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:w-2/3"
          >
            <TextBlock
              variant="light"
              title={
                <Trans
                  i18nKey="marginLending.title"
                  components={[
                    <span className="text-icap-gold" />,
                    <br />
                  ]}
                />
              }
              subtitle={t("marginLending.subtitle")}
              actions={
                <Button as="a" href="#">
                  {t("marginLending.button")}
                </Button>
              }
              className="text-center items-center lg:text-right lg:items-end rtl:lg:items-start"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarginLendingSection; 