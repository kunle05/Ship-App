import Page from "../components/Page"
import NProgress from 'nprogress';
import Router from 'next/router';
import '../public/static/nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}

export default MyApp
