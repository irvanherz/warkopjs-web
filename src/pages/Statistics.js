

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
import {List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import {Inbox as InboxIcon, Drafts as DraftsIcon} from '@material-ui/icons'
import currencyFormatter from 'currency-formatter'

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

const CHOICES = [
  {
    id:1,
    title:'Today',
    reportParams: { dateStart: moment().subtract(1, 'day').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD'), period: 'hourly' },
    summaryParams: { dateStart: moment().subtract(1, 'day').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD') },
  },
  {
    id: 2,
    title: 'Yesterday',
    reportParams: { dateStart: moment().subtract(2, 'day').format('YYYY-MM-DD'), dateEnd: moment().subtract(1, 'day').format('YYYY-MM-DD'), period: 'hourly' },
    summaryParams: { dateStart: moment().subtract(2, 'day').format('YYYY-MM-DD'), dateEnd: moment().subtract(1, 'day').format('YYYY-MM-DD')},
  },
  {
    id: 3,
    title: 'This week',
    reportParams: { dateStart: moment().subtract(1, 'week').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD'), period: 'daily' },
    summaryParams: { dateStart: moment().subtract(1, 'week').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD')},
  },
  {
    id: 4,
    title: 'Last week',
    reportParams: { dateStart: moment().subtract(2, 'week').format('YYYY-MM-DD'), dateEnd: moment().subtract(1, 'week').format('YYYY-MM-DD'), period: 'daily' },
    summaryParams: { dateStart: moment().subtract(2, 'week').format('YYYY-MM-DD'), dateEnd: moment().subtract(1, 'week').format('YYYY-MM-DD')},
  },
  {
    id: 5,
    title: 'This month',
    reportParams: { dateStart: moment().subtract(1, 'month').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD'), period: 'daily' },
    summaryParams: { dateStart: moment().subtract(1, 'month').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD')},
  },
  {
    id: 6,
    title: 'Last month',
    reportParams: { dateStart: moment().subtract(2, 'month').format('YYYY-MM-DD'), dateEnd: moment().subtract(1, 'month').format('YYYY-MM-DD'), period: 'daily' },
    summaryParams: { dateStart: moment().subtract(2, 'month').format('YYYY-MM-DD'), dateEnd: moment().subtract(1, 'month').format('YYYY-MM-DD')},
  },
  {
    id: 7,
    title: 'This year',
    reportParams: { dateStart: moment().subtract(1, 'year').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD'), period: 'monthly' },
    summaryParams: { dateStart: moment().subtract(1, 'year').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD')},
  },
  {
    id: 8,
    title: 'Last year',
    reportParams: { dateStart: moment().subtract(2, 'year').format('YYYY-MM-DD'), dateEnd: moment().subtract(1, 'year').format('YYYY-MM-DD'), period: 'monthly' },
    summaryParams: { dateStart: moment().subtract(2, 'year').format('YYYY-MM-DD'), dateEnd: moment().subtract(1, 'year').format('YYYY-MM-DD')},
  },
]

function Statistics(props) {
  const [summaryParams, setSummaryParams] = React.useState({})
  const [summaryData, setSummaryData] = React.useState({})
  const [reportData, setReportData] = React.useState({})
  const [reportParams, setReportParams] = React.useState({})

  if(!props.authData.data.id) props.history.push('/signin')
  //Init
  function reloadReport(params={dateStart:moment().subtract(1, 'month').format('YYYY-MM-DD'), dateEnd:moment().format('YYYY-MM-DD'), period:'daily'}){
    Axios.get(`${process.env.REACT_APP_API_HOST}/products/reports`, {headers:{'Authorization': props.authData.data.token}, params:params } )
          .then(response => {
            if (response.status === 200) {
              setReportData(response.data.data)
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

  function reloadSummary(params = { dateStart: moment().subtract(1, 'month').format('YYYY-MM-DD'), dateEnd: moment().format('YYYY-MM-DD')}) {
    Axios.get(`${process.env.REACT_APP_API_HOST}/orders`, { headers: { 'Authorization': props.authData.data.token }, params: params })
      .then(response => {
        if (response.status === 200) {
          setSummaryData(response.data.data)
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
    reloadReport(CHOICES[4].reportParams)
    reloadSummary(CHOICES[4].summaryParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onChangeReport(event){
    const choice = event.target.value
    let choiceData = CHOICES.find(item => item.id == choice)
    if(!choiceData){
      choiceData = CHOICES[4];
    }
    reloadReport(choiceData.reportParams)
    reloadSummary(choiceData.summaryParams)
  }
  
  const renderItem = (item) => {
    return(
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={`Order #${item.invoice_id}`} secondary={moment(item.created_at).format('YYYY/MM/DD HH:mm:ss')} />
        <ListItemSecondaryAction>
          <div>{currencyFormatter.format(item.price, { code: 'IDR' })}</div>
          <div style={{textAlign:'right'}}>{item.sum_items} items</div>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  return (
    <React.Fragment>
      <Container leftMenu={<LeftMenuContent {...props} />} {...props}>
          <Card style={{flexWrap:'wrap'}}>
            <CardHeader action={
              <FormControl>
                  <Select onChange={onChangeReport} variant="outlined" margin='dense' defaultValue={5}>
                    {
                      CHOICES.map(choice => <MenuItem value={choice.id}>{choice.title}</MenuItem>)
                    }
                  </Select>
              </FormControl>
            } title="Summary" subheader={`From ${reportData.start} to ${reportData.end}`} />
            <CardContent style={{height:'300px', width:'100%'}}>
              <ResponsiveContainer width={"99.9%"} height={"99.98%"}>
                <AreaChart data={reportData.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
       
        <Card style={{ marginTop:'32px',flexWrap: 'wrap' }}>
          <CardHeader title="Transactions" />
          <CardContent>
          <List component="nav" aria-label="main mailbox folders">
            {
              summaryData.items && summaryData.items.length ? summaryData.items.map(item => renderItem(item)) : <div style={{padding:'8px'}}><i>No transaction found.</i></div>
            }
          </List>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  )
}


export default Statistics