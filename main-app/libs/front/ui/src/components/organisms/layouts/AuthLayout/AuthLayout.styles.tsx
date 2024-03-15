import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'AuthLayout' })((theme) => ({
  root: {
    minWidth: '100%',
    minHeight: '100%',

    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundImage: 'url(assets/images/svg/background.svg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    transform: 'translate3d(0,0,0)',
  },

  paper: {
    padding: theme.spacing(8),

    width: '100%',
    maxWidth: '400px',
  },

  form: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));

export default useStyles;
