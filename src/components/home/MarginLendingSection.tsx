import { Trans, useTranslation } from "react-i18next";
import Button from "../ui/Button";
import TextBlock from "../common/TextBlock";

const MarginLendingSection = () => {
  const { t } = useTranslation();

  return (
    <div
      className="bg-no-repeat bg-cover bg-right lg:bg-center py-[237px]"
      style={{ backgroundImage: "url(/images/margin-lending-background.jpg)" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end rtl:justify-start">
          <div className="lg:w-2/3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginLendingSection; 