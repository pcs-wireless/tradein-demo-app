import React, { lazy, Suspense, FC } from "react";
import { NOT_FOUND } from "redux-first-router";
import { useAppSelector } from "../app/hooks";
import StepsProgress from "../features/StepsProgress";
import Spinner from "../features/Spinner";

import {
  ROUTE_ERROR_400,
  ROUTE_ERROR_403,
  ROUTE_ERROR_404,
  ROUTE_ERROR_500,
  ROUTE_ERROR_502,
  ROUTE_ERROR_503,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_ABOUT_US,
  ROUTE_SUPPORT,
  ROUTE_CONTACT_US,
  ROUTES_DEVICE_CONDITION,
  ROUTES_STATUS_TRACKING,
  ROUTES_SHIPPING_INFO,
  ROUTES_CONFIRM_TRADE,
  ROUTES_SUCCESS_PAGE,
  ROUTES_THANKYOU_PAGE,
  ROUTES_TRANSACTION_EXPIRED,
  ROUTES_TERMS_CONDITION,
  ROUTES_PRIVACY_POLICY,
  ROUTE_CHOOSE_DEVICES,
  ROUTE_GET_QUOTE_PHONE,
  ROUTE_GET_QUOTE_WATCH,
  ROUTE_GET_QUOTE_LAPTOP,
  ROUTE_PHONE_DEVICE_CONDITION,
  ROUTE_TABLET_DEVICE_CONDITION,
  ROUTE_WATCH_DEVICE_CONDITION,
  ROUTES_SHIPPING_STATUS,
  ROUTE_SIGNUP,
  VERIFY_TRANSACTION_ERROR,
  OFFER_ACCEPTED,
  OFFER_DECLINED,
} from "../routings/constants/routes";
import {
  error400,
  error403,
  error404,
  error500,
  error502,
  error503,
} from "../routings/constants/pageErrorTypes";

const EntryRoot = lazy(() => import("./EntryRoot"));
const ViewRoot = lazy(() => import("./ViewRoot"));
const Error = lazy(() => import("../pages/Error"));
const MainView = lazy(() => import("./MainView"));

const AppRoot: FC = () => {
  const locationType = useAppSelector((state) => state.location.type);

  const viewLayouts = () => (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <StepsProgress />
      <ViewRoot location={locationType} />
    </Suspense>
  );

  const entryLayouts = () => (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <EntryRoot location={locationType} />
    </Suspense>
  );

  const mainLayout = () => (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <MainView location={locationType} />
    </Suspense>
  );

  interface ErrorPageProps extends React.InputHTMLAttributes<HTMLInputElement> {
    errorId: string;
    errorAltText: string;
    errorTitle: string;
    errorMessage: string;
    errorButtonTitle: string;
    errorIcon: string;
  }

  const ErrorPage = (errorType: ErrorPageProps) => (
    <Suspense fallback={<div />}>
      <Error errorType={errorType} />
    </Suspense>
  );

  const routes = () => {
    switch (locationType) {
      // add component in views/layouts/AppRoutes
      case ROUTE_LOGIN:
      case ROUTE_SIGNUP:
        return mainLayout();
      case ROUTE_HOME:
      case ROUTES_STATUS_TRACKING:
      case ROUTES_SHIPPING_STATUS:
      case ROUTE_ABOUT_US:
      case ROUTE_SUPPORT:
      case ROUTE_CONTACT_US:
      case ROUTES_THANKYOU_PAGE:
      case ROUTES_TRANSACTION_EXPIRED:
      case ROUTES_SUCCESS_PAGE:
      case ROUTES_TERMS_CONDITION:
      case ROUTES_PRIVACY_POLICY:
      case VERIFY_TRANSACTION_ERROR:
      case OFFER_ACCEPTED:
      case OFFER_DECLINED:
        return entryLayouts();
      case ROUTE_CHOOSE_DEVICES:
      // case ROUTES_GET_QUOTE:
      case ROUTE_GET_QUOTE_PHONE:
      case ROUTE_GET_QUOTE_WATCH:
      case ROUTE_GET_QUOTE_LAPTOP:
      case ROUTES_SHIPPING_INFO:
      case ROUTES_CONFIRM_TRADE:
      case ROUTES_DEVICE_CONDITION:
      case ROUTE_PHONE_DEVICE_CONDITION:
      case ROUTE_TABLET_DEVICE_CONDITION:
      case ROUTE_WATCH_DEVICE_CONDITION:
        return viewLayouts();
      case ROUTE_ERROR_400:
        return ErrorPage(error400);
      case ROUTE_ERROR_403:
        return ErrorPage(error403);
      case ROUTE_ERROR_404:
      case NOT_FOUND:
        return ErrorPage(error404);
      case ROUTE_ERROR_500:
        return ErrorPage(error500);
      case ROUTE_ERROR_502:
        return ErrorPage(error502);
      case ROUTE_ERROR_503:
        return ErrorPage(error503);
      default:
        return null;
    }
  };

  return routes();
};

export default AppRoot;
