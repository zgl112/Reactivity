import React, { useContext } from "react";
import {
  Segment,
  Image,
  Item,
  Header,
  Button,
  ButtonGroup
} from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../../App/Stores/rootStore";

const activityImageStyle = {
  filter: "brightness(40%)"
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};
const ActivityDetailsHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const host = activity.attendees.filter(x => x.isHost)[0];
  const rootStore = useContext(RootStoreContext);
  const {
    unattendActivity,
    attendActivity,
    loading,
    deleteActivity
  } = rootStore.activityStore;
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date, "eeee do MMMM")}</p>
                <p>
                  Hosted by{" "}
                  <Link to={`/profile/${host.username}`}>
                    <strong> {host.displayname}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <ButtonGroup widths={16}>
            <Button
              as={Link}
              to={`/manage/${activity.id}`}
              color="teal"
              floated="left"
            >
              Manage Event
            </Button>
            <Button
              color="orange"
              onClick={e => deleteActivity(e, activity.id)}
              floated="right"
            >
              Cancel Event
            </Button>
          </ButtonGroup>
        ) : activity.isGoing ? (
          <Button loading={loading} onClick={unattendActivity}>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} onClick={attendActivity} color="teal">
            Join Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};
export default observer(ActivityDetailsHeader);
