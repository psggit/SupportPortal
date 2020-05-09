import React, { useState, useEffect } from 'react'
import Dialog from "./../../components/dialog/index"
import "./order-detail.scss"
import Button from "@material-ui/core/Button"
import Select from '@material-ui/core/Select'
import { makeStyles } from "@material-ui/core/styles"
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { fetchCancellationReasons, cancelOrder } from "./../api"
import Notification from "Components/notification"

function RetailerDetails({ orderId, retailerId, retailerStoreCode, retailerName, retailerMobileNumber, retailerAddress, retailerLandmark }) {

  const classes = useStyles()
  const [showMountModal, setShowUnmountModal] = useState(false)

  const [comments, setComments] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [cancellationReasonIdx, setCancellationReasonIdx] = useState(0)
  const [cancellationReasonList, setCancellationReasonList] = useState([])

  useEffect(() => {
    fetchCancellationReasonList()
  }, []);

  const fetchCancellationReasonList = () => {
    fetchCancellationReasons()
      .then((response) => {
        setCancellationReasonList(response)
      })
      .catch((err) => {
        console.log("Error in fetching cancellation reasons", err)
      })
  }

  const handleCommentChange = (e) => {
    setComments(e.target.value)
  }

  const unmountModal = () => {
    setShowUnmountModal(false)
  }

  const mountModal = () => {
    setShowUnmountModal(true)
  }

  const handleConfirm = () => {
    unmountModal()
    const payload = {
      order_id: orderId,
      slot_id: "",
      reason: cancellationReasonList[cancellationReasonIdx].reason,
      reason_id: cancellationReasonList[cancellationReasonIdx].id,
      comments
    }
    cancelOrder(payload)
      .then((response) => {
        setSuccessMsg("Successfully cancelled the order")
        console.log("successfully cancelled the order")
      })
      .catch((err) => {
        setSuccessMsg("Error in completing the order")
        console.log("Error in cancelling order", err)
      })
    console.log("Hello from delivery agent", comments, cancellationReasonList[cancellationReasonIdx].reason)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setCancellationReasonIdx(e.target.value)
  }

  const handleClose = () => {
    setSuccessMsg("")
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

        <div className="item">
          <p className="label">Retailer Landmark</p>
          <p className="value">
            {retailerLandmark ? retailerLandmark : '-'}
          </p>
        </div>

        <div className="item">
          <p className="label">Manual Cancellation</p>
          <button onClick={mountModal}>Cancel Order</button>
          {
            showMountModal && (
              <Dialog
                title="Cancel Order"
                actions={[
                  <Button color="primary" className={classes.buttonPrimary} onClick={handleConfirm} key={1} autoFocus>
                    CONFIRM
                  </Button>,
                  <Button onClick={unmountModal} key={2} color="primary" className={classes.buttonPrimary}>
                    CLOSE
                  </Button>
                ]}
              >
                <form>
                  <div className={classes.formRoot}>
                    <label>Reason for Cancellation</label>
                    <Select
                      native
                      value={cancellationReasonIdx}
                      className={classes.formControl}
                      onChange={handleChange}
                      label="Select a reason from the list"
                    >
                      {
                        cancellationReasonList.map((item, index) => {
                          return <option key={index} value={index}>{item.reason}</option>
                        })
                      }
                    </Select>
                    <label>Comments</label>
                    <TextareaAutosize
                      className={classes.formControlTextarea}
                      aria-label="minimum height"
                      rowsMin={3}
                      onChange={handleCommentChange}
                      placeholder="Enter your notes"
                    />
                  </div>
                </form>
              </Dialog>
            )
          }

        </div>
      </div>
      {
        successMsg.trim().length > 0 &&
        <Notification
          message={successMsg}
          messageType={successMsg.includes("Success") ? "success" : "error"}
          open={successMsg.trim().length > 0}
          handleClose={handleClose}
        />
      }
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
  }
}))

export default RetailerDetails