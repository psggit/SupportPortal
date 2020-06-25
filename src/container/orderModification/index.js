import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import "./../dashboard/dashboard.scss"
import Input from "Components/input"
import Button from '@material-ui/core/Button'
import { FormGroup } from "Components/Form"
import { fetchDissolveLot } from "./../api"
import Notification from "Components/notification"
import Dialog from "Components/dialog"

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
}))

function orderModification(props) {
  // const [preponeOrderID, setPreponeOrderId] = useState("")
  const [deliveryAgentID, setDeliveryAgentID] = useState("")
  const [lotID, setLotID] = useState("")
  const [enableSubmit, setEnableSubmit] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const classes = useStyles()

  const handleDeliveryAgentIdChange = e => {
    if (!isNaN(e.target.value)) {
      setDeliveryAgentID(e.target.value)
      setEnableSubmit(false)
    }
    if (e.target.value.trim().length > 0 && lotID.length > 0 && !isNaN(e.target.value)) {
      setEnableSubmit(true)
    }
  }

  const unmountModal = () => {
    setShowConfirmModal(false)
  }

  const mountModal = () => {
    setShowConfirmModal(true)
  }

  const handleLotIDChange = e => {
    if (!isNaN(e.target.value)) {
      setLotID(e.target.value)
      setEnableSubmit(false)
    }

    if (e.target.value.trim().length > 0 && deliveryAgentID.length > 0 && !isNaN(e.target.value)) {
      setEnableSubmit(true)
    }
  }

  const handleFetchDissolveLot = () => {
    setShowConfirmModal(false)
    const payload = {
      delivery_agent_id: deliveryAgentID,
      lot_id: lotID
    }
    fetchDissolveLot(payload)
      .then((response) => {
        console.log("response", response.message, response)
        setShowMessage(true)
        setMessage(response.message)
        setDeliveryAgentID("")
        setLotID("")
      })
      .catch((error) => {
        console.log("Error in fetching dissolve slot", error)
        error.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
        })
      })
  }

  const handleClose = () => {
    setShowMessage(false)
  }

  return (
    <div id="dashboard">
      <form>
        <div className="dashboard-detail">
          <h4>Dissolving Lot</h4>
          <div className="text-field">
            <FormGroup inline>
              <label>Delivery Agent ID</label>
              <Input
                type="text"
                name="deliveryAgentID"
                placeholder="Enter a valid ID"
                value={deliveryAgentID}
                autoComplete="off"
                required
                onChange={handleDeliveryAgentIdChange}
              />
            </FormGroup>
            <FormGroup inline>
              <label>Lot ID</label>
              <Input
                type="text"
                name="lotID"
                placeholder="Enter a valid ID"
                value={lotID}
                autoComplete="off"
                required
                //maxLength={4}
                onChange={handleLotIDChange}
              />
            </FormGroup>
            <div className={classes.root}>
              <Button
                className={classes.button}
                variant="contained"
                disabled={!enableSubmit}
                color="secondary"
                //onClick={handleFetchDissolveLot}
                onClick={mountModal}
              >
                Submit
              </Button>
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
            {
            showConfirmModal && (
              <Dialog
                title="Dissolve  Order"
                subtitle="Are you sure you want to dissolve this lot ?"
                actions={[
                  <Button onClick={handleFetchDissolveLot} className={classes.buttonPrimary} color="primary" key={1} autoFocus>
                    Yes
                  </Button>,
                  <Button onClick={unmountModal} className={classes.buttonPrimary} key={2} color="primary">
                    No
                  </Button>
                ]}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default orderModification