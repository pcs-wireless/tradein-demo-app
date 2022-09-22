export const getApiUrl = () => {
  if (
    window.location.origin.indexOf("test") > 0 ||
    window.location.origin.indexOf("localhost") > 0
  ) {
    return process.env.REACT_APP_GRAPHQL_URL_TEST;
  }
  return process.env.REACT_APP_GRAPHQL_URL_PROD;
};

export const getCmsApiUrl = () => {
  if (
    window.location.origin.indexOf("test") > 0 ||
    window.location.origin.indexOf("localhost") > 0
  ) {
    return process.env.REACT_APP_STRAPI_URL_TEST;
  }
  return process.env.REACT_APP_STRAPI_URL_PROD;
};

export const getPartnerId = () => {
  if (
    window.location.origin.indexOf("test") > 0 ||
    window.location.origin.indexOf("localhost") > 0 ||
    window.location.origin.indexOf("dev") > 0
  ) {
    return process.env.REACT_APP_PARTNER_ID_TEST;
  }
  // if (
  //   window.location.origin.indexOf(
  //     "appsvc-pcs-tradeinfe-prod.azurewebsites.net"
  //   ) > 0 ||
  //   window.location.origin.indexOf("gamestoptradein") > 0
  // ) {
  return process.env.REACT_APP_PARTNER_ID_PROD;
  // }
};
