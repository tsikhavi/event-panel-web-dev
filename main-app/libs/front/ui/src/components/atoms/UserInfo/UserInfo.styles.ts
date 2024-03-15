import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'UserInfo' })((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(3),
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,

    maxWidth: '100%',
    minWidth: 0,
  },

  workspace: {
    ...theme.typography['body/m'],

    color: theme.colors['text/black/1'],

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  email: {
    ...theme.typography['body/xs'],
    color: theme.colors['text/grey/1'],

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  item: {
    ...theme.typography['body/s'],

    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    borderRadius: '4px',

    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme.colors['bg/grey/2'],
    },
  },
}));

export default useStyles;
