import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Popover' })(() => ({
  popover: {
    position: 'relative',
    zIndex: 2,
  },
}));

export default useStyles;
