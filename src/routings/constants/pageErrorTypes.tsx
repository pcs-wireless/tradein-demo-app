// import IconError400 from '../assets/images/img_400.svg';
import IconError403 from "../../assets/images/accessDenied.svg";
import IconError404 from "../../assets/images/404.svg";
import IconError500 from "../../assets/images/ServerError.svg";
// import IconError502 from '../assets/images/img_502.svg';
// import IconError503 from '../assets/images/img_503.svg';

export const error400 = {
  errorIcon: IconError404,
  errorId: "error_400",
  errorAltText: "Error 400",
  errorTitle: "400: Pardon?",
  errorMessage:
    "We didn't understand your request. <br>It was just bad overall.",
  errorButtonTitle: "Try again",
};

export const error403 = {
  errorIcon: IconError403,
  errorId: "error_403",
  errorAltText: "Error 403",
  errorTitle: "403: Stay out",
  errorMessage: "You don't have permission to view that page.",
  errorButtonTitle: "Go to home page",
};

export const error404 = {
  errorIcon: IconError404,
  errorId: "error_404",
  errorAltText: "Error 404",
  errorTitle: "404",
  errorMessage: "Sorry, page not found",
  errorButtonTitle: "Go to home page",
};

export const error500 = {
  errorIcon: IconError500,
  errorId: "error_500",
  errorAltText: "Error 500",
  errorTitle: "500: Something went wrong",
  errorMessage: "We're working hard to fix the problem, so try again later.",
  errorButtonTitle: "Try again",
};

export const error502 = {
  errorIcon: IconError404,
  errorId: "error_502",
  errorAltText: "Error 502",
  errorTitle: "502: Bad gateway",
  errorMessage: "Sorry, there is a server issue. Please come back later",
  errorButtonTitle: "Try again",
};

export const error503 = {
  errorIcon: IconError404,
  errorId: "error_503",
  errorAltText: "Error 503",
  errorTitle: "503: We're being overrun",
  errorMessage:
    "It seems we're too popular for our own good.<br>Try checking later.",
  errorButtonTitle: "Try again",
};
