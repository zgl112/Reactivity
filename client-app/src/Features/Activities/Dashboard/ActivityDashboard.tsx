import React, { useContext, useEffect, useState } from "react";
import { Grid, GridColumn, Loader } from "semantic-ui-react";
import ActivityList from "../Dashboard/ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../App/Layout/LoadingComponent";
import { RootStoreContext } from "../../../App/Stores/rootStore";
import InfiniteScrolls from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    loadingInitial,
    setPage,
    page,
    totalPages
  } = rootStore.activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content="Loading Activities..." />;

  return (
    <Grid>
      <GridColumn width={10}>
        <InfiniteScrolls
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <ActivityList />
        </InfiniteScrolls>
      </GridColumn>
      <GridColumn width={6}>
        <ActivityFilters />
      </GridColumn>
      <GridColumn width={10}>
        <Loader active={loadingNext} />
      </GridColumn>
    </Grid>
  );
};
export default observer(ActivityDashboard);
