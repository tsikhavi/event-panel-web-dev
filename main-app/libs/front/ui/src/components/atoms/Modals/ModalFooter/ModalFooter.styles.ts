import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'ModalFooter' })((theme) => ({
  root: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',

    gap: theme.spacing(2),
  },
}));

export default useStyles;
