import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'DesktopLayout' })(() => ({
  root: {
    width: '100%',
    minWidth: '900px',

    height: '100%',
    minHeight: '650px',
    maxHeight: '100%',
    overflow: 'hidden',

    flex: 1,
    display: 'inline-flex',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
}));

export default useStyles;
