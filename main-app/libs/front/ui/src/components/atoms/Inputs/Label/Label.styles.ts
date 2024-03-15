import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Label' })((theme) => ({
  root: {
    ...theme.typography['body/s'],
    color: theme.colors['text/grey/1'],
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
