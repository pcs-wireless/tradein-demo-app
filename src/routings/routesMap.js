import combineThunks from "./combineThunks";
import {
  ROUTE_HOME,
  ROUTE_ABOUT_US,
  ROUTE_SUPPORT,
  ROUTES_DEVICE_CONDITION,
  ROUTES_STATUS_TRACKING,
  VERIFY_TRANSACTION_ERROR,
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
  ROUTE_PHONE_DEVICE_CONDITION,
  ROUTE_TABLET_DEVICE_CONDITION,
  ROUTE_WATCH_DEVICE_CONDITION,
  ROUTES_SHIPPING_STATUS,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  OFFER_ACCEPTED,
  OFFER_DECLINED,
  ROUTE_CONTACT_US,
} from "./constants/routes";

const handlePageSwitch = () => async (dispatch, getState) => {
  // dispatch(actionHere())
  const { location } = getState();
};

const routesMap = {
  [ROUTE_LOGIN]: {
    path: "/login",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_SIGNUP]: {
    path: "/signup",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_HOME]: {
    path: "/",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_ABOUT_US]: {
    path: "/aboutus",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_SUPPORT]: {
    path: "/faq",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_CONTACT_US]: {
    path: "/contactus",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_CHOOSE_DEVICES]: {
    path: "/choosedevices",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_STATUS_TRACKING]: {
    path: "/trackstatus",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_SHIPPING_STATUS]: {
    path: "/tradestatus/:tranId/:email",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_GET_QUOTE_PHONE]: {
    path: "/getquote",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_GET_QUOTE_LAPTOP]: {
    path: "/getquotelaptop",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_GET_QUOTE_WATCH]: {
    path: "/getquotewatch",
    thunk: combineThunks(handlePageSwitch()),
  },
  // [ROUTES_GET_QUOTE]: {
  //   path: '/getquote',
  //   thunk: combineThunks(
  //     handlePageSwitch()
  //   )
  // },
  [ROUTES_DEVICE_CONDITION]: {
    path: "/devicecondition",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_PHONE_DEVICE_CONDITION]: {
    path: "/phonedevicecondition",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_TABLET_DEVICE_CONDITION]: {
    path: "/tabletdevicecondition",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTE_WATCH_DEVICE_CONDITION]: {
    path: "/watchdevicecondition",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_SHIPPING_INFO]: {
    path: "/shippinginfo",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_CONFIRM_TRADE]: {
    path: "/confirmtrade",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_SUCCESS_PAGE]: {
    path: "/transactionsuccess",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_THANKYOU_PAGE]: {
    path: "/thankyou/:tranid",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_TRANSACTION_EXPIRED]: {
    path: "/transactionexpired",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_TERMS_CONDITION]: {
    path: "/termsandcondition",
    thunk: combineThunks(handlePageSwitch()),
  },
  [ROUTES_PRIVACY_POLICY]: {
    path: "/privacypolicy",
    thunk: combineThunks(handlePageSwitch()),
  },
  [VERIFY_TRANSACTION_ERROR]: {
    path: "/verifytransactionerror",
    thunk: combineThunks(handlePageSwitch()),
  },
  [OFFER_ACCEPTED]: {
    path: "/offeraccepted",
    thunk: combineThunks(handlePageSwitch()),
  },
  [OFFER_DECLINED]: {
    path: "/offerdeclined",
    thunk: combineThunks(handlePageSwitch()),
  },
};

export default routesMap;
