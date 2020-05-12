import React, { useState, useEffect } from 'react'
import Dialog from "Components/dialog/index"
import "./order-detail.scss"
import Button from "@material-ui/core/Button"
import Select from '@material-ui/core/Select'
import { makeStyles } from "@material-ui/core/styles"
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { fetchCancellationReasons, cancelOrder , submitNotes } from "./../api"
import Notification from "Components/notification"

function CustomerDetails({ orderId, customerId, customerName, customerMobileNumber, customerState, customerCity, customerAddress, customerLandmark,orderButtonStatus}) {

  const classes = useStyles()
  const [showMountModal, setShowUnmountModal] = useState(false)
  const [showCommentMountModel, setShowUnmountCommentModel] = useState(false)

  const [comments, setComments] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [cancellationReasonIdx, setCancellationReasonIdx] = useState(0)
  const [cancellationReasonList, setCancellationReasonList] = useState([])

  useEffect(() => {
    fetchCancellationReasonList()
  }, []);

  const fetchCancellationReasonList = () => {
    const payload = {
      order_id: orderId,
    }
    fetchCancellationReasons(payload)
      .then((response) => {
        console.log("response",response)
        setCancellationReasonList(response)
      })
      .catch((err) => {
        console.log("Error in fetching cancellation reasons", err)
      })
  }

  const commentUnmountModel = () => {
    setShowUnmountCommentModel(false)
  }

  const commentMountModel = () => {
    setShowUnmountCommentModel(true)
  }

  const handleCommentSubmit = () => {
    commentUnmountModel()
    const payload = {
      order_id: orderId,
      notes: comments
    }
    submitNotes(payload)
      .then((response) => {
        setSuccessMsg("Successfully Added Notes")
        console.log("successfully Added Notes")
      })
      .catch((err) => {
        setSuccessMsg("Error in Adding Notes")
        console.log("Error in Adding Notes", err)
      })
    console.log("comment",comments,orderId)
  }

  const handleCommentChange = (e) => {
    setComments(e.target.value)
  }

  const unmountModal = () => {
    setShowUnmountModal(false)
  }

  const mountModal = () => {
    console.log("from mountModal", orderButtonStatus, !orderButtonStatus)
      setShowUnmountModal(true)   
  }

  const handleConfirm = () => {
    unmountModal()
    const payload = {
      order_id: orderId,
      slot_id: "",
      reason_id:parseInt(cancellationReasonList[cancellationReasonIdx].id),
    }
    cancelOrder(payload)
    .then((response) => {
      setSuccessMsg("Successfully cancelled the order")
      console.log("successfully cancelled the order")
    })
    .catch((err) => {
      setSuccessMsg("Error in cancelling the order")
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
        <h4>CUSTOMER DETAILS</h4>
      </div>

      <div className="content">
        <div className="item">
          <p className="label">Customer ID</p>
          <p className="value">{customerId ? customerId : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Customer Name</p>
          <p className="value">{customerName ? customerName : "-"}</p>
        </div>

        <div className="item">
          <p className="label">Customer Mobile Number</p>
          <p className="value">{customerMobileNumber ? customerMobileNumber : "-"}</p>
        </div>

        <div className="item multiple-items">
          <div>
            <p className="label">Customer State</p>
            <p className="value">
              {customerState ? customerState : "-"}
            </p>
          </div>
          <div>
            <p className="label">Customer City</p>
            <p className="value">
              {customerCity ? customerCity : "-"}
            </p>
          </div>
        </div>

        <div className="item">
          <p className="label">Customer Address</p>
          <p className="value">
            {customerAddress ? customerAddress : '-'}
          </p>
        </div>

        <div className="item">
          <p className="label">Landmark</p>
          <p className="value">
            {customerLandmark ? customerLandmark : '-'}
          </p>
        </div>
          <div className="item">
            <p className="label">Manual Cancellation</p>
            {/* <button onClick={mountModal} disabled ={!orderButtonStatus}>Cancel Order</button> */}
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disabled={!orderButtonStatus}
            onClick={mountModal}
          >
            Cancel Order
           </Button>
            {
              showMountModal && (
                <Dialog
                  title="Cancel Order"
                  actions={[
                  //   <Button color="primary" className={classes.buttonPrimary} onClick={handleConfirm} key={1} autoFocus>
                  //     CONFIRM
                  // </Button>,
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </Button>,
                  //   <Button onClick={unmountModal} key={2} color="primary" className={classes.buttonPrimary}>
                  //     CLOSE
                  // </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      onClick={unmountModal}
                    >
                      Close
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
                      {/* <label>Comments</label>
                    <TextareaAutosize
                      className={classes.formControlTextarea}
                      aria-label="minimum height"
                      rowsMin={3}
                      onChange={handleCommentChange}
                      placeholder="Enter your notes"
                    /> */}
                    </div>
                  </form>
                </Dialog>
              )
            }
          {/* <button className="comment-btn" onClick={commentMountModel}>Comment</button> */}
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disabled={!orderButtonStatus}
            onClick={commentMountModel}
          >
            Comment
           </Button>
            {
              showCommentMountModel && (
                <Dialog
                  title="Comment"
                  actions={[
                  //   <Button color="primary" className={classes.buttonPrimary} onClick={handleCommentSubmit} key={1} autoFocus>
                  //     CONFIRM
                  // </Button>,
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      onClick={handleCommentSubmit}
                    >
                      Confirm
                    </Button>,
                  //   <Button onClick={commentUnmountModel} key={2} color="primary" className={classes.buttonPrimary}>
                  //     CLOSE
                  // </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      onClick={commentUnmountModel}
                    >
                      Close
                    </Button>,
                  ]}
                >
                  <form>
                    <div className={classes.formRoot}>
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
    marginBottom: 24,
  },
  formControlTextarea: {
    padding: 10,
    width: "100%",
    marginBottom: 24,
  },
  buttonPrimary: {
    background: "#000000",
    color: "#FFFFFF"
  },
  button: {
    marginLeft: "10px",
    cursor:"pointer",
    marginTop:"10px"
  }
}))

export default CustomerDetails