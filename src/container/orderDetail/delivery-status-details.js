import React, { useState, useEffect } from 'react'
import Dialog from "./../../components/dialog/index"
import "./order-detail.scss"
import Button from "@material-ui/core/Button"
import Select from '@material-ui/core/Select'
import { makeStyles } from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { fetchCancellationReasons, cancelOrder, submitNotes, fetchKycDocumentList, completeOrder, fetchNotes } from "./../api"
import Notification from "Components/notification"
import Moment from "moment"

function DeliveryStatusDetails({ orderId, deliveryStatus, deliveryDateAndTime, deliveryPickupTime, deliveryIdVerification, orderButtonStatus, cancelledBy, showNotes, cancellationReason, orderCancellationDateAndTime, lotID }) {
  const classes = useStyles()
  const [showMountModal, setShowUnmountModal] = useState(false)
  const [showCommentMountModal, setCompleteShowUnmountModal] = useState(false)
  const [showCommentMountModel, setShowUnmountCommentModel] = useState(false)
  const [showViewCommentModel, setShowViewCommentModel] = useState(false)

  const [comments, setComments] = useState("")
  const [documentId, setDocumentId] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [kycDocumentIdx, setKycDocumentIdx] = useState(0)
  const [kycDocumentList, setKycDocumentList] = useState([])
  // const [otp, setOtp] = useState("")
  const [cancellationReasonIdx, setCancellationReasonIdx] = useState(0)
  const [cancellationReasonList, setCancellationReasonList] = useState([])
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([""]
  const [yob,setYob] = useState(0)

  const [viewComment, setViewComment] = useState([])
  useEffect(() => {
    // fetchCancellationReasonList()
    // fetchKycDetails()
  }, []);

  const fetchCancellationReasonList = () => {
    const payload = {
      order_id: orderId,
    }
    fetchCancellationReasons(payload)
      .then((response) => {
        console.log("response", response)
        setCancellationReasonList(response)
      })
      .catch((err) => {
        console.log("Error in fetching cancellation reasons", err)
      })
  }

  const fetchKycDetails = () => {
    fetchKycDocumentList()
      .then((response) => {
        setKycDocumentList(response)
      })
      .catch((error) => {
        error.json().then((json) => {
          setError(true)
          setErrorMessage(json.message)
        })
      })
  }


  const completeUnmountModal = () => {
    setCompleteShowUnmountModal(false)
  }

  const completeMountModal = () => {
    fetchKycDetails()
    setCompleteShowUnmountModal(true)
  }

  // const handleOtpChange = (e) => {
  //   setOtp(e.target.value)
  // }

  const handleDocumentChange = (e) => {
    setDocumentId(e.target.value)
  }

  const handleKycChange = (e) => {
    console.log(e.target.value)
    setKycDocumentIdx(e.target.value)
    // setKycDocumentIdx(kycDocumentList[e.target.value].id)
  }

  const handleCompleteOrderSubmit = () => {
    unmountModal()
    const payload = {
      order_id: orderId,
      // otp,
      slot_id: "",
      id_proof: kycDocumentList[kycDocumentIdx].description,
      digits: documentId,
      year_of_birth:parseInt(yob)
    }
    completeOrder(payload)
      .then((response) => {
        setSuccessMsg("Successfully completed the order")
        location.reload()
        console.log("successfully completed the order")
      })
      .catch((error) => {
        error.json().then((json) => {
          setError(true)
          setErrorMessage(json.message)
        })
      })
    console.log("Hello from delivery agent", comments, documentId, kycDocumentList[kycDocumentIdx].description)
  }

  const handleYobChange = (e) => {
    setYob(e.target.value)
  }

  const viewCommentMountModal = () => {
    setShowViewCommentModel(true)
    const payload = {
      order_id: orderId,
    }
    fetchNotes(payload)
      .then((response) => {
        console.log("maap", response.orderNotes.map((item) => item.notes))
        setViewComment(response.orderNotes)
      })
      .catch((error) => {
        error.json().then((json) => {
          setError(true)
          setErrorMessage(json.message)
        })
      })
  }

  const viewCommentUnmountModel = () => {
    setShowViewCommentModel(false)
  }

  const handleCommentChange = (e) => {
    setComments(e.target.value)
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
      .catch((error) => {
        error.json().then((json) => {
          setError(true)
          setErrorMessage(json.message)
        })
      })
    console.log("comment", comments, orderId)
  }

  const unmountModal = () => {
    setShowUnmountModal(false)
  }

  const mountModal = () => {
    fetchCancellationReasonList()
    console.log("from mountModal", orderButtonStatus)
    setShowUnmountModal(true)
  }

  const handleConfirm = () => {
    unmountModal()
    const payload = {
      order_id: orderId,
      slot_id: lotID ? lotID.toString() : "",
      reason_id: parseInt(cancellationReasonList[cancellationReasonIdx].id),
    }
    cancelOrder(payload)
      .then((response) => {
        setSuccessMsg("Successfully cancelled the order")
        location.reload()
        console.log("successfully cancelled the order")
      })
      .catch((error) => {
        error.json().then((json) => {
          setError(true)
          setErrorMessage(json.message)
        })
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
        <h4>DELIVERY STATUS DETAILS</h4>
      </div>
      <div className="content">
        <div className="item">
          <p className="label">Order Status</p>
          <p className="value">{deliveryStatus ? deliveryStatus : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Pickup Date &amp; Time</p>
          <p className="value">{deliveryPickupTime ? Moment(deliveryPickupTime).format("DD-MM-YYYY | hh:mm A") : "-"}</p>

        </div>

        <div className="item">
          <p className="label">Delivered Date &amp; Time</p>
          {/* <p className="value">{deliveryDateAndTime ? deliveryDateAndTime : '-'}</p> */}
          <p className="value">{deliveryDateAndTime ? Moment(deliveryDateAndTime).format("DD-MM-YYYY | hh:mm A") : "-"}</p>

        </div>

        <div className="item">
          <p className="label">ID Verification</p>
          <p className="value">{deliveryIdVerification ? deliveryIdVerification : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Cancelled By</p>
          <p className="value">{cancelledBy ? cancelledBy : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Order Cancellation Date and Time</p>
          <p className="value">{orderCancellationDateAndTime ? Moment(orderCancellationDateAndTime).format("DD-MM-YYYY | hh:mm A") : "-"}</p>
        </div>

        <div className="item">
          <p className="label">Cancellation Reason</p>
          <p className="value">{cancellationReason ? cancellationReason : '-'}</p>
        </div>

        <div className="item">
          <p className="label">Manual Completion</p>
          {/* <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disabled={!orderButtonStatus}
            onClick={completeMountModal}
          >
            View Comments
           </Button> */}
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disabled={!orderButtonStatus}
            onClick={completeMountModal}
          >
            Complete Order
           </Button>
          {
            showCommentMountModal && (
              <Dialog
                title="Complete Order"
                actions={[
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handleCompleteOrderSubmit}
                  >
                    Confirm
                  </Button>,
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={completeUnmountModal}
                  >
                    Close
                    </Button>,
                ]}
              >
                <form>
                  <div className={classes.formRoot}>
                    <label>Select KYC Document</label>
                    <Select
                      native
                      value={kycDocumentIdx}
                      className={classes.formControl}
                      onChange={handleKycChange}
                      label="Select a KYC Document from the list"
                    >
                      {
                        kycDocumentList.map((item, index) => {
                          return <option key={index} value={index}>{item.description}</option>
                        })
                      }
                    </Select>

                    <TextField id="standard-basic"
                      onChange={handleDocumentChange}
                      placeholder="Enter last four digits of document"
                      className={classes.formControl}
                      label="Document ID"
                    />

                    <TextField id="standard-basic"
                      onChange={handleYobChange}
                      type="number"
                      placeholder="Enter Year Of Birth "
                      className={classes.formControl}
                      label="Year Of Birth"
                    />

                  </div>
                </form>
              </Dialog>
            )
          }

        </div>

        <div className="item">
          <p className="label">Manual Cancellation</p>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            //disabled={!orderButtonStatus}
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
                    </Button>,
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
            disabled={!showNotes}
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
                    Cancel
                    </Button>
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

          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={viewCommentMountModal}
            disabled={!showNotes}
          >
            View Comment
           </Button>
          {
            showViewCommentModel && (
              <Dialog
                title="Comment"
                actions={[
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={viewCommentUnmountModel}
                  >
                    Close
                    </Button>
                ]}
              >
                <form>
                  <div className={classes.formRoot} style={{ fontSize: "18px", lineHeight: "40px" }}>
                    {
                      viewComment.map((item, index) => {
                        return <option key={index} value={index}>{item.notes}</option>
                      })
                    }
                  </div>
                </form>
              </Dialog>
            )
          }

        </div>
      </div>
      {
        isError &&
        <Notification
          message={errorMessage}
          messageType="error"
          open={isError}
          handleClose={handleClose}
        />
      }
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
  },
  textField: {
    width:"100%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    marginLeft: "10px",
    cursor: "pointer",
    marginTop: "10px"
  }
}))

export default DeliveryStatusDetails