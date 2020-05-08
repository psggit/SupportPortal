import React from 'react'
import "./order-detail.scss"

const DeliveryStatusDetails = ({ deliveryStatus, deliveryPickupTime, deliveryDateAndTime, deliveryIdVerification}) => (
  <div className="orders-detail-card">
    <div className="header">
      <h4>DELIVERY STATUS DETAILS</h4>
    </div>
    <div className = "content">
      <div className="item">
        <p className="label">Order Status</p>
        <p className="value">{deliveryPickupTime ? deliveryPickupTime : '-'}</p>
      </div>

      <div className="item">
        <p className="label">Pickup Date &amp; Time</p>
        <p className="value">{deliveryStatus ? deliveryStatus : '-'}</p>
      </div>

      <div className="item">
        <p className="label">Delivered Date &amp; Time</p>
        <p className="value">{deliveryDateAndTime ? deliveryDateAndTime : '-'}</p>
      </div>

      <div className="item">
        <p className="label">ID Verification</p>
        <p className="value">{deliveryIdVerification ? deliveryIdVerification : ''}</p>
      </div>
      
    </div>
  </div>
)

export default DeliveryStatusDetails