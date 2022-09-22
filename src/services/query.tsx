import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { getPartnerId, getApiUrl, getCmsApiUrl } from "../utils";

const client = new ApolloClient({
  uri: getApiUrl(),
  cache: new InMemoryCache(),
});

export const GET_STATE_OR_PROVINCES = gql`
  query StatesOrProvinces($countryId: Int!, $pageSize: Int) {
    statesOrProvinces(countryId: $countryId, pageSize: $pageSize) {
      data {
        id
        name
      }
    }
  }
`;

export const GET_CITIES = gql`
  query Cities($countryId: Int!, $pageSize: Int) {
    cities(countryId: $countryId, pageSize: $pageSize) {
      data {
        id
        name
      }
    }
  }
`;

export const GET_DEVICES = gql`
  query GetDevices($partnerId: String!) {
    partner(id: $partnerId) {
      devices {
        id
        category
      }
      countries {
        code
        currencies {
          code
        }
      }
    }
  }
`;

export const GET_DEVICE_MANUFACTURERS = gql`
  query GetDeviceManufacturers($partnerId: String, $deviceId: String) {
    manufacturers(partnerId: $partnerId, deviceId: $deviceId) {
      id
      name
      description
    }
  }
`;

export const GET_DEVICE_QUESTIONARES = gql`
  query GetDeviceCondition($deviceId: String!, $partnerId: String!) {
    questionnaires(deviceId: $deviceId, partnerId: $partnerId) {
      id
      question
    }
  }
`;

export const GET_PARTNER_GRADE_ID = gql`
  query partnerGradeId($questionnaireId: String, $yesOrNo: String!) {
    deviceConditions(questionnaireId: $questionnaireId, yesOrNo: $yesOrNo) {
      id
      partnerGrade {
        id
      }
    }
  }
`;

export const GET_ESTIMATED_VALUE = gql`
  mutation getEstimatedValue($calculatePriceInput: CalculatePriceInput!) {
    calculatePrice(calculatePriceInput: $calculatePriceInput) {
      price {
        product {
          id
          sku
        }
        effectivityDate
        value
        partnerGrade {
          id
          name
        }
        id
        currency
      }
      success
      code
    }
  }
`;

export const GET_MODELS = gql`
  query GetModelsByDeviceIdAndManufacturerId(
    $partnerId: String
    $deviceId: String
    $manufacturerId: String
  ) {
    models(
      partnerId: $partnerId
      deviceId: $deviceId
      manufacturerId: $manufacturerId
    ) {
      id
      name
      nickName
      storages {
        id
        name
        description
        displayOrder
      }
    }
  }
`;

export const GET_MODELS_STORAGE = gql`
  query GetModelsStorage($deviceId: String, $manufacturerId: String) {
    models(deviceId: $deviceId, manufacturerId: $manufacturerId) {
      id
      storages {
        id
        name
        description
        displayOrder
      }
    }
  }
`;

export const GET_MODELS_COLORS = gql`
  query GetModelsColors {
    colors {
      id
      name
    }
  }
`;

export const GET_MODELS_CARRIERS = gql`
  query GetModelsCarriers {
    carriers {
      id
      name
    }
  }
`;

export const GET_DEVICE_SKU = gql`
  query GetDeviceSku(
    $deviceId: String!
    $manufacturerId: String!
    $modelId: String!
    $storageId: String
    $carrierId: String
  ) {
    productNearestMatch(
      deviceId: $deviceId
      manufacturerId: $manufacturerId
      modelId: $modelId
      storageId: $storageId
      carrierId: $carrierId
    ) {
      product {
        sku
        id
      }
      success
      message
    }
  }
`;

export const CONFIRM_TRADE = gql`
  mutation ConfirmTradeIn($createTradeInInput: CreateTradeInInput!) {
    createTradeIn(createTradeInInput: $createTradeInInput) {
      code
      success
      message
      tradeIn {
        customer {
          firstName
          lastName
          email
          id
        }
        status
        id
        tradeInDate
      }
    }
  }
`;

export const TRACK_TRADE_STATUS = gql`
  query TrackTradeStatus($transactionNumber: String!, $email: String!) {
    trackTradeIn(transactionNumber: $transactionNumber, email: $email) {
      id
      transactionNumber
      price {
        value
        currency {
          code
        }
      }
      product {
        device {
          id
          name
        }
        model {
          name
          storages {
            size
          }
          image {
            mediumSizeSourceURL
          }
        }
      }
      firstName
      lastName
      email
      street1
      city
      phone
      status {
        id
        name
      }
      shippingKitDelivery
      country
    }
  }
`;

export const VERIFY_TRACNSACTION_NO = gql`
  query TrackTradeStatus($transactionNumber: String!, $email: String!) {
    trackTradeIn(transactionNumber: $transactionNumber, email: $email) {
      status {
        id
        name
      }
    }
  }
`;

export const GET_LOCALIZATIONS = gql`
  query Partners {
    partners {
      localizations {
        id
        displayName
        locale
        isDefault
      }
    }
  }
`;

export const GET_PARTNER = gql`
  query Partner($partnerId: String!) {
    partner(id: $partnerId) {
      countries {
        id
        code
        name
      }
    }
  }
`;

export const GetHomePageData = ({ locale }: { locale: string }) =>
  fetch(
    `${getCmsApiUrl()}/homepages?filters[partner][nid]=${getPartnerId()}&locale=${locale}&populate[0]=howItWorks&populate[1]=howItWorks.steps&populate[2]=howItWorks.steps.icon&populate[3]=devicesImage`
  ).then((res) => res.json());

export const GetHeaderData = ({ locale }: { locale: string }) =>
  fetch(
    `${getCmsApiUrl()}/headers?filters[partner][nid]=${getPartnerId()}&locale=${locale}&populate=logo`
  ).then((res) => res.json());

export const GetFooterData = ({ locale }: { locale: string }) =>
  fetch(
    `${getCmsApiUrl()}/footers?filters[partner][nid]=${getPartnerId()}&locale=${locale}`
  ).then((res) => res.json());

export const GetAboutUsData = ({ locale }: { locale: string }) =>
  fetch(
    `${getCmsApiUrl()}/informational-pages?filters[partner][nid]=${getPartnerId()}&filters[type]=ABOUT_US&locale=${locale}`
  ).then((res) => res.json());

export const GetSupportData = ({ locale }: { locale: string }) =>
  fetch(
    `${getCmsApiUrl()}/informational-pages?filters[partner][nid]=${getPartnerId()}&filters[type]=SUPPORT&locale=${locale}`
  ).then((res) => res.json());

export const GetContactUsData = ({ locale }: { locale: string }) =>
  fetch(
    `${getCmsApiUrl()}/informational-pages?filters[partner][nid]=${getPartnerId()}&filters[type]=CONTACT_US&locale=${locale}`
  ).then((res) => res.json());

export const GetTermsAndConditionsData = ({ locale }: { locale: string }) =>
  fetch(
    `${getCmsApiUrl()}/informational-pages?filters[partner][nid]=${getPartnerId()}&filters[type]=TERMS_AND_CONDITIONS&locale=${locale}`
  ).then((res) => res.json());

export const GetPrivacyPolicyData = ({ locale }: { locale: string }) =>
  fetch(
    `${getCmsApiUrl()}/informational-pages?filters[partner][nid]=${getPartnerId()}&filters[type]=PRIVACY_POLICY&locale=${locale}`
  ).then((res) => res.json());

export const GetLocalizations = () => useQuery(GET_LOCALIZATIONS);

export const TrackTradeStatus = ({
  transactionNumber,
  email,
}: {
  transactionNumber: string | null;
  email: string | null;
}) => {
  const { loading, error, data } = useQuery(TRACK_TRADE_STATUS, {
    variables: { transactionNumber, email },
    notifyOnNetworkStatusChange: true,
  });
  if (loading) return { loading };
  if (error) return { error };

  return data;
};

export default client;
