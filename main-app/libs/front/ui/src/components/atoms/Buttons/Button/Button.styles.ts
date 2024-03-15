import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Button' })((theme) => ({
  root: {
    ...theme.typography['button/m'],

    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,

    borderRadius: '50px',
    border: '1px solid transparent',
    boxShadow: theme.shadows['shadow/1'],

    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    '&:hover': {
      cursor: 'pointer',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },

  contained: {
    color: theme.colors['text/button/contained'],
    backgroundColor: theme.colors['button/default'],

    '&:hover': {
      backgroundColor: theme.colors['button/hover'],
    },

    '&:active': {
      backgroundColor: theme.colors['button/pressed'],
    },

    '&:disabled': {
      backgroundColor: theme.colors['button/disabled'],
      color: theme.colors['text/disabled'],
    },
  },

  outlined: {
    border: '1px solid',
    color: theme.colors['button/default'],
    borderColor: theme.colors['button/default'],
    backgroundColor: 'inherit',

    '&:hover': {
      color: theme.colors['button/hover'],
      borderColor: theme.colors['button/hover'],
      backgroundColor: theme.colors['bg/grey/2'],
    },

    '&:active': {
      color: theme.colors['button/pressed'],
      backgroundColor: theme.colors['bg/grey/3'],
      borderColor: theme.colors['button/pressed'],
    },

    '&:disabled': {
      color: theme.colors['text/disabled'],
      borderColor: theme.colors['stroke/disabled'],
    },
  },

  ghost: {
    fontWeight: 400,

    boxShadow: 'none',

    backgroundColor: 'transparent',
    color: theme.colors['button/default'],

    '&:hover': {
      color: theme.colors['button/hover'],
      backgroundColor: theme.colors['bg/grey/2'],
    },

    '&:active': {
      color: theme.colors['button/pressed'],
      backgroundColor: theme.colors['bg/grey/3'],
    },

    '&:disabled': {
      color: theme.colors['text/disabled'],
    },
  },

  text: {
    ...theme.typography['body/xs'],
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    borderRadius: 0,

    '&:hover': {
      backgroundColor: theme.colors['bg/grey/2'],
    },

    '&:active': {
      color: theme.colors['button/pressed'],
    },

    '&:disabled': {
      color: theme.colors['text/disabled'],
    },
  },

  authorization: {
    ...theme.typography['body/s'],

    backgroundColor: theme.colors['bg/light'],
    color: theme.colors['text/grey/1'],

    borderRadius: '10px',
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
    gap: theme.spacing(3),

    '& svg path': {
      stroke: 'none !important',
    },

    ':hover': {
      backgroundColor: theme.colors['bg/grey/2'],
    },

    ':active': {
      backgroundColor: theme.colors['bg/grey/1'],
    },

    ':disabled': {
      color: theme.colors['text/disabled'],
    },
  },

  fullWidth: {
    width: '100%',

    display: 'inline-flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
