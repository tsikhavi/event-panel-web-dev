import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Clip' })((theme) => ({
  root: {
    ...theme.typography['body/xs'],

    display: 'inline-block',
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,

    borderRadius: '14px',
  },

  default: {
    color: theme.colors['text/grey/1'],
    backgroundColor: theme.colors['bg/grey/3'],
  },

  disabled: {
    color: theme.colors['text/disabled'],
    backgroundColor: theme.colors['stroke/disabled'],
  },

  active: {
    color: theme.colors['bg/light'],
    backgroundColor: theme.colors['blue/1'],
  },
}));

export default useStyles;
