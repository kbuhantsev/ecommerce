import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager, createGlobalStyle } from "styled-components";

import { Roboto } from "next/font/google";
import { CartContextProvider } from "@/components/CartContext";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
    background-color: #eee;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <GlobalStyles />
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </StyleSheetManager>
    </main>
  );
}
