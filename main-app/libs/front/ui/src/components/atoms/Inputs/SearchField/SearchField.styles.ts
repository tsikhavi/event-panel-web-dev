import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'SearchField' })((theme) => ({
  root: {
    width: '100%',
  },

  item: {
    ...theme.typography['body/xs'],

    padding: `${theme.spacing(3)}`,
    borderRadius: '8px',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.colors['bg/grey/2'],
    },
  },
}));

export default useStyles;
