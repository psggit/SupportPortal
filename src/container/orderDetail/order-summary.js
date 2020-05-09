import React from 'react'
import './order-detail.scss'

const OrderSummary = ({orderTotal, cartTotal, cartItems, feeDetails }) => (
  <div className="orders-detail-card">
    <div className="header">
      <h4>ORDER SUMMARY</h4>
    </div>
    <div className="content">

      <div className="flex-item" style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>Order Total</span>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>{orderTotal ? `$${orderTotal}` : "-"}</span>
      </div>

      <div className="flex-item" style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>Cart Total</span>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold'  }}>{cartTotal ? `$${cartTotal}` : "-"}</span>
      </div>
      {
        cartItems ? 
        cartItems.map((item, index) => {
          return <div className="flex-item" key={index} style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{item.brand_name}</p>
                  <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`$${item.total_price}`}</p>
                </div>
        }) : ""
      }
  
      <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>{"Additional Charges"}</p>
        <p style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold', marginLeft: '4px' }}>{`${feeDetails ?  `$${parseInt(feeDetails[0].fee_value) + parseInt(feeDetails[1].fee_value) + parseInt(feeDetails[2].fee_value)}` : ""}`}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"Delivery Charges"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`${feeDetails ? '$'+feeDetails[2].fee_value : "-"}`}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"Packing Charges"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`${feeDetails ? '$'+feeDetails[0].fee_value : "-"}`}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"Priority Charges"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`${feeDetails ? '$'+feeDetails[1].fee_value : "-"}`}</p>
      </div>
   
      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"Other Charges"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"$1"}</p>
      </div>
      
      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"CGST(1%)"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"$5"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"SGST(1%)"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"$4"}</p>
      </div>
    </div>
  </div>
)

export default OrderSummary