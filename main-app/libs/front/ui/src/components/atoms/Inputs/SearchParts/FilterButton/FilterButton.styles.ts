import { makeStyles } from '../../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'FilterButton' })((theme) => ({
  root: {
    ...theme.typography['body/xs'],
    color: theme.colors['text/grey/1'],

    padding: `${theme.spacing(2)} ${theme.spacing(2)}`,

    borderRadius: '4px',
    border: `1px solid ${theme.colors['field/default']}`,
    backgroundColor: theme.colors['bg/light'],

    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors['bg/grey/2'],
    },

    '&:active': {
      backgroundColor: theme.colors['bg/grey/3'],
    },
  },

  active: {
    color: theme.colors['text/button/contained'],
    backgroundColor: theme.colors['button/default'],
    border: `1px solid ${theme.colors['button/default']}`,

    '&:hover': {
      backgroundColor: theme.colors['button/hover'],
      border: `1px solid ${theme.colors['button/hover']}`,
    },

    '&:active': {
      backgroundColor: theme.colors['button/pressed'],
      border: `1px solid ${theme.colors['button/default']}`,
    },
  },
}));

export default useStyles;
