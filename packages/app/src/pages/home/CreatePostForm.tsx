import React from "react";
import { Avatar, Button, createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCreatePostForm } from "../../hooks/post/useCreatePostForm";
import MyTextField from "../../components/MyTextField";
import { Form, Formik } from "formik";
import { StyledPaper } from "../../styled/StyledPaper";
import { Link } from "react-router-dom";
import { useMe } from "../../hooks/useMe";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
    },
    avatar: {
      margin: theme.spacing(0, 2, 0, 1),
    },
    flex: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      margin: theme.spacing(2, 0, 1),
    },
  })
);

function CreatePostForm() {
  const classes = useStyles();
  const me = useMe();

  const {
    handleCreatePost,
    initialValues,
    validationSchema,
  } = useCreatePostForm();

  return (
    <StyledPaper>
      <div className={classes.wrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleCreatePost}
          validationSchema={validationSchema}
        >
          {() => (
            <Form noValidate className={classes.form}>
              <div className={classes.flex}>
                <Link to={`/users/${me.id}`}>
                  <Avatar
                    src={me.avatar}
                    alt={me.fullName}
                    className={classes.avatar}
                  />
                </Link>
                <MyTextField
                  type="text"
                  name="content"
                  rows={2}
                  multiline
                  placeholder={`What's on your mind, ${
                    me.fullName.split(" ")[0]
                  }?`}
                  autoComplete="off"
                  margin="none"
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.button}
              >
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </StyledPaper>
  );
}

export default CreatePostForm;
