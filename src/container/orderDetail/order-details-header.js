import React from 'react'
import "./order-detail.scss"
import Moment from "moment"
// import Icon from "@components/icon"

const OrderDetailsHeader = ({ orderId, dateAndTime, slotDate, partialDelivery, lotID, platForm, consumerConcern, deliveryRating, feedback }) => (
  <div className="orders-details-header-card">
    <div className="header">
      <h4>ORDER DETAILS</h4>
    </div>
    <div className="content">
      <div className="item">
        <p className="label">Order ID</p>
        <p className="value">{orderId ? orderId : "-"}</p>
      </div>
      <div className="item">
        <p className="label">Order Date & Time</p>
        <p className="value">{dateAndTime ? Moment(dateAndTime).format("DD-MM-YYYY | hh:mm A") : "-"}</p>
      </div>
      <div className="item">
        <p className="label">Lot ID</p>
        <p className="value">{lotID ? lotID : "-"}</p>
      </div>
      <div className="item">
        <p className="label">Slot Date</p>
        <p className="value">{slotDate ? Moment(slotDate).format("DD-MM-YYYY | hh:mm A") : "-"}</p>
      </div>
      <div className="item">
        <p className="label">Partial Delivery</p>
        <p className="value">{partialDelivery ? partialDelivery : "-"}</p>
      </div>
      <div className="item">
        <p className="label">Platform</p>
        <p className="value">{platForm ? platForm : "-"}</p>
      </div>
      </div>
      <div className="content">
        <div className="item column1">
          <p className="label">Delivery Rating</p>
          <p className="value">{deliveryRating ? deliveryRating : "-"}</p>
        </div>
        <div className="item column2">
          <p className="label">Consumer Concern</p>
          <p className="value">{consumerConcern ? consumerConcern : "-"}</p>
        </div>
        <div className="item column3">
          <p className="label">Feedback</p>
          <p className="value">{feedback ? feedback : "-"}</p>
        </div>
      </div>
  </div>
)

export default OrderDetailsHeader