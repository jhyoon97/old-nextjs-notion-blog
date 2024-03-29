import "react-loading-skeleton/dist/skeleton.css";

import { Global, ThemeProvider } from "@emotion/react";

// types
import type { AppProps } from "next/app";

// components
import DefaultLayout from "layouts/Default";

// dayjs
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

// utils
import colorTheme from "utils/colorTheme";
import resetCss from "utils/resetCss";
import initAxios from "utils/axios";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul"); // 타임존 설정

initAxios();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={colorTheme.primary}>
      <Global styles={(theme) => resetCss(theme)} />
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ThemeProvider>
  );
};

export default App;
