import React, {useState} from "react";
import {connect} from "react-redux";

import {Redirect} from "react-router-dom";

import {auth} from "../actions";
import {Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useStyles} from "../styles";
import {FormattedMessage, useIntl} from "react-intl";
import {Dispatch} from "redux";

interface LoginProps {
  errors: {field: string; message: string}[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => Dispatch;
}
function Login(props: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  const intl = useIntl();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.login(username, password);
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.loginContainer}>
      <Card className={classes.loginCard}>
        <CardContent>
          <form onSubmit={onSubmit}>
            <p>
              <Typography variant={"h5"} component={"h1"}>
                <FormattedMessage id={"login.login"} defaultMessage={"Login"} />
              </Typography>
            </p>

            {props.errors.length > 0 &&
              props.errors.map((error) => (
                <Alert severity="error" key={error.field}>
                  {error.message}
                </Alert>
              ))}
            <p>
              <TextField
                id="username"
                label={intl.formatMessage({
                  id: "login.inputs.username",
                  defaultMessage: "Username",
                })}
                variant={"outlined"}
                className={classes.fullWidth}
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <p>
              <TextField
                type="password"
                id="password"
                variant={"outlined"}
                label={intl.formatMessage({
                  id: "login.inputs.password",
                  defaultMessage: "Password",
                })}
                className={classes.fullWidth}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>
            <p>
              <Button type="submit" variant="contained" color={"primary"}>
                <FormattedMessage
                  id={"login.buttons.login"}
                  defaultMessage={"Login"}
                />
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
interface LoginState {
  auth: {isAuthenticated: boolean; errors: {[key: string]: string}};
}
const mapStateToProps = (state: LoginState) => {
  let errors: {field: string; message: string}[] = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map((field) => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (username: string, password: string) => {
      return dispatch(auth.login(username, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
