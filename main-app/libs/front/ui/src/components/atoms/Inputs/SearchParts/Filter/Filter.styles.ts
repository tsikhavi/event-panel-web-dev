import { makeStyles } from '../../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Filter' })((theme) => ({
  dropdown: {
    padding: 0,
    marginTop: theme.spacing(1),

    display: 'flex',
    flexDirection: 'column',

    borderRadius: '4px',
    border: `1px solid ${theme.colors['field/focused']}`,
    backgroundColor: theme.colors['bg/light'],
    boxShadow: theme.shadows['shadow/2'],
  },

  list: {
    maxWidth: '300px',
    minWidth: '200px',
    maxHeight: '200px',
    overflowY: 'auto',
    scrollbarGutter: 'stable',
  },

  searchFieldContainer: {
    padding: theme.spacing(2),
  },
}));

export default useStyles;
