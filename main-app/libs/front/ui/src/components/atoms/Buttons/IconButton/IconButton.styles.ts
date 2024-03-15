import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'IconButton' })((theme) => ({
  root: {
    padding: theme.spacing(1),

    border: 'none',
    borderRadius: '100%',

    backgroundColor: 'inherit',
    color: theme.colors['icon/inactive'],

    '&:hover': {
      cursor: 'pointer',
      color: theme.colors['icon/active'],
      backgroundColor: theme.colors['bg/grey/2'],
    },

    '&:active': {
      color: theme.colors['icon/active'],
      backgroundColor: theme.colors['bg/grey/3'],
    },

    '&:disabled': {
      cursor: 'not-allowed',
      color: theme.colors['stroke/disabled'],
    },
  },
}));

export default useStyles;
