import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    },
  }
))

export default function QtyInput() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
    <ButtonGroup variant="text" aria-label="outlined primary button group">
  <Button>-</Button>
  <InputBase ></InputBase>
  <Button>-</Button>
</ButtonGroup>
  </Paper>
  );
}