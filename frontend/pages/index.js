import Header from "../components/Header";
import MainContent from '../components/MainContent';
import Interior from '../components/Interior';
import Footer from '../components/Footer';

const Home = () => {
  return (
      <>
        <Header />
        <MainContent />
        <Interior />
        <Interior right="true" />
        <Footer />
      </>
  );
};

export default Home;