import Navbar from "./Navbar";
import { Container } from "@material-ui/core";
import HomeContent from "./HomeContent";
const Home = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <HomeContent />
    </Container>
  );
};

export default Home;
