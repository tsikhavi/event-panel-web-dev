import { makeStyles } from '../../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'SearchField' })((theme) => ({
  root: {
    position: 'relative',
  },

  fullWidth: {
    width: '100%',
    boxSizing: 'border-box',
  },

  field: {
    ...theme.typography['body/xs'],
    color: theme.colors['text/black/1'],

    backgroundColor: theme.colors['bg/light'],

    border: 'none',
    borderRadius: '4px',
    outline: '1px solid',
    outlineColor: theme.colors['field/default'],

    width: '100%',
    display: 'block',
    boxSizing: 'border-box',

    padding: `${theme.spacing(2)} `,

    pointerEvents: 'auto',

    '::placeholder': {
      color: theme.colors['text/placeholder'],
      fontWeight: 300,
    },
  },

  focus: {
    ':focus': {
      outlineColor: theme.colors['field/focused'],
    },
  },

  icons: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: theme.spacing(3),

    color: theme.colors['text/placeholder'],

    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',

    position: 'absolute',
    top: 0,

    pointerEvents: 'none',
  },

  iconButton: {
    pointerEvents: 'auto',
  },
}));

export default useStyles;
