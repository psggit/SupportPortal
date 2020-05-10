import React, { useState, useEffect } from 'react'
import Dialog from "Components/dialog/index"
import "./order-detail.scss"
import Button from "@material-ui/core/Button"
import Select from '@material-ui/core/Select'
import { makeStyles } from "@material-ui/core/styles"
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField';
import { fetchKycDocumentList, completeOrder } from '../api'
import Notification from "Components/notification"

function DeliveryAgentDetails({ orderId, deliveryAgentPickupDateAndTime, deliveryAgentId, deliveryAgentName, deliveryAgentVehicleNumber, deliveryAgentMobileNumber }) {

  const classes = useStyles()
  const [showMountModal, setShowUnmountModal] = useState(false)

  const [comments, setComments] = useState("")
  const [documentId, setDocumentId] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [kycDocumentIdx, setKycDocumentIdx] = useState(0)
  const [kycDocumentList, setKycDocumentList] = useState([])
  const [otp, setOtp] = useState("")

  useEffect(() => {
    fetchKycDetails()
  }, []);

  const fetchKycDetails = () => {
    fetchKycDocumentList()
      .then((response) => {
        setKycDocumentList(response)
      })
      .catch((err) => {
        console.log("Error in fetching kyc details", err)
      })
  }

  const handleCommentChange = (e) => {
    setComments(e.target.value)
  }

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
  }

  const handleDocumentChange = (e) => {
    setDocumentId(e.target.value)
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
      otp,
      slot_id: "",
      id_proof: kycDocumentList[kycDocumentIdx].description,
      digits: documentId,
      comments
    }
    completeOrder(payload)
      .then((response) => {
        setSuccessMsg("Successfully completed the order")
        console.log("successfully completed the order")
      })
      .catch((err) => {
        setSuccessMsg("Error in completing the order")
        console.log("Error in completing order", err)
      })
    console.log("Hello from delivery agent", comments, documentId, kycDocumentList[kycDocumentIdx].description)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setKycDocumentIdx(e.target.value)
    // setKycDocumentIdx(kycDocumentList[e.target.value].id)
  }

  const handleClose = () => {
    setSuccessMsg("")
  }

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
          <p className="label">Manual Completion</p>
          <button onClick={mountModal}>Complete Order</button>
          {
            showMountModal && (
              <Dialog
                title="Complete Order"
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

                    <label style={{ marginTop: "24px" }}>Comments</label>
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
  },
  formInput: {
    width: "100%"
  }
}))

export default DeliveryAgentDetails