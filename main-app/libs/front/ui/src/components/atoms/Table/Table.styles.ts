import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles<Partial<{ size: number }>>({ name: 'Table' })((theme, { size }) => ({
  root: {
    ...theme.typography['body/xs'],

    width: '100%',

    borderRadius: '8px',
    border: `1px solid ${theme.colors['bg/blue/1']}`,
    backgroundColor: theme.colors['bg/light'],
  },

  header: {
    width: '100%',
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,

    display: 'inline-flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    borderBottom: `1px solid ${theme.colors['bg/blue/1']}`,
  },

  table: {
    width: '100%',

    borderCollapse: 'collapse',
    borderBottom: `1px solid ${theme.colors['bg/blue/1']}`,
  },

  tableRow: {
    th: {},
    td: {},

    '&:last-child': {
      td: {
        borderBottom: 'none',
      },
    },
  },

  tableRowFlex: {
    display: 'flex',
    flexDirection: 'row',
  },

  tableCell: {
    ...(size && { flex: size }),
    ...theme.typography['body/xs'],

    textAlign: 'left',

    borderRight: `1px solid ${theme.colors['bg/blue/1']}`,
    borderBottom: `1px solid ${theme.colors['bg/blue/1']}`,
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,

    '&:first-of-type': {
      borderLeft: 'none',
    },

    '&:last-child': {
      borderRight: 'none',
    },
  },

  footer: {
    height: theme.spacing(5),
  },

  highlighted: {
    backgroundColor: theme.colors['bg/grey/2'],
  },
}));

export default useStyles;
