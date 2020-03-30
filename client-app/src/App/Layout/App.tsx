import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../Features/nav/NavBar";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { HomePage } from "../../Features/Home/HomePage";
import ActivityForm from "../../Features/Activities/Form/ActivityForm";
import ActivityDetails from "../../Features/Activities/Details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../Stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import ModalContainers from "../Common/Modals/ModalContainers";
import ProfilePage from "../../Features/Profiles/ProfilePage";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [setAppLoaded, getUser, token]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;
  return (
    <Fragment>
      <ModalContainers />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/create-activity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/profile/:username" component={ProfilePage} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
