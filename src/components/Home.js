import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

class Home extends React.Component {
  render() {
    const pizzaGif = this.props.giphy.randomPizzaGif;
    const bg = pizzaGif ? pizzaGif.images.original.url : null;

    return (
      <div>
        <CartMessage>Buy 2 Get 1 Free Starts Sunday!</CartMessage>
        <Container style={{ background: "black" }}>
          <Background style={{ backgroundImage: `url(${bg})` }} />
          <Hero>
            <JumboHeading>Waldo Pizza!</JumboHeading>
            <JumboSubheading>
              Go ahead... you know you want one.
            </JumboSubheading>
            <Link to="/build" style={{ textDecoration: "none" }}>
              <Button
                variant="primary"
                style={{ maxWidth: 400, margin: "0 auto", display: "block" }}
              >
                Build Your Pie
              </Button>
            </Link>
          </Hero>
        </Container>
        <Container>
          <Section style={{ padding: "50px 0" }}>something...</Section>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ giphy }) => {
  return { giphy };
};

export default connect(mapStateToProps)(Home);

const CartMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
  z-index: 1;
  background: gold;
  line-height: 2em;
  color: red;
  font-size: 13px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  position: relative;
  z-index: 1;
`;

const Section = styled.div`
  width: 100%;
  max-width: 1024px;
`;

const Background = styled.div`
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const Hero = styled.div`
  width: 100%;
  max-width: 1024px;
  position: relative;
  padding: 200px 0;

  @media screen and (max-width: 991px) {
    padding: 120px 0;
  }

  @media screen and (max-width: 767px) {
    padding: 80px 0;
  }
`;

const JumboHeading = styled.div`
  text-align: center;
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 100;
  color: #ffffff;
  font-size: 60px;

  @media screen and (max-width: 991px) {
    font-size: 42px;
  }

  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`;

const JumboSubheading = styled.div`
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: 300;
  color: #ffffff;
`;
