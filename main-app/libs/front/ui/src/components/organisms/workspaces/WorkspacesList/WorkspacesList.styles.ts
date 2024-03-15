import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'WorkspacesList' })((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(11),

    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    gap: theme.spacing(4),

    position: 'relative',
  },

  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
    userSelect: 'none',

    '&:hover': {
      backgroundColor: theme.colors['bg/grey/2'],
    },

    '&:active': {
      backgroundColor: theme.colors['bg/grey/3'],
    },
  },
}));

export default useStyles;
