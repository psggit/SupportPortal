import React, { useState } from 'react'
import "./order-detail.scss"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from "./../../components/dialog/index"
import Select from '@material-ui/core/Select'
import { fetchDeliveryAgentList, reserveOrders,unassignDeliveryAgent } from "./../api"
import Notification from "Components/notification"

function DeliveryAgentDetails({ orderId, deliveryAgentPickupDateAndTime, deliveryAgentId, deliveryAgentName, deliveryAgentVehicleNumber, deliveryAgentMobileNumber, orderButtonStatus, retailerId, reservedForDeliveryAgent, deliveryAgentStatus }) {

  const classes = useStyles()
  const [showMountModal, setShowMountModal] = useState(false)
  const [deliveryAgentList, setDeliveryAgentList] = useState([])
  const [deliveryAgentIdx, setDeliveryAgentIdx] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // const [showCommentMountModel, setShowUnmountCommentModel] = useState(false)

  // const [comments, setComments] = useState("")
  // const [documentId, setDocumentId] = useState("")
  // const [successMsg, setSuccessMsg] = useState("")
  // const [kycDocumentIdx, setKycDocumentIdx] = useState(0)
  // const [kycDocumentList, setKycDocumentList] = useState([])
  // const [otp, setOtp] = useState("")

  // useEffect(() => {
  //   fetchKycDetails()
  // }, []);

  const fetchDeliveryAgent = () => {
    const payload = {
      retailer_id: retailerId,
      order_id: orderId,
    }
    fetchDeliveryAgentList(payload)
      .then((response) => {
        setDeliveryAgentList(response.data)
      })
      .catch((err) => {
        console.log("Error in fetching Delivery Agent list", err)
      })
  }

  const unmountModal = () => {
    setShowMountModal(false)
  }

  const mountModal = () => {
    fetchDeliveryAgent()
    setShowMountModal(true)
  }

  const unmountConfirmModal = () => {
    setShowConfirmModal(false)
  }

  const mountConfirmModal = () => {
    setShowConfirmModal(true)
  }

  const handleConfirm = () => {
    unmountModal()
    const payload = {
      order_id: orderId,
      reserved_for_da_id: parseInt(deliveryAgentList[deliveryAgentIdx].id),
    }
    reserveOrders(payload)
      .then((response) => {
        setShowMessage(true)
        setMessage(response.message)
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
        })
      })
  }

  const handleChange = (e) => {
    setDeliveryAgentIdx(e.target.value)
  }

  const handleClose = () => {
    setShowMessage(false)
  }

  const handleUnassignDeliveryAgent = () => {
    setShowConfirmModal(false)
    const payload = {
      order_id: orderId
    }
    unassignDeliveryAgent(payload)
      .then((response) => {
        setShowMessage(true)
        setMessage(response.message)
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
        })
      })
    }

  // const fetchKycDetails = () => {
  //   fetchKycDocumentList()
  //     .then((response) => {
  //       setKycDocumentList(response)
  //     })
  //     .catch((err) => {
  //       console.log("Error in fetching kyc details", err)
  //     })
  // }

  // const handleCommentChange = (e) => {
  //   setComments(e.target.value)
  // }

  // const commentUnmountModel = () => {
  //   setShowUnmountCommentModel(false)
  // }

  // const commentMountModel = () => {
  //   setShowUnmountCommentModel(true)
  // }

  // const handleCommentSubmit = () => {
  //   commentUnmountModel()
  //   const payload = {
  //     order_id: orderId,
  //     notes: comments
  //   }
  //   submitNotes(payload)
  //     .then((response) => {
  //       setSuccessMsg("Successfully Added Notes")
  //       console.log("successfully Added Notes")
  //     })
  //     .catch((err) => {
  //       setSuccessMsg("Error in Adding Notes")
  //       console.log("Error in Adding Notes", err)
  //     })
  //   console.log("comment", comments, orderId)
  // }

  // const handleOtpChange = (e) => {
  //   setOtp(e.target.value)
  // }

  // const handleDocumentChange = (e) => {
  //   setDocumentId(e.target.value)
  // }

  // const unmountModal = () => {
  //   setShowUnmountModal(false)
  // }

  // const mountModal = () => {
  //   setShowUnmountModal(true)
  // }

  // const handleConfirm = () => {
  //   unmountModal()
  //   const payload = {
  //     order_id: orderId,
  //     otp,
  //     slot_id: "",
  //     id_proof: kycDocumentList[kycDocumentIdx].description,
  //     digits: documentId,
  //   }
  //   completeOrder(payload)
  //     .then((response) => {
  //       setSuccessMsg("Successfully completed the order")
  //       console.log("successfully completed the order")
  //     })
  //     .catch((err) => {
  //       setSuccessMsg("Error in completing the order")
  //       console.log("Error in completing order", err)
  //     })
  //   console.log("Hello from delivery agent", comments, documentId, kycDocumentList[kycDocumentIdx].description)
  // }

  // const handleChange = (e) => {
  //   console.log(e.target.value)
  //   setKycDocumentIdx(e.target.value)
  //   // setKycDocumentIdx(kycDocumentList[e.target.value].id)
  // }

  // const handleClose = () => {
  //   setSuccessMsg("")
  // }

  return (
    <div className="orders-detail-card">
      <div className="header">
        <h4>DELIVERY AGENT DETAILS</h4>
      </div>
      <div className="content">

        <div className="item">
          <p className="label">Delivery Agent ID</p>
          <p className="value">{deliveryAgentId ? deliveryAgentId : "-"}</p>
        </div>

        <div className="item">
          <p className="label">Delivery Agent Name</p>
          <p className="value">{deliveryAgentName ? deliveryAgentName : "-"}</p>
        </div>

        <div className="item">
          <p className="label">Delivery Agent Vehicle Number </p>
          <p className="value">{deliveryAgentVehicleNumber ? deliveryAgentVehicleNumber : "-"} </p>
        </div>

        <div className="item">
          <p className="label">Delivery Agent Mobile Number</p>
          <p className="value" style={{ marginBottom: '10px' }}>
            {deliveryAgentMobileNumber ? deliveryAgentMobileNumber : "-"}
          </p>
        </div>   

        <div className="item">
          <p className="label">Delivery Agent Status</p>
          <p className="value" style={{ marginBottom: '10px' }}>
            {deliveryAgentStatus ? deliveryAgentStatus : "-"}
          </p>
        </div>   

        <div className="item">
          <p className="label">Reserved For Delivery Agent</p>
          <p className="value" style={{ marginBottom: '10px' }}>
            {reservedForDeliveryAgent ? reservedForDeliveryAgent : "-"}
          </p>
        </div>   

        <div className="item">
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={mountConfirmModal}
          >
            Unassign Delivery Agent
           </Button>

          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={mountModal}
          >
            Reserve Order
           </Button>
          {
            showConfirmModal && (
              <Dialog
                title="Unassign Delivery Agent"
                subtitle="Are you sure you want to un-assign the delivery agent for this order ?"
                actions={[
                  <Button 
                    onClick={handleUnassignDeliveryAgent} 
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
            )}
          {
            showMountModal && (
              <Dialog
                title="Reserve Orders"
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
                    <label>Delivery Agent List</label>
                    <Select
                      native
                      //value={deliveryAgentIdx}
                      className={classes.formControl}
                      onChange={handleChange}
                    >
                      {
                        deliveryAgentList.map((item, index) => {
                          return <option key={index} value={index}>{item.name}  {item.id}</option>
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
{/* 
        <div className="item">
          <p className="label">Manual Completion</p>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disabled={!orderButtonStatus}
            onClick={mountModal}
          >
            Complete Order
           </Button>
          {
            showMountModal && (
              <Dialog
                title="Complete Order"
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
                    <label>Select KYC Document</label>
                    <Select
                      native
                      value={kycDocumentIdx}
                      className={classes.formControl}
                      onChange={handleChange}
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
                      onChange={handleOtpChange}
                      //placeholder="Enter last four digits of document"
                      className={classes.formControl}
                      label="OTP"
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

export default DeliveryAgentDetails