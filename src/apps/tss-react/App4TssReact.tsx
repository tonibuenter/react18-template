import React from 'react';
import { Button, Stack } from '@mui/material';
import './styles.css';

import { makeStyles, withStyles } from 'tss-react/mui'; // "tss-react/mui-compat" if your project is using Typescript < 4.4

const MyButtonStyled = withStyles(Button, (theme, { sx, opa }: any) => {
  return {
    root: {
      backgroundColor: sx?.backgroundColor ? sx.backgroundColor : 'blue',
      color: sx?.color ? sx.color : 'white',
      height: 100,
      '&:hover': {
        backgroundColor: sx?.color ? sx.color : 'white',
        color: sx?.backgroundColor ? sx.backgroundColor : 'blue'
      }
    },
    '@media (max-width: 960px)': {
      root: {
        backgroundColor: 'lightGray',
        color: 'blue',
        opacity: opa ? opa : 1,
        padding: theme.spacing(2, 3, 4, 5)
      }
    }
  };
});

export function App4TssReact() {
  const className = 'blue-button';
  const { classes, cx } = useStyles({ color: 'red' });

  //Thanks to cx, className will take priority over classes.root 🤩
  //With TSS you must stop using clsx and use cx instead.
  //More info here: https://github.com/mui/material-ui/pull/31802#issuecomment-1093478971
  return (
    <Stack direction={'column'} spacing={1}>
      <Button className={cx(classes.root, className)}>
        Blue Button (css overwrite)
      </Button>

      <Button sx={{ color: 'red' }}>Red Button (sx)</Button>

      <Button className={'orange-button'}>Orange Button (css)</Button>

      <Button className={classes.root2}>Button (secondary.main)</Button>

      <MyButtonStyled sx={{ color: 'white', backgroundColor: 'black' }}>
        MyButtonStyled (color = white)
      </MyButtonStyled>
    </Stack>
  );
}

const useStyles = makeStyles<{ color: 'red' | 'blue' }>()(
  (theme, { color }) => ({
    root: {
      color,
      '&:hover': {
        color: theme.palette.primary.main
      }
    },
    root2: {
      color: theme.palette.secondary.main,
      textTransform: 'none'
    }
  })
);
