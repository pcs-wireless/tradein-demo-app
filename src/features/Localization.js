import styled from "@emotion/styled";
import { Select } from "antd";
import Globe from "../assets/images/globe.svg";
import { useLocalization } from "../providers/IntlProvider";
import cookie from "js-cookie";
// import { locales, useIntl, useLocalization } from "providers";

const { Option } = Select;

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  ".ant-select:not(.ant-select-customize-input) .ant-select-selector": {
    border: 0,
  },
  ".ant-select-selection-item": {
    lineHeight: "15.73px !important",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
  },
});

const Logo = styled("img")({
  width: 24,
  height: 24,
});

const CustomSelect = styled(Select)(({ color }) => ({
  fontSize: 13,
  fontWeight: 400,
  width: "auto",
  minWidth: 95,
  color,
  ".ant-select-arrow": {
    color,
  },
}));

const Localization = ({ icon = Globe, textColor = "#3A3F47" }) => {
  const [locale, setLocale, availableLocales] = useLocalization();

  return (
    <Container>
      <Logo src={icon} />
      <CustomSelect
        dropdownStyle={{ border: 0 }}
        value={locale}
        bordered={false}
        onChange={(e) => {
          setLocale(e);
          cookie.set("userLocalization", e);
        }}
        color={textColor}
      >
        {availableLocales.map((locale) => (
          <Option key={locale.locale} value={locale.locale}>
            {locale.displayName}
          </Option>
        ))}
      </CustomSelect>
    </Container>
  );
};

export default Localization;
