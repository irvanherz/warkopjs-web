

import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import CartList from '../components/CartList';
import LeftMenuContent from '../components/LeftMenuContent';
import Container from './Container'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as productActions from "../public/redux/actions/product";
import * as categoryActions from "../public/redux/actions/category";
import * as cartActions from "../public/redux/actions/cart"
import * as miscActions from "../public/redux/actions/misc"
import * as reportActions from "../public/redux/actions/report"

import Axios from 'axios'

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, linearGradient, AreaChart, Area
} from 'recharts';

import moment from 'moment'


function Statistics(props) {
  if(!props.authData.data.id) props.history.push('/signin')
  //Init
  function reloadReport(params={dateStart:moment().subtract(1, 'month').format('YYYY-MM-DD'), dateEnd:moment().format('YYYY-MM-DD'), period:'daily'}){
    Axios.get('http://127.0.0.1:3001/products/reports', {headers:{'Authorization': props.authData.data.token}, params:params } )
          .then(response => {
            if (response.status === 200) {
              props.reportAction.setData(response.data.data)
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

  useEffect(() => {
    props.miscAction.setState({openLeftMenu: false, openRightMenu: false})
    //Init first report
    let params = {dateStart:moment().subtract(1, 'month').format('YYYY-MM-DD'), dateEnd:moment().format('YYYY-MM-DD'), period:'daily'}
    console.log(params)
    props.reportAction.setParams(params)
    reloadReport(params)
  }, [])

  function onChangeReport(event){
    let params
    switch(event.target.value){
      case 1: //today
        params = {dateStart:moment().subtract(1, 'day').format('YYYY-MM-DD'), dateEnd:moment().format('YYYY-MM-DD'), period:'hourly'}
        reloadReport(params)
        break
      case 2: //yesterday
        params = {dateStart:moment().subtract(2, 'day').format('YYYY-MM-DD'), dateEnd:moment().subtract(1,'day').format('YYYY-MM-DD'), period:'hourly'}
        reloadReport(params)
        break
      case 3: //this week
        params = {dateStart:moment().subtract(1, 'week').format('YYYY-MM-DD'), dateEnd:moment().format('YYYY-MM-DD'), period:'daily'}
        reloadReport(params)
        break
      case 4: //last week
        params = {dateStart:moment().subtract(2, 'week').format('YYYY-MM-DD'), dateEnd:moment().subtract(1,'week').format('YYYY-MM-DD'), period:'daily'}
        reloadReport(params)
        break
      case 6:
        params = {dateStart:moment().subtract(2, 'month').format('YYYY-MM-DD'), dateEnd:moment().subtract(1,'month').format('YYYY-MM-DD'), period:'daily'}
        reloadReport(params)
        break
      case 7:
        params = {dateStart:moment().subtract(1, 'year').format('YYYY-MM-DD'), dateEnd:moment().format('YYYY-MM-DD'), period:'monthly'}
        reloadReport(params)
        break
      case 8:
        params = {dateStart:moment().subtract(2, 'year').format('YYYY-MM-DD'), dateEnd:moment().subtract(1, 'year').format('YYYY-MM-DD'), period:'monthly'}
        reloadReport(params)
        break
      default: //this month
        params = {dateStart:moment().subtract(1, 'month').format('YYYY-MM-DD'), dateEnd:moment().format('YYYY-MM-DD'), period:'daily'}
        reloadReport(params)
    }
  }
  //Render
  return (
    <React.Fragment>
      <Container leftMenu={<LeftMenuContent {...props} />} {...props}>
          <Card style={{flexWrap:'wrap'}}>
            <CardHeader action={
              <FormControl>
                  <Select onChange={onChangeReport} variant="outlined" margin='dense' defaultValue={5}>
                      <MenuItem value={1}>Today</MenuItem>
                      <MenuItem value={2}>Yesterday</MenuItem>
                      <MenuItem value={3}>This week</MenuItem>
                      <MenuItem value={4}>Last week</MenuItem>
                      <MenuItem value={5}>This month</MenuItem>
                      <MenuItem value={6}>Last month</MenuItem>
                      <MenuItem value={7}>This year</MenuItem>
                      <MenuItem value={8}>Last year</MenuItem>
                  </Select>
              </FormControl>
            } title="Summary" subheader={`From ${props.reportData.start} to ${props.reportData.end}`} />
            <CardContent style={{height:'300px', width:'100%'}}>
              <ResponsiveContainer width={"99.9%"} height={"99.98%"}>
                <AreaChart data={props.reportData.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeStart" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="turnover" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" activeDot={{ r: 8 }} />
                  <Area yAxisId="right" type="monotone" dataKey="item_sold" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
      </Container>
    </React.Fragment>
  )
}


export default Statistics