import { gql } from 'graphql-request';

export const GET_FUND_SLIDER_SECTION = gql`
  query GetFundSliderSection {
    fundSliderSections(where: { isVisible: true }) {
      title
      subtitle
      funds(where: { isVisible: true }, orderBy: order_ASC) {
        id
        title
        description
        riskLevel
        isShariaCompliant
        icon {
          url
        }
        order
      }
    }
  }
`; 