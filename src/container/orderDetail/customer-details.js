import React, { useState } from 'react'
import Dialog from "Components/dialog/index"
import "./order-detail.scss"
import Button from "@material-ui/core/Button"
import Select from '@material-ui/core/Select'
import { makeStyles } from "@material-ui/core/styles"
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

function CustomerDetails({ customerId, customerName, customerMobileNumber, customerState, customerCity, customerAddress, customerLandmark })  {
 
  const classes = useStyles()
  const [showMountModal, setShowUnmountModal] = useState(false)

  const cancellationReasons = [
    {text: "User under legal age drinking"},
    { text: "No show of customer" },
    { text: "Wrong address" },
    { text: "Vehicle problem" },
    { text: "Other" }
  ]

  const [comments, setComments] = useState("")
  const [cancellationReason, setCancellationReason] = useState("")

  const handleCommentChange = () => {
    setComments(event.target.value)
  }

  const unmountModal = () => {
    setShowUnmountModal(false)
  }

  const mountModal = () => {
    setShowUnmountModal(true)
  }

  const handleSave = () => {
    console.log("Hello from delivery agent", comments, cancellationReason)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setCancellationReason(e.target.value)
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
          <button onClick={mountModal}>Cancel Order</button>
          {
            showMountModal && (
              <Dialog
                title="Cancel Order"
                actions={[
                  <Button color="primary" className={classes.buttonPrimary} onClick={handleSave} key={1} autoFocus>
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
                        value={cancellationReason}
                        className={classes.formControl}
                        onChange={handleChange}
                        label="Select a reason from the list"
                      >
                        {
                          cancellationReasons.map((item, index) => {
                          return <option value={item.value}>{item.text}</option>
                          })
                        }
                      </Select>
                      <label>Comments</label>
                      <TextareaAutosize 
                        className={classes.formControl} 
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
  buttonPrimary: {
    background: "#000000",
    color: "#FFFFFF"
  }
}))

export default CustomerDetails