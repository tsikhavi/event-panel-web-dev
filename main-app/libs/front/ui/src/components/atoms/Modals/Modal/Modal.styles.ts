import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Modal' })(() => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    display: 'inline-flex',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 16, 84, 0.20)',
  },

  center: {
    alignItems: 'center',
  },
}));

export default useStyles;
