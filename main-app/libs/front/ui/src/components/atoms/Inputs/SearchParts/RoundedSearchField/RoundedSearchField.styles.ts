import { makeStyles } from '../../../../../theme/makeStyles';

const useStyles = makeStyles<{ isActive: boolean }>({ name: 'RoundedSearchField' })((theme, { isActive }) => ({
  root: {
    position: 'relative',
    width: '320px',
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
    borderRadius: '18px',
    outline: '1px solid',
    outlineColor: isActive ? theme.colors['field/focused'] : theme.colors['field/default'],

    width: '100%',
    display: 'block',
    boxSizing: 'border-box',

    padding: `${theme.spacing(2)} ${theme.spacing(9)}`,

    pointerEvents: 'auto',

    '::placeholder': {
      color: theme.colors['text/placeholder'],
      fontWeight: 300,
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

  icon: {
    color: isActive ? theme.colors['icon/active'] : theme.colors['icon/inactive'],
  },

  iconButton: {
    pointerEvents: 'auto',
  },
}));

export default useStyles;
