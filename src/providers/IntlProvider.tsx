import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "react-query";
import { IntlProvider as IProvider } from "react-intl";

import cookie from "js-cookie";
import Spinner from "../features/Spinner";
import { GetLocalizations } from "../services/query";

export enum Ilocale {
  EN = "EN",
  IT = "IT",
  DE = "DE",
}

const { EN, IT, DE } = Ilocale;

// const navigatorLanguage = navigator.language.indexOf(IT) > -1 ? IT : EN;
const preferedLocalization = cookie.get("userLocalization");
const navigatorLanguage = preferedLocalization || IT;

const importTranslation = async (navigatorLanguage: string) => {
  switch (navigatorLanguage) {
    case EN:
      return import("../assets/translations/en.json");
    case IT:
      return import("../assets/translations/it.json");
    case DE:
      return import("../assets/translations/de.json");
    default:
      return import("../assets/translations/it.json");
  }
};

type IntlProviderContextType = [
  Ilocale,
  React.Dispatch<React.SetStateAction<Ilocale>>,
  Locale[]
];
const IntlProviderContext = createContext<IntlProviderContextType | undefined>(
  undefined
);

interface Locale {
  id: string;
  displayName: string;
  locale: string;
  isDefault: boolean;
}

const IntlProvider: FC = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState<Ilocale>(
    navigatorLanguage as Ilocale
  );
  const [availableLocales, setAvailableLocales] = useState<Locale[]>([]);

  const { data, isLoading, refetch } = useQuery(
    ["translation", currentLocale],
    () => importTranslation(currentLocale)
  );

  const { data: partnerLocalization, loading: loadingLocalizations } =
    GetLocalizations();

  useEffect(() => {
    if (partnerLocalization?.partners) {
      const [partner] = partnerLocalization?.partners;
      const defaultLocalization: Locale = partner.localizations.find(
        (locale: Locale) => locale.isDefault
      );
      if (preferedLocalization) {
        setCurrentLocale(preferedLocalization as Ilocale);
      } else {
        setCurrentLocale(defaultLocalization.locale as Ilocale);
      }
      setAvailableLocales(partner.localizations);
    }
  }, [partnerLocalization]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const value = useMemo<IntlProviderContextType>(
    () => [currentLocale, setCurrentLocale, availableLocales],
    [currentLocale, setCurrentLocale, availableLocales]
  );

  return (
    <IProvider
      messages={(data?.default || {}) as Record<string, string>}
      locale={currentLocale.toLocaleLowerCase()}
      defaultLocale={currentLocale.toLocaleLowerCase()}
    >
      {isLoading || loadingLocalizations ? (
        <Spinner />
      ) : (
        <IntlProviderContext.Provider value={value}>
          {children}
        </IntlProviderContext.Provider>
      )}
    </IProvider>
  );
};

export const useLocalization = () => {
  const context = useContext(IntlProviderContext);
  if (!context) {
    throw new Error("This component should be wrapped inside an IntlProvider");
  }
  return context;
};

export default IntlProvider;
