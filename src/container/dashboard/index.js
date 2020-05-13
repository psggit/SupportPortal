import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import "./dashboard.scss"
import Input from "./../../components/input"
import Button from '@material-ui/core/Button';
import { FormGroup } from "./../../components/Form"
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      textDecorationLine: "none"
    },
  },
  button: {
    marginLeft: "140px",
  }
}))

function Dashboard(props) {

  const [consumerMobile, setConsumerMobile] = useState("")
  const [consumerID, setConsumerID] = useState("")
  const [orderID, setOrderID] = useState("")
  const [retailerMobile, setRetailerMobile] = useState("")
  const [retailerID, setRetailerID] = useState("")
  const [storeCode, setStoreCode] = useState("")
  const [deliveryAgentMobile, setDeliveryAgentMobile] = useState("")
  const [deliveryAgentID, setDeliveryAgentID] = useState("")
  const [enableConsumer, setEnableConsumer] = useState(false)
  const [enableRetailer, setEnabledRetailer] = useState(false)
  const [enableDeliveryAgent, setEnableDeliveryAgent] = useState(false)

  const classes = useStyles()

  const handleConsumerMobileChange = e => {
    if (!isNaN(e.target.value)) {
      setConsumerMobile(e.target.value)
    }

    if (e.target.value.trim().length === 10 && !isNaN(e.target.value)) {
      setEnableConsumer(true)
    }
  }

  const handleConsumerIDChange = e => {
    if (!isNaN(e.target.value)) {
      setConsumerID(e.target.value)
    }

    if (e.target.value.trim().length > 0 && !isNaN(e.target.value)) {
      setEnableConsumer(true)
    }
  }

  const handleOrderIdChange = e => {
    if (!isNaN(e.target.value)) {
      setOrderID(e.target.value)
    }

    if (e.target.value.trim().length === 4 && !isNaN(e.target.value)) {
      setEnableConsumer(true)
    }
  }

  const handleRetailerMobileChange = e => {
    if (!isNaN(e.target.value)) {
      setRetailerMobile(e.target.value)
    }

    if (e.target.value.trim().length === 10 && !isNaN(e.target.value)) {
      setEnabledRetailer(true)
    }
  }

  const handleRetailerIdChange = e => {
    if (!isNaN(e.target.value)) {
      setRetailerID(e.target.value)
    }

    if (e.target.value.trim().length > 0 && isNaN(e.target.value)) {
      setEnabledRetailer(true)
    }
  }

  const handleStoreCode = e => {
    if (!isNaN(e.target.value)) {
      setStoreCode(e.target.value)
    }

    if (e.target.value.trim().length === 4 && !isNaN(e.target.value)) {
      setEnabledRetailer(true)
    }
  }

  const handleDeliveryAgentChange = e => {
    if (!isNaN(e.target.value)) {
      setDeliveryAgentMobile(e.target.value)
    }

    if (e.target.value.trim().length === 10 && !isNaN(e.target.value)) {
      setEnableDeliveryAgent(true)
    }
  }

  const handleDeliveryAgentIdChange = e => {
    if (!isNaN(e.target.value)) {
      setDeliveryAgentID(e.target.value)
    }

    if (e.target.value.trim().length === 4 && !isNaN(e.target.value)) {
      setEnableDeliveryAgent(true)
    }
  }

  const handeReset = (e) => {
    e.preventDefault()
    setConsumerMobile("")
    setConsumerID("")
    setOrderID("")
  }

  const handleRetailerReset = (e) => {
    e.preventDefault()
    setRetailerMobile("")
    setRetailerID("")
  }

  const handleDeliveryAgentReset = (e) => {
    e.preventDefault()
    setDeliveryAgentID("")
    setDeliveryAgentMobile("")
  }

  const fetchConsumerDetails = () => {
    console.log("fetch consumer")
    const payload = {
      consumer_contact_number: consumerMobile,
      consumer_id: consumerID,
      order_id: orderID,
      filter_by: "consumer_details"
    }
    props.history.push(`/home/order-list`, payload)
  }

  const fetchDeliveryAgentDetails = () => {
    const payload = {
      delivery_agent_contact_number: deliveryAgentMobile,
      delivery_agent_id: deliveryAgentID,
      filter_by: "delivery_agent_details"
    }
    props.history.push(`/home/order-list`, payload)
  }

  const fetchRetailerDetails = () => {
    const payload = {
      retailer_contact_number: retailerMobile,
      retailer_id: retailerID,
      retailer_code: storeCode,
      filter_by: "retailer_details"
    }
    props.history.push(`/home/order-list`, payload)
  }

  // const handleOnClick = (e) => {
  //   location.href = "/home/order-list"
  // }

  return (
    <div id="dashboard">
      <form name="consumerDetails">
        <div className="dashboard-detail">
          <h4>CUSTOMER DETAILS</h4>
          <div className="text-field">
            <FormGroup inline>
              <label>Consumer Mobile</label>
              <Input
                type="text"
                name="consumerMobile"
                placeholder="Enter valid 10 digit mobile number"
                value={consumerMobile}
                autoComplete="off"
                required
                maxLength={10}
                onChange={handleConsumerMobileChange}
              />
            </FormGroup>
            <FormGroup inline>
              <label>Consumer ID</label>
              <Input
                type="text"
                name="consumerID"
                placeholder="Enter a valid ID"
                value={consumerID}
                autoComplete="off"
                required
                maxLength={6}
                onChange={handleConsumerIDChange}
              />
            </FormGroup>
            <FormGroup inline>
              <label>Order ID</label>
              <Input
                type="text"
                name="orderID"
                placeholder="Enter a valid ID"
                value={orderID}
                autoComplete="off"
                required
                maxLength={6}
                onChange={handleOrderIdChange}
              />
            </FormGroup>
            <div className={classes.root}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={!enableConsumer}
                onClick={fetchConsumerDetails}
              >
                Fetch Details
                </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={!enableConsumer}
                onClick={handeReset}
              >
                Reset
                </Button>
            </div>
          </div>
        </div>
      </form>
      <form>
        <div className="dashboard-detail">
          <h4>RETAILER DETAILS</h4>
          <div className="text-field">
            <FormGroup inline>
              <label>Retailer Mobile</label>
              <Input
                type="text"
                name="retailerMobile"
                placeholder="Enter valid 10 digit mobile number"
                value={retailerMobile}
                autoComplete="off"
                required
                maxLength={10}
                onChange={handleRetailerMobileChange}
              />
            </FormGroup>
            <FormGroup inline>
              <label>Retailer ID</label>
              <Input
                type="text"
                name="retailerID"
                placeholder="Enter a valid ID"
                value={retailerID}
                autoComplete="off"
                required
                maxLength={6}
                onChange={handleRetailerIdChange}
              />
            </FormGroup>
            <FormGroup inline>
              <label>Store Code</label>
              <Input
                type="text"
                name="storeCode"
                placeholder="Enter a valid code"
                value={storeCode}
                autoComplete="off"
                required
                maxLength={6}
                onChange={handleStoreCode}
              />
            </FormGroup>
            <div className={classes.root}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={!enableRetailer}
                onClick={fetchRetailerDetails}
              >
                Fetch Details
                </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={!enableRetailer}
                onClick={handleRetailerReset}
              >
                Reset
                </Button>
            </div>
          </div>
        </div>
      </form>
      <form>
        <div className="dashboard-detail">
          <h4>DELIVERY AGENT DETAILS</h4>
          <div className="text-field">
            <FormGroup inline>
              <label>Delivery Agent Mobile</label>
              <Input
                type="text"
                name="deliveryAgentMobile"
                placeholder="Enter valid 10 digit mobile number"
                value={deliveryAgentMobile}
                autoComplete="off"
                required
                maxLength={10}
                onChange={handleDeliveryAgentChange}
              />
            </FormGroup>
            <FormGroup inline>
              <label>Delivery Agent ID</label>
              <Input
                type="text"
                name="delivertAgentID"
                placeholder="Enter a valid ID"
                value={deliveryAgentID}
                autoComplete="off"
                required
                maxLength={6}
                onChange={handleDeliveryAgentIdChange}
              />
            </FormGroup>
            <div className={classes.root}>
              <Button
                className={classes.button}
                variant="contained"
                disabled={!enableDeliveryAgent}
                color="secondary"
                onClick={fetchDeliveryAgentDetails}
              >
                Fetch Details
                </Button>
              <Button
                variant="contained"
                disabled={!enableDeliveryAgent}
                color="secondary"
                onClick={handleDeliveryAgentReset}
              >
                Reset
                </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Dashboard