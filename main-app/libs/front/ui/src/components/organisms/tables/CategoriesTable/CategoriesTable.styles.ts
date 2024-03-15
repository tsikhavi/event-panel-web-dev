import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'CategoriesTable' })((theme) => ({
  flexCell: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
}));

export default useStyles;
