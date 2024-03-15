import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Typography' })((theme) => ({
  root: {
    margin: 0,
  },

  centerAlign: {
    textAlign: 'center',
  },

  h1: { ...theme.typography['h1'] },
  h2: { ...theme.typography['h2'] },
  h3: { ...theme.typography['h3'] },

  bodyXL: { ...theme.typography['body/xl'] },
  bodyL: { ...theme.typography['body/l'] },
  bodyM: { ...theme.typography['body/m'] },
  bodyS: { ...theme.typography['body/s'] },
  bodyXS: { ...theme.typography['body/xs'] },
  bodyXXS: { ...theme.typography['body/xxs'] },

  primary: {
    color: theme.colors['text/black/1'],
  },

  secondary: {
    color: theme.colors['text/grey/1'],
  },

  inherit: {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    fontSize: 'inherit',
  },
}));

export default useStyles;
