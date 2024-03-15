import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'NavLink' })((theme) => ({
  root: {
    ...theme.typography['body/s'],

    display: 'block',

    color: theme.colors['text/black/1'],
    textDecoration: 'none',

    padding: `${theme.spacing(2)} 0 ${theme.spacing(2)} ${theme.spacing(8)}`,

    borderRadius: theme.spacing(1),

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.colors['sideMenuItem/bg/active'],
    },
  },
  active: {
    color: theme.colors['blue/1'],
    backgroundColor: theme.colors['sideMenuItem/bg/active'],
  },
}));

export default useStyles;
