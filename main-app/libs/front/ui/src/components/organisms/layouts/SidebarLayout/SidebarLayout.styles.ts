import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'SidebarLayout' })(() => ({
  root: {
    flex: 1,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    display: 'inline-flex',
  },

  content: {
    flex: 1,
    display: 'flex',
  },
}));

export default useStyles;
