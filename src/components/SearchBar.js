import React from 'react';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: "rgba(255,255,255,0.5)",
  },
  input: {
    color: 'white',
  },
  iconButton: {
    color: 'white',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: 120,
    //   '&:focus': {
    //     width: 240,
    //   },
    // },
  },
}));


export default function SearchBar(props) {
  //Inits

  const classes = useStyles();

  function onChangeSortMethod(event) {
    var newViewParam = { ...props.viewParameters }
    switch (event.target.value) {
      case 1:
        newViewParam.sort = 'name'
        newViewParam.order = 'asc'
        break
      case 2:
        newViewParam.sort = 'name'
        newViewParam.order = 'desc'
        break
      case 3:
        newViewParam.sort = 'date'
        newViewParam.order = 'desc'
        break
      case 4:
        newViewParam.sort = 'date'
        newViewParam.order = 'asc'
        break
      case 5:
        newViewParam.sort = 'price'
        newViewParam.order = 'asc'
        break
      case 6:
        newViewParam.sort = 'price'
        newViewParam.order = 'desc'
        break
      default:
        newViewParam.sort = 'date'
        newViewParam.order = 'asc'
    }
    props.setViewParameters(newViewParam)
  }

  function onChangeSearch(event) {
    var newViewParam = { ...props.viewParameters }
    newViewParam.search = event.target.value
    props.setViewParameters(newViewParam)
  }

  //Render
  return (
    <React.Fragment>
      <form className={classes.search}>
        <Select defaultValue={0} input={<Input id="grouped-select" />} color='primary' disableUnderline style={{ color: '#fff', padding: '8px' }} onChange={onChangeSortMethod} >
          <MenuItem value="0">
            <em>Sort...</em>
          </MenuItem>
          <ListSubheader>Name</ListSubheader>
          <MenuItem value={1}>A to Z</MenuItem>
          <MenuItem value={2}>Z to A</MenuItem>
          <ListSubheader>Date</ListSubheader>
          <MenuItem value={3}>Newest</MenuItem>
          <MenuItem value={4}>Oldest</MenuItem>
          <ListSubheader>Price</ListSubheader>
          <MenuItem value={5}>Most Expensive</MenuItem>
          <MenuItem value={6}>Cheapest</MenuItem>
        </Select>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          endAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={onChangeSearch}
        />
      </form>
    </React.Fragment>

  )
}
