import React from 'react'
import './order-detail.scss'

const PaymentDetails = ({ walletTotal, paymentTotal, hipbarWallet, giftWallet, upi ,nodalAmount}) => (

  <div className="orders-detail-card">
    <div className="header">
      <h4>PAYMENT DETAILS</h4>
    </div>

    <div className="content">

      <div className="flex-item" style={{ marginBottom: '16px' }}>
        <p style={{fontSize: "18px", fontWeight: "bold"}}> Payment Total</p>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{paymentTotal ? `₹${paymentTotal}` : "-"}</p>
      </div>
  
      <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{"Wallets"}</p>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{walletTotal ? `₹${walletTotal}` : "-"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p>{"Hipbar Wallet"}</p>
        <p>{hipbarWallet ? `₹${hipbarWallet}` : "-"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '16px' }}>
        <p>{"Gift Wallet"}</p>
        <p>{giftWallet ? `₹${giftWallet}` : "-"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{"Nodal Amount"}</p>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{nodalAmount ? `₹${nodalAmount}` : "-"}</p>
      </div>

      {/* <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{"Additional Payment Details"}</p>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{upi ? `₹${upi}` : "-"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p>{"UPI"}</p>
        <p>{upi ? `₹${upi}` : "-"}</p>
      </div> */}
    
    </div>
  </div>
)

export default PaymentDetails