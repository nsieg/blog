import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `var _paq=window._paq=window._paq||[];_paq.push(["trackPageView"]),_paq.push(["enableLinkTracking"]),function(){var e="//analytics.nilssiegfried.de/";_paq.push(["setTrackerUrl",e+"matomo.php"]),_paq.push(["setSiteId","1"]);var a=(t=document).createElement("script"),t=t.getElementsByTagName("script")[0];a.async=!0,a.src=e+"matomo.js",t.parentNode.insertBefore(a,t)}();`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
