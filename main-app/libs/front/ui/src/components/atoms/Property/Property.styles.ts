import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Property' })((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',

    wordBreak: 'break-all',

    gap: theme.spacing(4),
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,

    borderRadius: 0,
    border: `1px solid ${theme.colors['field/default']}`,
    borderBottom: 'none',

    '&:first-of-type': {
      borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
    },

    '&:last-of-type': {
      borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
    },

    '&:last-child': {
      border: `1px solid ${theme.colors['field/default']}`,
    },

    '&:only-of-type': {
      borderRadius: theme.spacing(1),
    },
  },
  wrapper: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    gap: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  name: {
    width: '50%',
  },
  type: {
    width: '50%',
  },
  description: {
    color: theme.colors['text/placeholder'],
  },
  icon: {
    padding: '0',
  },
}));

export default useStyles;
