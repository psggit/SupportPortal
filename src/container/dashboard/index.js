import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import "./dashboard.scss"
import Input from "./../../components/input"
import Button from '@material-ui/core/Button';
import { FormGroup } from "./../../components/Form"
import { fetchPreponeOrderDelivery } from "./../api"
import Notification from "Components/notification"
import Select from '@material-ui/core/Select'
import Dialog from "Components/dialog"
import { fetchDeliveryOrderStatus } from "./../api"


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      textDecorationLine: "none"
    },
  },
  button: {
    marginLeft: "140px",
  },
    buttonPrimary: {
    background: "#000000",
    color: "#FFFFFF",
    '&:hover': {
      background: "#000000"
    }
  },
  formControl: {
    width: "270px",
    marginBottom: 24
  },
}))

function Dashboard(props) {

  const [consumerMobile, setConsumerMobile] = useState("")
  const [consumerID, setConsumerID] = useState("")
  const [orderID, setOrderID] = useState("")
  const [preponeOrderID, setPreponeOrderId] = useState("")
  const [retailerMobile, setRetailerMobile] = useState("")
  const [retailerID, setRetailerID] = useState("")
  const [storeCode, setStoreCode] = useState("")
  const [deliveryAgentMobile, setDeliveryAgentMobile] = useState("")
  const [deliveryAgentID, setDeliveryAgentID] = useState("")
  const [enableConsumer, setEnableConsumer] = useState(false)
  const [enableRetailer, setEnabledRetailer] = useState(false)
  const [enableDeliveryAgent, setEnableDeliveryAgent] = useState(false)
  const [enablePreponeOrder, setEnablePreponeOrder] = useState(false)
  //const [isError, setError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  //const [errorMessage, setErrorMessage] = useState([""])
  const [message,setMessage] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [orderStatusList,setOrderStatusList] = useState([])
  const [orderStatusName, setOrderStatusName] = useState(0)

  const classes = useStyles()

  useEffect(() => {
    fetchDeliveryOrderStatusList()
  }, []);

  const fetchDeliveryOrderStatusList = () => {
    fetchDeliveryOrderStatus()
      .then((response) => {
        console.log("response", response.message)
        setOrderStatusList(response.message)
      })
      .catch((err) => {
        console.log("Error in fetching delivery order status", err)
      })
  }

  const handleConsumerMobileChange = e => {
      //console.log("role", localStorage.getItem("x-hasura-role"))
      if (!isNaN(e.target.value)) {
        setConsumerMobile(e.target.value)
        setEnableConsumer(false)
      }
      // if (localStorage.getItem("x-hasura-role") === 'delivery_manager') {
      //   setEnableConsumer(false)
      // } else if (e.target.value.trim().length === 10 && !isNaN(e.target.value)) {
      //   setEnableConsumer(true)
      // }

      if (e.target.value.trim().length === 10 && !isNaN(e.target.value)) {
        setEnableConsumer(true)
      }
    }


  const unmountConfirmModal = () => {
    setShowConfirmModal(false)
  }

  const mountConfirmModal = () => {
    setShowConfirmModal(true)
  }

  const handleConsumerIDChange = e => {
    if (!isNaN(e.target.value)) {
      setConsumerID(e.target.value)
      setEnableConsumer(false)
    }

    if (e.target.value.trim().length > 0 && !isNaN(e.target.value)) {
      setEnableConsumer(true)
    }
  }

  const handleOrderIdChange = e => {
    if (!isNaN(e.target.value)) {
      setOrderID(e.target.value)
      setEnableConsumer(false)
    }

    if (e.target.value.trim().length > 3 && !isNaN(e.target.value)) {
      setEnableConsumer(true)
    }
  }

  const handleRetailerMobileChange = e => {
    if (!isNaN(e.target.value)) {
      setRetailerMobile(e.target.value)
      setEnabledRetailer(false)
    }

    if (e.target.value.trim().length === 10 && !isNaN(e.target.value)) {
      setEnabledRetailer(true)
    }
  }

  const handleRetailerIdChange = e => {
    if (!isNaN(e.target.value)) {
      setRetailerID(e.target.value)
      setEnabledRetailer(false)
    }

    if (e.target.value.trim().length > 0 && !isNaN(e.target.value)) {
      setEnabledRetailer(true)
    }
  }

  const handleStoreCode = e => {
    if (!isNaN(e.target.value)) {
      setStoreCode(e.target.value)
      setEnabledRetailer(false)
    }

    if (e.target.value.trim().length > 0 && !isNaN(e.target.value)) {
      setEnabledRetailer(true)
    }
  }

  const handleDeliveryAgentChange = e => {
    if (!isNaN(e.target.value)) {
      setDeliveryAgentMobile(e.target.value)
      setEnableDeliveryAgent(false)
    }

    if (e.target.value.trim().length === 10 && !isNaN(e.target.value)) {
      setEnableDeliveryAgent(true)
    }
  }

  const handleDeliveryAgentIdChange = e => {
    if (!isNaN(e.target.value)) {
      setDeliveryAgentID(e.target.value)
      setEnableDeliveryAgent(false)
    }

    if (e.target.value.trim().length > 0 && !isNaN(e.target.value)) {
      setEnableDeliveryAgent(true)
    }
  }

  const handlePreponeOrderIdChange = e => {
    if (!isNaN(e.target.value)) {
      setPreponeOrderId(e.target.value)
      setEnablePreponeOrder(false)
    }

    if (e.target.value.trim().length > 0 && !isNaN(e.target.value)) {
      setEnablePreponeOrder(true)
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
    setStoreCode("")
  }

  const handleDeliveryAgentReset = (e) => {
    e.preventDefault()
    setDeliveryAgentID("")
    setDeliveryAgentMobile("")
  }

  const fetchConsumerDetails = () => {
    console.log("fetch consumer", consumerMobile)
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

  const fetchOrderStatusDetail = () => {
    const payload = {
      delivery_status: orderStatusName,
      filter_by: "order_status_detail"
    }
    props.history.push(`/home/order-list`, payload)
  }

  const handleOrderStatusChange = (e) => {
    console.log("status", e.target.value)
    setOrderStatusName(e.target.value)
  }

  const fetchOrderIdMessage = () => {
    setShowConfirmModal(false)
    //console.log("hello", preponeOrderID)
    const payload = {
      order_id: preponeOrderID,
    }
    // fetch(`https://api.hipbar-dev.com/deliveryman/api/1/support/assign-warehouse`,
    //   {
    //     method: "post",
    //     body: JSON.stringify(payload),
    //     credentials: "include",
    //     headers: {
    //       "x-hasura-role": `support_admin`
    //     }
    //   })
     fetchPreponeOrderDelivery(payload)
      .then((response) => {
        console.log("response", response.message, response)
        setShowMessage(true)
        setMessage(response.message)
      })
      .catch((error) => {
        console.log("Error in fetching prepone order delivery", error)
        error.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
        })
      })
  }

  const handleClose = () => {
    setShowMessage(false)
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
                //maxLength={4}
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
                //maxLength={4}
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
                //maxLength={4}
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
                //maxLength={4}
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
                //maxLength={4}
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

      <form>
        <div className="dashboard-detail">
          <h4>PREPONE ORDER DELIVERY</h4>
          <div className="text-field">
            <FormGroup inline>
              <label>Order ID</label>
              <Input
                type="text"
                name="preponeOrderID"
                placeholder="Enter a valid ID"
                value={preponeOrderID}
                autoComplete="off"
                required
                //maxLength={4}
                onChange={handlePreponeOrderIdChange}
              />
            </FormGroup>
            <div className={classes.root}>
              <Button
                className={classes.button}
                variant="contained"
                disabled={!enablePreponeOrder}
                color="secondary"
                onClick={mountConfirmModal}
              >
                Submit
              </Button>
              {
                showConfirmModal && (
                  <Dialog
                    title="Prepone  Order"
                    subtitle="Are you sure you want to prepone this order ?"
                    actions={[
                      <Button onClick={fetchOrderIdMessage} className={classes.buttonPrimary} color="primary" key={1} autoFocus>
                        Yes
                      </Button>,
                      <Button onClick={unmountConfirmModal} className={classes.buttonPrimary} key={2} color="primary">
                        No
                      </Button>
                    ]}
                  />
                )}
              {
                showMessage &&
                <Notification
                  message={message}
                  messageType="info"
                  open={showMessage}
                  handleClose={handleClose}
                />
              }
            </div>
          </div>
        </div>
      </form>
      <form>
        <div className="dashboard-detail">
          <h4>Delivery Order Status</h4>
          <div className="text-field">
            <FormGroup inline>
              <label>Order Status</label>
              <Select
                native
                 name="orderStatusName"
                 value={orderStatusName}
                 className={classes.formControl}
                 onChange={handleOrderStatusChange}
              >
                {
                  orderStatusList.map((item, index) => {
                    return <option key={index} value={item.Status}>{item.Status}</option>
                  })
                }
              </Select>
            </FormGroup>
            <div className={classes.root}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={fetchOrderStatusDetail}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Dashboard