import { lazy, FC } from "react";

import {
  ROUTE_HOME,
  ROUTE_ABOUT_US,
  ROUTE_SUPPORT,
  ROUTE_CONTACT_US,
  ROUTES_DEVICE_CONDITION,
  ROUTES_STATUS_TRACKING,
  ROUTE_LOGIN,
  ROUTES_SHIPPING_INFO,
  ROUTES_CONFIRM_TRADE,
  ROUTES_SUCCESS_PAGE,
  ROUTES_THANKYOU_PAGE,
  ROUTES_TRANSACTION_EXPIRED,
  ROUTES_TERMS_CONDITION,
  ROUTES_PRIVACY_POLICY,
  ROUTE_CHOOSE_DEVICES,
  ROUTE_GET_QUOTE_PHONE,
  ROUTE_GET_QUOTE_LAPTOP,
  ROUTE_GET_QUOTE_WATCH,
  ROUTES_SHIPPING_STATUS,
  ROUTE_SIGNUP,
  VERIFY_TRANSACTION_ERROR,
  OFFER_ACCEPTED,
  OFFER_DECLINED,
} from "../routings/constants/routes";

const Home = lazy(() => import("../pages/Home"));
const AboutUs = lazy(() => import("../pages/About"));
const Support = lazy(() => import("../pages/Support"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Thankyou = lazy(() => import("../pages/Thankyou"));
const TransactionExpired = lazy(
  () => import("../pages/TransactionExpiredPage")
);
const StatusTracking = lazy(() => import("../components/StatusTracking"));
const ConfirmTrade = lazy(() => import("../components/ConfirmTradeIn"));
const ShippingInfo = lazy(() => import("../components/ShippingInfo"));
const SuccessPage = lazy(() => import("../pages/SuccessPage"));
const DeviceCondition = lazy(() => import("../components/DeviceCondition"));
const Terms = lazy(() => import("../pages/Terms"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const ChooseDevices = lazy(() => import("../components/ChooseDevices"));
const GetQuotePhone = lazy(() => import("../components/GetQuotePhone"));
const GetQuoteLaptop = lazy(() => import("../components/GetQuoteLaptop"));
const GetQuoteWatch = lazy(() => import("../components/GetQuoteWatch"));
const ShippingStatus = lazy(() => import("../components/ShippingStatus"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const VerifyTransactionError = lazy(
  () => import("../pages/VerifyTransactionError")
);
const OfferAccepted = lazy(() => import("../pages/OfferAccepted"));
const OfferDeclined = lazy(() => import("../pages/OfferDeclined"));

interface AppRoutesProps {
  location: string;
}

const AppRoutes: FC<AppRoutesProps> = ({ location }) => {
  switch (location) {
    case ROUTE_LOGIN:
      return <Login />;
    case ROUTE_SIGNUP:
      return <SignUp />;
    case ROUTE_HOME:
      return <Home />;
    case ROUTE_ABOUT_US:
      return <AboutUs />;
    case ROUTE_SUPPORT:
      return <Support />;
    case ROUTE_CONTACT_US:
      return <ContactUs />;
    case ROUTES_THANKYOU_PAGE:
      return <Thankyou />;
    case ROUTES_STATUS_TRACKING:
      return <StatusTracking />;
    case ROUTES_SHIPPING_STATUS:
      return <ShippingStatus />;
    case ROUTES_SHIPPING_INFO:
      return <ShippingInfo />;
    case ROUTES_CONFIRM_TRADE:
      return <ConfirmTrade />;
    case ROUTES_SUCCESS_PAGE:
      return <SuccessPage />;
    case ROUTES_DEVICE_CONDITION:
      return <DeviceCondition />;
    case ROUTES_TRANSACTION_EXPIRED:
      return <TransactionExpired />;
    case ROUTES_TERMS_CONDITION:
      return <Terms />;
    case ROUTES_PRIVACY_POLICY:
      return <PrivacyPolicy />;
    case ROUTE_CHOOSE_DEVICES:
      return <ChooseDevices />;
    case ROUTE_GET_QUOTE_PHONE:
      return <GetQuotePhone />;
    case ROUTE_GET_QUOTE_LAPTOP:
      return <GetQuoteLaptop />;
    case ROUTE_GET_QUOTE_WATCH:
      return <GetQuoteWatch />;
    case VERIFY_TRANSACTION_ERROR:
      return <VerifyTransactionError />;
    case OFFER_ACCEPTED:
      return <OfferAccepted />;
    case OFFER_DECLINED:
      return <OfferDeclined />;
    default:
      return null;
  }
};

export default AppRoutes;
