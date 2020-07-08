import React, { useState, useEffect } from 'react'
import "./order-detail.scss"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from "./../../components/dialog/index"
import Select from '@material-ui/core/Select'
import { fetchRetailerList, reassignRetailer } from "./../api"
import Notification from "Components/notification"

function RetailerDetails({ orderId, retailerId, retailerStoreCode, retailerName, retailerMobileNumber, retailerAddress, retailerLandmark}) {

  const classes = useStyles()
  const [showMountModal, setShowUnmountModal] = useState(false)
  const [retailerList, setRetailerList] = useState([])
  const [retailerIdx, setRetailerIdx] = useState(0)
  const [retailerNameIdx, setRetailerNameIdx] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")

  const fetchRetailer = () => {
    const payload = {
      retailer_id: retailerId
    }
    fetchRetailerList(payload)
    .then((response) => {
      console.log("response", response.data )
      setRetailerList(response.data)
    })
    .catch((err) => {
      console.log("Error in fetching retailer list", err)
    })
  }

  const unmountModal = () => {
    setShowUnmountModal(false)
  }

  const mountModal = () => {
    fetchRetailer()
    setShowUnmountModal(true)
  }


  const handleConfirm = () => {
    unmountModal()
    const payload = {
      order_id: orderId,
      retailer_name: retailerList[retailerNameIdx].retailer_name,
      retailer_id: parseInt(retailerList[retailerIdx].retailer_id)
    }
    reassignRetailer(payload)
      .then((response) => {
        console.log("successfully reassigned retailer")
        setShowMessage(true)
        setMessage(response.message)
      })
      .catch((err) => {
        console.log("Error in reassigning retailer", err)
        err.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
        })
      })
  }

  const handleChange = (e) => {
    setRetailerIdx(e.target.value)
    setRetailerNameIdx(e.target.value)
  }

  // const handleClose = () => {
  //   setSuccessMsg("")
  // }

  const handleClose = () => {
    setShowMessage(false)
  }

  return (
    <div className="orders-detail-card">
      <div className="header">
        <h4>RETAILER DETAILS</h4>
      </div>
      <div className='content'>
        <div className="item">
          <p className="label">Retailer ID</p>
          <p className="value">{retailerId ? retailerId : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Store Code</p>
          <p className="value">{retailerStoreCode ? retailerStoreCode : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Retailer Name</p>
          <p className="value">{retailerName ? retailerName : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Retailer Phone Number</p>
          <p className="value">{retailerMobileNumber ? retailerMobileNumber : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Retailer Address</p>
          <p className="value">
            {retailerAddress ? retailerAddress : '-'}
          </p>
        </div>

        {/* <div className="item">
          <p className="label">Retailer Landmark</p>
          <p className="value">
            {retailerLandmark ? retailerLandmark : '-'}
          </p>
        </div> */}

        <div className="item">
          {/* <p className="label">Manual Cancellation</p> */}
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={mountModal}
          >
            Reassign Retailer
           </Button>
          {
            showMountModal && (
              <Dialog
                title="Reassign Retailer"
                actions={[
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </Button>,
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={unmountModal}
                  >
                    Close
                  </Button>,
                ]}
              >
                <form>
                  <div className={classes.formRoot}>
                    <label>Retailer List</label>
                    <Select
                      native
                      //value={retailerIdx}
                      className={classes.formControl}
                      onChange={handleChange}
                    >
                      {
                        retailerList.map((item, index) => {
                        return <option key={index} value={index}>{item.retailer_name} - {item.retailer_id}</option>
                        })
                      }
                    </Select>
                  </div>
                </form>
              </Dialog>
            )
          }
        </div>
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
  )
}

const useStyles = makeStyles(theme => ({
  formRoot: {
    padding: 36
  },
  formControl: {
    width: "100%",
    marginBottom: 24
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10
  },
  buttonPrimary: {
    background: "#000000",
    color: "#FFFFFF"
  },
  button: {
    marginLeft: "10px",
    cursor: "pointer",
    marginTop: "10px"
  }
}))

export default RetailerDetails