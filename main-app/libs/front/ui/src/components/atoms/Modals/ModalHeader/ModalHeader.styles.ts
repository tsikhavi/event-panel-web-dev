import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles<{ hasLabel: boolean }>({ name: 'ModalHeader' })((_, { hasLabel }) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: hasLabel ? 'space-between' : 'flex-end',
    alignItems: 'center',
  },
}));

export default useStyles;
