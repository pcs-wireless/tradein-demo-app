const PRIMARY_COLOR = "#0074D4";
const GRAY = "#333333";
const WHITE = "#FFFFFF";
const MODAL = "#3333338c";

interface Ithemes {
  default: {
    primaryColor: string;
    gray: string;
    white: string;
    modalBg: string;
  };
}

const themes: Ithemes = {
  default: {
    primaryColor: PRIMARY_COLOR,
    gray: GRAY,
    white: WHITE,
    modalBg: MODAL,
  },
};

export default themes;
