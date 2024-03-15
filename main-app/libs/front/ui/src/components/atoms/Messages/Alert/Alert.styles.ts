import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles<{ header: boolean }>({ name: 'Alert' })((theme, { header }) => ({
  root: {
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,

    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: header ? 'flex-start' : 'center',
    gap: theme.spacing(2),

    borderRadius: '4px',
    border: '1px solid transparent',
  },

  info: {
    borderColor: theme.colors['blue/1'],
  },

  error: {
    borderColor: theme.colors['field/error'],
  },

  success: {
    borderColor: theme.colors['field/success'],
  },

  icon: {
    paddingTop: header ? theme.spacing(1) : 0,
  },

  infoIcon: {
    color: theme.colors['blue/1'],
  },
  errorIcon: {
    color: theme.colors['field/error'],
  },
  successIcon: {
    color: theme.colors['field/success'],
  },

  messageBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },

  header: {
    fontWeight: 700,
  },

  message: {
    color: theme.colors['text/black/1'],
  },
}));

export default useStyles;
