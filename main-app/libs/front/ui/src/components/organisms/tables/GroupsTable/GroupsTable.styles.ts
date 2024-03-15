import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'GroupsTable' })((theme) => ({
  flexCell: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
}));

export default useStyles;
