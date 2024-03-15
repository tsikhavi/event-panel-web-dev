import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Sidebar' })((theme) => ({
  root: {
    width: theme.spacing(65),
    maxWidth: theme.spacing(65),

    padding: `${theme.spacing(4)} ${theme.spacing(6)}`,

    backgroundColor: theme.colors['bg/light'],

    flex: 1,
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(8),
    borderRight: `2px solid ${theme.colors['border/default']}`,
  },

  navigation: {
    flex: 1,
    display: 'inline-flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    justifyContent: 'flex-start',
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    margin: 0,
    padding: 0,
    listStyle: 'none',
    color: theme.colors['text/black/1'],
  },

  head: {
    marginBottom: theme.spacing(2),

    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },

  head_title: {
    ...theme.typography['body/l'],
  },

  item: {
    padding: `${theme.spacing(2)} ${theme.spacing(8)}`,
    paddingRight: 0,
    marginBottom: theme.spacing(1),

    '&:last-child': {
      marginBottom: 0,
    },

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.colors['sideMenuItem/bg/active'],
      borderRadius: theme.spacing(1),
    },
  },

  item_active: {
    backgroundColor: theme.colors['sideMenuItem/bg/active'],
    borderRadius: theme.spacing(1),
  },

  item_title: {
    ...theme.typography['body/s'],
  },

  item_title_active: {
    color: theme.colors['blue/1'],
  },
}));

export default useStyles;
