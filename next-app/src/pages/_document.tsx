import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="CORA is a digitalization platform for Philippine cooperatives." />

          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

          {/* EmailJS library (preserved) */}
          <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

          {/* reCAPTCHA v2 Invisible */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function onRecaptchaLoad() {
                  console.log('reCAPTCHA loaded');
                }
              `,
            }}
          />
          <script src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit" async defer></script>

          {/* Confetti animation */}
          <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.0/dist/confetti.browser.min.js"></script>

          {/* Meta Pixel (preserved) */}
          <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '2132083164253304');fbq('track', 'PageView');` }} />

          {/* HubSpot Embed (preserved) */}
          <script id="hs-script-loader" async defer src="//js-na2.hs-scripts.com/246084261.js"></script>

          {/* Facebook domain verification (preserved) */}
          <meta name="facebook-domain-verification" content="6oergzy3zs8fgt2cbv13coop8oy7fe" />

        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Meta Pixel noscript fallback (preserved) */}
          <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2132083164253304&ev=PageView&noscript=1" />` }} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
