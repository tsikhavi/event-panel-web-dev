import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'ButtonGroup' })((theme) => ({
  root: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
}));

export default useStyles;
