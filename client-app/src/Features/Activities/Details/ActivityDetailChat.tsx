import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { RootStoreContext } from "../../../App/Stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import TextAreaInput from "../../../App/Common/Form/TextAreaInput";
import { observer } from "mobx-react-lite";
import { formatDistance, parseISO } from "date-fns";

const ActivityDetailChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity
  } = rootStore.activityStore;

  useEffect(() => {
    createHubConnection(activity!.id);
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, activity]);

  const hrstyle = {
    border: "0",
    height: "0",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    borderBottom: " 1px solid rgba(255, 255, 255, 0.3)"
  };

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map(comment => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    {"posted " +
                      formatDistance(parseISO(comment.createdAt), new Date(), {
                        addSuffix: true
                      })}
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
                <hr style={hrstyle} />
              </Comment>
            ))}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  row={2}
                  placeholder="Add your comment."
                />
                <Button
                  content="Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  loading={submitting}
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};
export default observer(ActivityDetailChat);
