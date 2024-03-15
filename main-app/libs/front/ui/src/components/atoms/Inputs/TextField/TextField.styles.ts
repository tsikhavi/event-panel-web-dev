import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'TextField' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  inputContainer: {
    position: 'relative',
    width: '100%',
    margin: `${theme.spacing(2)} 0 ${theme.spacing(1)}`,
    'input:focus + div': {
      display: 'flex',
    },
    '&:has(div)': {
      'input:focus': {
        paddingRight: theme.spacing(10),
      },
    },
  },

  input: {
    width: '100%',
  },

  buttonContainer: {
    position: 'absolute',
    top: '50%',
    right: theme.spacing(2),
    transform: 'translateY(-50%)',
    display: 'none',
    alignItems: 'center',
  },

  message: {
    ...theme.typography['body/xxs'],
  },

  error: {
    color: theme.colors['text/error'],
  },

  success: {
    color: theme.colors['text/success'],
  },
}));

export default useStyles;
