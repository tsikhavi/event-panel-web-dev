import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Logo' })((theme) => ({
  root: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textDecoration: 'none',
  },

  logo: {
    width: '48px',
    height: '48px',
    display: 'inline-block',
    backgroundImage: theme.logo,
  },

  label: {
    ...theme.typography['body/xl'],
    color: theme.colors['text/black/1'],
  },

  invert: {
    color: theme.colors['bg/light'],
  },
}));

export default useStyles;
