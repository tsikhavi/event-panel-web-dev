import { makeStyles } from '../../../../theme/makeStyles';

export const useStyles = makeStyles({ name: 'TextArea' })((theme) => ({
  root: {
    ...theme.typography['body/s'],
    color: theme.colors['text/black/1'],
    display: 'block',

    width: '100%',

    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,

    border: 'none',
    borderRadius: '4px',
    outline: '1px solid',
    outlineColor: theme.colors['field/default'],

    backgroundColor: theme.colors['bg/light'],

    resize: 'none',
    overflow: 'hidden',

    ':hover': {
      backgroundColor: theme.colors['bg/grey/2'],
    },

    ':focus': {
      outlineColor: theme.colors['field/focused'],
    },

    ':disabled': {
      color: theme.colors['text/disabled'],
      outlineColor: theme.colors['field/disabled'],
    },

    '::placeholder': {
      color: theme.colors['text/placeholder'],
      fontWeight: 300,
    },
  },

  error: {
    outlineColor: theme.colors['field/error'],
  },

  success: {
    outlineColor: theme.colors['field/success'],
  },
}));
