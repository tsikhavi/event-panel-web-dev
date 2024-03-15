import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'AuthGroup' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

export default useStyles;
