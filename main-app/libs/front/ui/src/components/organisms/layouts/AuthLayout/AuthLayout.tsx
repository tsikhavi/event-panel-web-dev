import React from 'react';

import Paper from '../../../atoms/Paper/Paper';

import useStyles from './AuthLayout.styles';

type AuthFormProps = {
  children: React.ReactNode;
};

export type AuthLayoutProps = {
  children: React.ReactNode;
};

type AuthLayoutCompose = {
  Form: (props: AuthFormProps) => JSX.Element;
};

type AuthLayoutWrapper = (props: AuthLayoutProps) => JSX.Element;

const AuthLayout: AuthLayoutWrapper & AuthLayoutCompose = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>{children}</Paper>
    </div>
  );
};

const AuthForm = ({ children }: AuthFormProps) => {
  const { classes } = useStyles();
  return <div className={classes.form}>{children}</div>;
};

AuthLayout.Form = AuthForm;

export default AuthLayout;
