import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles<{ isOpen: boolean }>({ name: 'SelectField' })((theme, { isOpen }) => ({
  root: {},

  label: {
    marginBottom: theme.spacing(2),
  },

  inputContainer: {
    position: 'relative',

    '&:after': {
      userSelect: 'none',

      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 2,
    },
  },

  input: {
    color: theme.colors['text/black/1'],
    paddingRight: `calc(${theme.spacing(4)} + ${theme.spacing(5)} + ${theme.spacing(3)})`,
    outlineColor: isOpen ? theme.colors['field/focused'] : theme.colors['field/default'],
    cursor: 'pointer',
  },

  icon: {
    color: theme.colors['icon/inactive'],

    position: 'absolute',
    right: theme.spacing(4),
    top: '50%',
    transform: 'translateY(-50%)',

    pointerEvents: 'none',
  },

  dropdown: {
    width: '100%',
    maxHeight: '200px',

    padding: theme.spacing(1),
    marginTop: theme.spacing(1),

    borderRadius: '4px',
    border: `1px solid ${theme.colors['field/focused']}`,
    backgroundColor: theme.colors['bg/light'],
    boxShadow: theme.shadows['shadow/2'],

    overflow: 'auto',

    '&:empty': {
      display: 'none',
    },
  },
  option: {
    ...theme.typography['body/xs'],

    padding: `${theme.spacing(3)}`,
    borderRadius: '8px',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.colors['bg/grey/2'],
    },
  },

  optionActive: {
    color: theme.colors['button/default'],
  },
}));

export default useStyles;
