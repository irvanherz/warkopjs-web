import React, { useEffect, useState } from 'react';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import Axios from 'axios';


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
    display: 'flex',
    boxShadow: '2px 2px 5px #BBB'
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
    flexGrow: 1
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));


export default function SearchBar(props) {
  const classes = useStyles();

  function reloadProducts(params){
    Axios.get('http://127.0.0.1:3001/products', {headers:{'Authorization': props.authData.data.token}, params:params } )
          .then(response => {
            if (response.status === 200) {
              props.productAction.setData(response.data.data)
            }
          })
          .catch(error => {
              if (!error.response) {
                  props.enqueueSnackbar('Connection error!', { variant: 'error' })
              } else {
                  if (error.response.data.errors) {
                      error.response.data.errors.forEach(e => {
                          props.enqueueSnackbar(e.message, { variant: 'error' })
                      })
                  } else {
                    props.enqueueSnackbar('Unknown server error', { variant: 'error' })
                  }
              }
          })
  }

  function onChangeSortMethod(event) {
    let params = { ...props.productData.params }
    switch (event.target.value) {
      case 1: params.sort = 'name'; params.order = 'asc'; break;
      case 2: params.sort = 'name'; params.order = 'desc'; break;
      case 3: params.sort = 'date'; params.order = 'desc'; break;
      case 4: params.sort = 'date'; params.order = 'asc'; break;
      case 5: params.sort = 'price'; params.order = 'asc'; break;
      case 6: params.sort = 'price'; params.order = 'desc'; break;
      default: params.sort = 'date'; params.order = 'asc';
    }
    props.productAction.setParams(params)
    reloadProducts(params)
  }

  function onChangeSearch(event) {
    let params = {...props.productData.params, search: event.target.value}
    props.productAction.setParams(params)
    reloadProducts(params)
  }

  function onChangeCategory(event) {
    let params = {...props.productData.params}
    if(event.target.value < 1){
      if(params.category){
        delete params.category
      }
    } else {
      params.category = event.target.value
    }
    reloadProducts(params)
  }

  //Render
  return (
    <React.Fragment>
      <Box component='form' className={classes.search}>
        <Select defaultValue='0' input={<Input id="grouped-select" />} color='primary' disableUnderline style={{padding: '8px' }} onChange={onChangeCategory} >
          <MenuItem value="0"><em>All category</em></MenuItem>
          {props.categoryData.items.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
        </Select>
        <Select defaultValue={3} input={<Input id="grouped-select" />} color='primary' disableUnderline style={{ padding: '8px' }} onChange={onChangeSortMethod} >
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
      </Box>
    </React.Fragment>

  )
}
