import { ScrollViewStyleReset } from "expo-router/html";
import React, { type PropsWithChildren } from "react";

const GTM_ID = "GTM-T9JFVQ35";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>하루한</title>
        <meta
          name="description"
          content="면접 대비를 위한 CS 개념 학습 도구입니다. 하루한을 통해 핵심 개념을 마스터해보세요."
        />
        <meta name="keywords" content="IT, 면접, IT면접, CS, 공부, CS공부, 하루한, HaruHan" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://haruhan.vercel.app" />
        <meta property="og:title" content="하루한 - 면접용 CS을 정리해보는 시간" />
        <meta property="og:description" content="면접 대비를 위한 CS 개념 학습 도구입니다." />
        <meta property="og:image" content="https://haruhan.vercel.app/haruhan-logo.png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="559" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="하루한" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="하루한 - 면접용 CS을 정리해보는 시간" />
        <meta name="twitter:description" content="면접 대비를 위한 CS 개념 학습 도구입니다." />
        <meta name="twitter:image" content="https://haruhan.vercel.app/haruhan-logo.png" />
        <meta name="theme-color" content="#89CFF0" />
        <meta name="robots" content="index, follow" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        <ScrollViewStyleReset />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
