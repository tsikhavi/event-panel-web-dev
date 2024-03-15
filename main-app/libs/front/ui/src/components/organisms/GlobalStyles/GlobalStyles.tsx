import React, { Fragment } from 'react';
import { GlobalStyles as TssGlobalStyles } from 'tss-react';

import { useStyles } from '../../../theme/makeStyles';

const GlobalStyles = () => {
  const { theme } = useStyles();

  const addFontFaces = () => {
    return theme?.fontFaces.map((fontFace, key) => <TssGlobalStyles key={key} styles={{ '@font-face': fontFace }} />);
  };

  return (
    <Fragment>
      {addFontFaces()}
      <TssGlobalStyles
        styles={{
          '*': {
            ...theme.typography['body/m'],

            boxSizing: 'border-box',

            '::-webkit-scrollbar': {
              width: '8px',
            },
            '::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: theme.colors['bg/grey/1'],
              borderRadius: '100px',
            },
          },

          html: {
            width: '100%',
            height: '100%',

            overflow: 'hidden',
          },

          body: {
            width: '100%',
            height: '100%',

            margin: '0 !important',
            padding: '0 !important',

            color: theme.colors['text/black/1'],
            backgroundColor: theme.colors['bg/light'],
          },

          '#root': {
            minWidth: '100%',
            minHeight: '100%',
            maxHeight: '100%',

            flex: 1,
            display: 'inline-flex',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
          },

          '#storybook-root': {
            padding: '1rem',
            border: '4px solid purple',

            minWidth: '100%',
            minHeight: '100%',
            maxHeight: '100%',

            overflow: 'scroll',

            flex: 1,
            display: 'inline-flex',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: '24px',
          },
        }}
      />
    </Fragment>
  );
};

export default GlobalStyles;
