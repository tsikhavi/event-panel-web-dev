import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'PageLayout' })((theme) => ({
  root: {
    width: '100%',
    height: '100%',

    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
  },

  header: {
    padding: `${theme.spacing(4)} ${theme.spacing(6)}`,

    backgroundColor: theme.colors['bg/light'],

    position: 'sticky',
    top: 0,
  },

  content: {
    padding: `0 ${theme.spacing(6)} ${theme.spacing(6)}`,

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    gap: theme.spacing(5),

    overflow: 'auto',
    scrollbarGutter: 'stable',
  },
}));

export default useStyles;
