import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../App/Stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../App/Layout/LoadingComponent";
import { ActivityDetailChat } from "./ActivityDetailChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import { ActivityDetailSidebar } from "./ActivityDetailSidebar";
interface DetailParams {
  id: string;
}
const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;
  if (!activity) return <h2>Activity not found...</h2>;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
