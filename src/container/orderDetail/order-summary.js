import React from 'react'
import './order-detail.scss'

const OrderSummary = ({orderTotal, cartTotal, cartItems, feeDetails,cgstPercentage, sgstPercentage ,cgstAmount,sgstAmount}) => (
  <div className="orders-detail-card">
    <div className="header">
      <h4>ORDER SUMMARY</h4>
    </div>
    <div className="content">

      <div className="flex-item" style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>Order Total</span>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>{orderTotal ? `₹${orderTotal}` : "-"}</span>
      </div>

      <div className="flex-item" style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>Cart Total</span>
        <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>{cartTotal ? `₹${cartTotal}` : "-"}</span>
      </div>
      {
        cartItems ? 
        cartItems.map((item, index) => {
          return <div className="flex-item" key={index} style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{item.brand_name}</p>
            <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`₹${item.total_price}`}</p>
                </div>
        }) : ""
      }
  
      <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>{"Additional Charges"}</p>
        <p style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold', marginLeft: '4px' }}>{"₹0"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"Delivery Charges"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹0"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"Packing Charges"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹0"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"Priority Charges"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹0"}</p>
      </div>
   
      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"Other Charges"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹1"}</p>
      </div>
      
      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"CGST" +"(" +cgstPercentage +"%)"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹"+cgstAmount}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '6px' }}>
        <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"SGST" + "(" + sgstPercentage + "%)"}</p>
        <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹" +sgstAmount}</p>
      </div>
    </div>
  </div>
)

export default OrderSummary