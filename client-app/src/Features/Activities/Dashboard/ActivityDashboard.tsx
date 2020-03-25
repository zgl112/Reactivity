import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "../Dashboard/ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../App/Layout/LoadingComponent";
import { RootStoreContext } from "../../../App/Stores/rootStore";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, loadingInitial } = rootStore.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Activities..." />;

  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        <h1>Activity Filters</h1>
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivityDashboard);
