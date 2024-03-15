import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles<{ hasHeader: boolean; isHeaderBorder: boolean; isFooterBorder: boolean }>({
  name: 'SideModal',
})((theme, { hasHeader, isHeaderBorder, isFooterBorder }) => ({
  root: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  modal: {
    position: 'relative',

    width: '450px',
    height: '100vh',
    display: 'inline-flex',
    flexDirection: 'column',

    backgroundColor: theme.colors['bg/light'],
  },

  header: {
    position: 'relative',

    width: '100%',

    display: 'flex',
    justifyContent: hasHeader ? 'flex-start' : 'flex-end',

    backgroundColor: theme.colors['bg/light'],

    gap: theme.spacing(3),
    padding: `${theme.spacing(4)} ${theme.spacing(6)}`,

    borderBottom: isHeaderBorder ? `1px solid ${theme.colors['border/default']}` : `1px solid transparent`,

    zIndex: 5,
  },

  mainContainer: {
    height: '100%',
    overflow: 'auto',
    scrollbarGutter: 'stable',
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),

    padding: `0 ${theme.spacing(6)} ${theme.spacing(1)}`,
  },

  footer: {
    position: 'relative',
    padding: `${theme.spacing(4)} ${theme.spacing(6)}`,

    borderTop: isFooterBorder ? `1px solid ${theme.colors['border/default']}` : `1px solid transparent`,

    background: theme.colors['bg/light'],

    zIndex: 5,
  },

  hasBorder: {},
}));

export default useStyles;
