import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Divider' })((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '3px',
    '&:before': {
      content: '""',
      display: 'block',
      width: '100%',
      height: '1px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: theme.colors['bg/default'],
      zIndex: '1',
    },
  },
  label: {
    ...theme.typography['body/s'],
    textTransform: 'uppercase',
    position: 'relative',
    padding: `0 ${theme.spacing(3)}`,
    color: theme.colors['text/grey/1'],
    backgroundColor: theme.colors['bg/light'],
    zIndex: 2,
  },
}));

export default useStyles;
