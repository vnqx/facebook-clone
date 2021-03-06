import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CircularProgress, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useNavigate } from "react-router-dom";
import { UserPreview } from "../../types";
import { UsersInput } from "../../../../server/src/resolvers/user/UsersInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      maxWidth: "400px",
      width: "100%",
    },
  })
);

interface UsersData {
  users: UserPreview[];
}

interface UsersVars {
  input: UsersInput;
}

function Search() {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const { data, loading } = useQuery<UsersData, UsersVars>(GET_USERS, {
    variables: { input: { filter } },
    // so that loading isn't always true when user not found
    notifyOnNetworkStatusChange: true,
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Autocomplete
      className={classes.wrapper}
      id="search-autocomplete"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.fullName === value.fullName}
      getOptionLabel={(option) => option.fullName}
      options={data?.users || []}
      loading={loading}
      // && user because otherwise it navigates to /users/undefined
      onChange={(_event, user) => user && navigate(`/users/${user.id}`)}
      noOptionsText={"User not found"}
      renderInput={(params) => (
        <TextField
          {...params}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          variant="outlined"
          fullWidth
          autoFocus
          style={{ backgroundColor: "white" }}
          placeholder="Search someone"
          autoComplete="off"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default Search;
