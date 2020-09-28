import React, { useState } from 'react';
import './order-detail.scss';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from './../../components/dialog/index';
import Moment from 'moment';
import { restockOrder, pushOrder, cancelServiceProviderOrder, getOtpForRestockOrder } from './../api';
import Notification from 'Components/notification';

const DeliveryServiceProviderDetails = (props) => {

  const classes = useStyles();
  const {orderId,  assignedDSP, dspAcceptedTime, 
    showRestockButton, showPushOrderButton, showCancelOrderButton} = props;

  const [showRestockConfirmModal, setShowRestockConfirmModal] = useState(false);
  const [showPushOrderConfirmModal, setShowPushOrderConfirmModal] = useState(false);
  const [showCancelOrderConfirmModal, setShowCancelOrderConfirmModal] = useState(false);
  const [showGetOtpForRestockOrder, setShowGetOtpForRestockOrder] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [restockOtp, setRestockOtp] = useState("");

  const handleGetOtpRestockOrder = () => {
    setShowGetOtpForRestockOrder(false);
    const payload = {
      order_id: orderId
    };
    getOtpForRestockOrder(payload)
      .then((response) => {
        //setShowMessage(true)
        //setMessage(response.message)
        setRestockOtp(response.otp);
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true);
          setMessage(json.message);
        })
        location.reload();
      })
  }

  const handleRestockOrder = () => {
    setShowRestockConfirmModal(false)
    const payload = {
      order_id: orderId
    };
    restockOrder(payload)
      .then((response) => {
        setShowMessage(true);
        setMessage(response.message);
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true);
          setMessage(json.message);
        })
      })
      .finally(() => {
        location.reload();
      })
  }

  const handlePushOrder = () => {
    setShowPushOrderConfirmModal(false)
    const payload = {
      order_id: orderId
    };
    pushOrder(payload)
      .then((response) => {
        setShowMessage(true);
        setMessage(response.message);
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true);
          setMessage(json.message);
        })
      })
      .finally(() => {
        location.reload();
      })
  }

  const handleCancelOrder = () => {
    setShowCancelOrderConfirmModal(false)
    const payload = {
      order_id: orderId
    };
    cancelServiceProviderOrder(payload)
      .then((response) => {
        setShowMessage(true);
        setMessage(response.message);
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true);
          setMessage(json.message);
        })
      })
      .finally(() => {
        location.reload();
      })
  }

  const handleClose = () => {
    setShowMessage(false);
  }

  const mountGetOtpRestockOrder = () => {
    return (
      <Dialog
        title="Get Restock Order OTP"
        subtitle="Are you sure you want to get restock order OTP?"
        actions={[
          <Button
            onClick={handleGetOtpRestockOrder}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>,
          <Button
            onClick={() => { setShowGetOtpForRestockOrder(false) }}
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

  const mountRestockConfirmModal = () => {
    return (
      <Dialog
        title="Restock Order"
        subtitle="Are you sure you want to restock this order?"
        actions={[
          <Button
            onClick={handleRestockOrder}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>,
          <Button
            onClick={() => {setShowRestockConfirmModal(false)}}
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

  const mountPushOrderConfirmModal = () => {
    return (
      <Dialog
        title="Push Order"
        subtitle="Are you sure you want to push this order?"
        actions={[
          <Button
            onClick={handlePushOrder}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>,
          <Button
            onClick={() => { setShowPushOrderConfirmModal(false) }}
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

  const mountCancelOrderConfirmModal = () => {
    return (
      <Dialog
        title="Cancel Order"
        subtitle="Are you sure you want to cancel this order?"
        actions={[
          <Button
            onClick={handleCancelOrder}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>,
          <Button
            onClick={() => { setShowCancelOrderConfirmModal(false) }}
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

  return (
    <div className="orders-detail-card">
      <div className="header">
        <h4>DELIVERY SERVICE PROVIDER DETAILS</h4>
      </div>
      <div className="content">
        <div className="item">
          <p className="label">Assigned Delivery Service Provider</p>
          <p className="value">{assignedDSP ? assignedDSP : "-"}</p>
        </div>

        <div className="item">
          <p className="label">Delivery Service Provider Accepted Time</p>
          <p className="value">{dspAcceptedTime ? Moment(dspAcceptedTime).format("DD/MM/YYYY h:mm A") : "-"}</p>
        </div>

        <div className="item">
          {
            showRestockButton &&
            <React.Fragment>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => { setShowGetOtpForRestockOrder(true) }} 
              >
                Get OTP for Restock Order
              </Button>

              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => { setShowRestockConfirmModal(true) }}
              >
                Restock Order
              </Button>
            </React.Fragment>
          }
          {
            showPushOrderButton &&
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => { setShowPushOrderConfirmModal(true) }}
            >
              Push Order
            </Button>
          }
          {
            showCancelOrderButton &&
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => { setShowCancelOrderConfirmModal(true) }}
            >
              Cancel Order
            </Button>
          }
        </div>
      </div>
      {
        showRestockConfirmModal &&
        mountRestockConfirmModal()
      }
      {
        showPushOrderConfirmModal &&
        mountPushOrderConfirmModal()
      }
      {
        showCancelOrderConfirmModal &&
        mountCancelOrderConfirmModal()
      }
      {
        showGetOtpForRestockOrder &&
        mountGetOtpRestockOrder()
      }
      {
        restockOtp && restockOtp.trim().length > 0 &&
        <Dialog title="Restock OTP"
          subtitle={`OTP - ${restockOtp}`}
          actions={[
            <Button
              onClick={() => { location.reload(); setRestockOtp(""); }}
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              OK
            </Button>
          ]}
        />
      }
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

export default DeliveryServiceProviderDetails;