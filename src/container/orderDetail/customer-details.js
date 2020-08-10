import React, { useState, useEffect } from 'react'
import Dialog from "Components/dialog/index"
import "./order-detail.scss"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import { resolveIssue } from "./../api"
// import Select from '@material-ui/core/Select'
// import TextareaAutosize from '@material-ui/core/TextareaAutosize'
// import { fetchCancellationReasons, cancelOrder , submitNotes } from "./../api"
 import Notification from "Components/notification"

function CustomerDetails({ orderId, customerId, customerName, customerMobileNumber, customerState, customerCity, customerAddress, customerLandmark, orderButtonStatus, showResolveButton, consumerUPI}) {

  const classes = useStyles()

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")

  const handleClose = () => {
    setShowMessage(false)
  }

  const handleResolveIssues = () => {
    setShowConfirmModal(false)
    const payload = {
      order_id: orderId
    }
    resolveIssue(payload) 
      .then((response) => {
        setShowMessage(true)
        setMessage(response.message)
        setTimeout(() => {
          location.reload()
        }, 300)
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
        })
      })
  } 

  const unmountConfirmModal = () => {
    setShowConfirmModal(false)
  }

  const mountConfirmModal = () => {
    setShowConfirmModal(true)
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

        {/* <div className="item multiple-items">
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
        </div> */}

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

        <div>
          <div className="item">
            <p className="label"> Consumer UPI</p>
          </div>
          <table>
            <thead style={{border: "1px solid red"}}>
              <th>Name</th>
              <th>UPI</th>
              <th>Status</th>
            </thead>
         <tbody>
          {
            consumerUPI && consumerUPI.map((item, index) => {
              return <tr key={index} style={{marginBottom: '16px'}}>
                <td>{item.name}</td>
                <td>{item.upi_id}</td>
                <td>{item.is_active ? "Yes" : "No"}</td>
              </tr>
            })
          }
            </tbody>
          </table>
        </div>
        {
          showResolveButton &&
          <div className="item">
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={mountConfirmModal}
            >
              Resolve Issue
            </Button>
          </div>
        }
        {
          showConfirmModal &&
          (
            <Dialog
              title="Resolve Issue"
              subtitle="Are you sure you want to resolve this issue ?"
              actions={[
                <Button
                  onClick={handleResolveIssues}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  Yes
                </Button>,
                <Button
                  onClick={unmountConfirmModal}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  No
                </Button>
              ]}
            />
          )
        }
        

        {/* Modal box not required asf now */}

          {/* <div className="item">
            <p className="label">Manual Cancellation</p>
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
                    </div>
                  </form>
                </Dialog>
              )
            }
         <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={commentMountModel}
          >
            Comment
           </Button>
            {
              showCommentMountModel && (
                <Dialog
                  title="Comment"
                  actions={[
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      onClick={handleCommentSubmit}
                    >
                      Confirm
                    </Button>,
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
          </div> */}

      </div>
      {/* {
        successMsg.trim().length > 0 && 
        <Notification
          message={successMsg}
          messageType={successMsg.includes("Success") ? "success" : "error"}
          open={successMsg.trim().length > 0}
          handleClose={handleClose}
        />
      } */}
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