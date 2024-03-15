import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles<{ isSelected: boolean }>({ name: 'FileInput' })((theme, { isSelected }) => ({
  label: {
    display: 'inline-flex',
    flexDirection: 'column',
  },

  wrapper: {
    position: 'relative',

    width: '104px',
    height: '104px',

    color: theme.colors['text/placeholder'],

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    borderRadius: theme.spacing(4),
    backgroundColor: theme.colors['bg/light'],

    border: `1px solid`,
    borderColor: isSelected ? 'transparent' : theme.colors['border/default'],

    overflow: 'hidden',

    cursor: 'pointer',

    ':hover': {
      backgroundColor: theme.colors['bg/grey/2'],
    },
  },

  input: {
    position: 'absolute',
    width: '0px',
    height: '0px',
    opacity: 0,
    zIndex: -1,
  },

  image: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },

  closeBlock: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 2,
  },

  closeBtn: {
    backgroundColor: theme.colors['bg/grey/2'],
    '&:hover': {
      backgroundColor: theme.colors['bg/grey/3'],
    },
  },
}));

export default useStyles;
