import { FC, useEffect, useState } from "react";
import { Layout, Menu as AntMenu } from "antd";
import styled from "@emotion/styled";
import { GlobeIcon } from "../assets/Icons";
import { actionNavigateTo } from "../routings/actionNavigator";

import Localization from "../features/Localization";
import { Ilocale, useLocalization } from "../providers/IntlProvider";
import { FormattedMessage } from "react-intl";
import {
  ROUTES_PRIVACY_POLICY,
  ROUTE_ABOUT_US,
  ROUTE_CHOOSE_DEVICES,
  ROUTE_CONTACT_US,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_SUPPORT,
} from "../routings/constants/routes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { breakpoints, mq } from "../assets/mediaQueries";
import burgerMenu from "../assets/images/burgerMenu.svg";
import close from "../assets/images/close.svg";
import { GetHeaderData } from "../services/query";
import { useQuery } from "react-query";

const { Header } = Layout;

const Container = styled(Header)(({ display }: { display: boolean | number }) =>
  mq({
    padding: ["0", "0", "0 50px"],
    display: display ? "flex" : "none",
    alignItems: "center",
    background: "#fff",
    backgroundRepeat: "no-repeat",
    height: [66, 82, 79, 79],
    width: "100%",
    zIndex: 9,
    position: "fixed",
    borderBottom: "1px solid #E0E0E0",
    fontSize: 14,
    fontWeight: 500,
    ".ant-menu-horizontal": {
      borderBottom: 0,
      marginLeft: 56,
      minWidth: 280,
    },
    ".ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after":
      {
        borderBottom: "none",
      },
    ".ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu::after:hover":
      {
        borderBottom: "2px solid #4964DF !Important",
      },
    ".ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected":
      {
        color: "#000000",
      },
    ".ant-menu-submenu-title:hover": {
      borderBottom: "transparent !Important",
    },
    ".ant-menu-item-only-child:hover": {
      color: "#000000 !important",
    },
    ".ant-menu-item-only-child:hover::after": {
      borderBottom: "transparent !Important",
    },
    ".ant-menu-light .ant-menu-item:hover, .ant-menu-light .ant-menu-item-active, .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-light .ant-menu-submenu-active, .ant-menu-light .ant-menu-submenu-title:hover::after":
      {
        color: "#000000",
      },
    ".ant-menu-light .ant-menu-submenu-title:hover": {
      color: "#4964DF !Important",
    },
    ".ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover": {
      color: "#4964DF !Important",
    },
    ".ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after":
      {
        display: "none",
      },
    ".ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover": {
      color: "#4964DF !Important",
    },
    ".ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after": {
      borderBottom: "transparent !Important",
    },
    ".ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after":
      {
        borderBottom: "transparent !Important",
      },
    ".ant-menu-light .ant-menu-item:hover": {
      color: "#4964DF !Important",
    },
  })
);

const NavContainer = styled("div")(
  mq({
    width: "100%",
    height: [25, 25, 33, 33],
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  })
);

const Logo = styled("div")(({ src }: { src: string }) => ({
  width: 148,
  height: 64,
  backgroundImage: `url(${src})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  cursor: "pointer",
}));

const LinksContainer = styled("div")(({ theme }) =>
  mq({
    width: ["100%", "100%", 600],
    display: ["block", "block", "flex"],
    backgroundColor: "rgba(51, 51, 51, 0.6)",
    top: 0,
    position: "fixed",
    height: ["100vh", "100vh", "90px"],
    alignItems: "center",
    justifyContent: "space-around",
  })
);

const Line = styled("div")({
  width: "100%",
  height: 1,
  backgroundColor: "#E0E0E0",
});

const ChildLinksContainer = styled("div")(({ theme }) => ({
  width: 265,
  backgroundColor: "#ffffff",
  top: 0,
  position: "fixed",
  height: "100vh",
  paddingTop: 68,
  ".ant-menu-submenu-arrow::after": {
    backgroundColor: "#000000",
  },
  ".ant-menu-submenu-arrow::before": {
    backgroundColor: "#000000",
  },
  ".ant-menu-submenu-selected": {
    color: "#4964DF",
  },
}));

const Icon = styled("img")(
  ({
    width = 28,
    height = 24,
    iscenter,
  }: {
    width?: number;
    height?: number;
    iscenter?: any;
  }) => ({
    height,
    width,
    margin: iscenter ? "auto" : "inherit",
  })
);

const LanguageOption = styled("div")({
  display: "flex",
  alignItems: "center",
  width: 91,
  position: "absolute",
  left: "84%",
});

const Close = styled("img")({
  position: "absolute",
  top: 48,
  right: 16,
  height: 15,
  color: "#4F4F4F",
});

const PageHeader: FC = () => {
  const dispatch = useAppDispatch();
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoints[1]);
  const { type } = useAppSelector((state) => state.location);
  const [display, setDisplay] = useState<boolean>(true);
  const getSize = () => {
    setIsMobile(window.innerWidth <= breakpoints[1]);
  };
  const [locale, setLocale] = useLocalization();
  const { isLoading, data } = useQuery("HeaderData", () =>
    GetHeaderData({
      locale: locale,
    })
  );

  const getLanguageLabel = (languageCode: any) => {
    switch (languageCode) {
      case Ilocale.EN:
        return "English";
      case Ilocale.IT:
        return "Italian";
      case Ilocale.DE:
        return "German";
      default:
        return "Italian";
    }
  };

  useEffect(() => {
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resize", getSize);
  });

  useEffect(() => {
    if (type === ROUTE_LOGIN || type === ROUTE_SIGNUP) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [type]);

  useEffect(() => {
    if (
      type !== ROUTE_HOME &&
      type !== ROUTE_ABOUT_US &&
      type !== ROUTE_CONTACT_US &&
      type !== ROUTES_PRIVACY_POLICY &&
      type !== ROUTE_SUPPORT &&
      type !== ROUTE_CHOOSE_DEVICES
    ) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [type]);

  const handleBeforeUnload = (e: {
    preventDefault: () => void;
    returnValue: string;
  }) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  return !isLoading && isMobile ? (
    <Container display={display ? 1 : 0} className="mobile-menu">
      <NavContainer>
        <Icon
          style={{ marginLeft: 24 }}
          onClick={() => setShowNav(true)}
          src={burgerMenu}
        />
        <Icon
          iscenter={1}
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            margin: "auto",
          }}
          onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}
          width={153}
          height={32}
          src={data?.data[0]?.attributes?.logo?.data?.attributes?.url}
        />
      </NavContainer>
      {showNav && (
        <LinksContainer
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowNav(!showNav);
          }}
          className="mobile-menu"
        >
          <ChildLinksContainer>
            <Close src={close} onClick={() => setShowNav(false)} />
            <AntMenu
              style={{ fontSize: 16, fontWeight: 600 }}
              onClick={(e) => {
                if (e.key === "aboutus") {
                  return window.open(window.location.origin + "/#/aboutus");
                }
                if (e.key === "faq") {
                  return window.open(window.location.origin + "/#/faq");
                }
                if (e.key === "contactus") {
                  return window.open(window.location.origin + "/#/contactus");
                }
              }}
              mode="inline"
              items={[
                { label: <FormattedMessage id="ABOUT_US" />, key: "aboutus" },
                {
                  label: <FormattedMessage id="SUPPORT" />,
                  key: "submenu",
                  children: [
                    {
                      label: <FormattedMessage id="FAQ" />,
                      key: "faq",
                    },
                    {
                      label: <FormattedMessage id="CONTACT_US" />,
                      key: "contactus",
                    },
                  ],
                },
              ]}
            ></AntMenu>
            <Line />
            <AntMenu
              mode="inline"
              onClick={(e) => {
                if (e.key === "english") {
                  setLocale(Ilocale.EN);
                  setShowNav(false);
                }
                if (e.key === "italian") {
                  setLocale(Ilocale.IT);
                  setShowNav(false);
                }
                if (e.key === "deutsch") {
                  setLocale(Ilocale.DE);
                  setShowNav(false);
                }
              }}
              items={[
                {
                  label: getLanguageLabel(locale),
                  key: "submenu",
                  icon: <GlobeIcon />,
                  children: [
                    { label: "English", key: "english" },
                    { label: "Italian", key: "italian" },
                    { label: "German", key: "deutsch" },
                  ],
                }, // remember to pass the key prop
              ]}
            ></AntMenu>
          </ChildLinksContainer>
        </LinksContainer>
      )}
    </Container>
  ) : (
    <Container display={display ? 1 : 0}>
      <Logo
        src={data?.data[0]?.attributes?.logo?.data?.attributes?.url}
        onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}
      />
      {!isLoading && (
        <AntMenu
          forceSubMenuRender
          onClick={(e) => {
            if (e.key === "aboutus") {
              return window.open(window.location.origin + "/#/aboutus");
            }
            if (e.key === "faq") {
              return window.open(window.location.origin + "/#/faq");
            }
            if (e.key === "contactus") {
              return window.open(window.location.origin + "/#/contactus");
            }
          }}
          inlineIndent={0}
          mode="horizontal"
          items={[
            {
              label: <FormattedMessage id="ABOUT_US" />,
              key: "aboutus",
            },
            {
              label: <FormattedMessage id="SUPPORT" />,
              key: "option",
              children: [
                {
                  label: <FormattedMessage id="FAQ" />,
                  key: "faq",
                },
                {
                  label: <FormattedMessage id="CONTACT_US" />,
                  key: "contactus",
                },
              ],
            },
          ]}
        ></AntMenu>
      )}
      <LanguageOption>
        <Localization />
      </LanguageOption>
    </Container>
  );
};

export default PageHeader;
