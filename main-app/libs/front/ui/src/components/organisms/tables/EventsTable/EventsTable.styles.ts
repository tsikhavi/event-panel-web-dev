import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'EventsTable' })((theme) => ({
  cellFlexColumn: {
    minWidth: 'fit-content',
    whiteSpace: 'nowrap',

    display: 'flex',
    flexDirection: 'column',
  },

  cellFlexRow: {
    display: 'flex',
    gap: theme.spacing(2),
  },

  cellGap: {
    gap: theme.spacing(1),
  },

  cellWrap: {
    flexWrap: 'wrap',
  },
}));

export default useStyles;
