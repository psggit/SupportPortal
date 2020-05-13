import React from 'react'
import './order-detail.scss'

const OrderSummary = ({ orderTotal, cartTotal, cartItems, feeDetails, cgstPercentage, sgstPercentage, cgstAmount, sgstAmount, additionalTotalCharges}) => (
  <div className="orders-detail-card">
    <div className="header">
      <h4>ORDER SUMMARY</h4>
    </div>
    <div className="content">

      <div className="flex-item" style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>Cart Total</span>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>{cartTotal ? `₹${cartTotal}` : "-"}</span>
      </div>
      <div className="flex-item" style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold', color:"#757575" }}>Ordered Cart Items</span>
      </div>
      {
        cartItems ?
        cartItems.map((item, index) => {
          return <div className="flex-item" key={index} style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{item.brand_name} x {item.ordered_count}</p>
            <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`₹${item.total_price}`}</p>
                </div>
        }) : ""
      }

      <div className="flex-item" style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold', color:"#757575"}}>Delivered/Deliverable Cart Items</span>
      </div>
      {
        cartItems ?
        cartItems.map((item, index) => {
          return <div className="flex-item" key={index} style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{item.brand_name} x {item.deliverable_count}</p>
            <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`₹${item.revised_total_price}`}</p>
                </div>
        }) : ""
      }

      <div className="flex-item" style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold', color:"757575" }}>Additional Total Charges</span>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>{additionalTotalCharges ? `₹${additionalTotalCharges}` : "-"}</span>

      </div>
      {
        feeDetails ?
          feeDetails.map((item, index) => {
            return <div className="flex-item" key={index} style={{ marginBottom: '5px' }}>
              <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{item.fee_title}</p>
              <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`₹${item.fee_value_without_taxes}`}</p>
            </div>
          }) : ""
      }

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"CGST" +"(" +cgstPercentage +"%)"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹"+cgstAmount}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"SGST" + "(" + sgstPercentage + "%)"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹" +sgstAmount}</p>
      </div>

      <div className="flex-item" style={{ marginTop: '10px' }}>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>Order Total</span>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>{orderTotal ? `₹${orderTotal}` : "-"}</span>
      </div>
    </div>
  </div>
)

export default OrderSummary
