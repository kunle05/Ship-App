import MainContent from '../components/MainContent';
import Interior from '../components/Interior';
import Footer from '../components/Footer';

const Home = () => {
  return (
      <>
        <MainContent />
        <Interior />
        <Interior right="true" />
        <Footer />
      </>
  );
};

export default Home;