import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Dropdown' })((theme) => ({
  dropdown: {
    position: 'relative',

    maxHeight: '200px',

    padding: 0,

    borderRadius: '4px',
    border: `1px solid ${theme.colors['field/focused']}`,
    backgroundColor: theme.colors['bg/light'],
    boxShadow: theme.shadows['shadow/2'],

    overflow: 'auto',

    zIndex: 1,

    '&:empty': {
      display: 'none',
    },
  },
}));

export default useStyles;
