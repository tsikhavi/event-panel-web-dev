import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Entity' })((theme) => ({
  root: {
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    gap: theme.spacing(2),

    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    border: `1px solid ${theme.colors['field/default']}`,
    borderRadius: theme.spacing(1),
  },
}));

export default useStyles;
