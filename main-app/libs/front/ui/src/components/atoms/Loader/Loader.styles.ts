import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Loader' })((theme) => ({
  root: {
    padding: theme.spacing(8),

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 16, 84, 0.20)',
    zIndex: 999,
  },
}));

export default useStyles;
