import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'NotFound' })((theme) => ({
  root: {
    height: '100%',

    gap: theme.spacing(20),

    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',

    gap: theme.spacing(11),
  },

  textWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: theme.spacing(2),
  },
}));

export default useStyles;
