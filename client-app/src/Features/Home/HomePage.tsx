import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../App/Stores/rootStore";
import { LoginForm } from "../User/LoginForm";
import { RegisterForm } from "../User/RegisterForm";

export const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  const token = window.localStorage.getItem("jwt");

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back, ${user.displayName}!`}
            />
            <Button as={Link} to="/activities" size="medium" inverted>
              Go to Activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button
              onClick={() => openModal(<LoginForm />)}
              size="medium"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              size="medium"
              inverted
            >
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};
