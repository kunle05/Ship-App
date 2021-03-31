import Page from "../components/Page"
import NProgress from 'nprogress';
import Router from 'next/router';
import withData from '../lib/data';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faGlobeAfrica, faEnvelope, faPlus, faTimes, faUserPlus, faCaretRight, faCaretDown, faCaretSquareLeft, faCaretSquareRight, faCheckCircle, faAngleDoubleRight, faAngleDoubleLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/static/nprogress.css';
import { ApolloProvider } from "@apollo/client";

library.add(fab, faGlobeAfrica, faEnvelope, faPlus, faTimes, faUserPlus, faCaretRight, faCaretDown, faCaretSquareLeft, faCaretSquareRight, faCheckCircle, faAngleDoubleRight, faAngleDoubleLeft, faEdit )

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
