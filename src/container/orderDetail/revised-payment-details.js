import React from 'react'
import './order-detail.scss'

const RevisedPaymentDetails = ({ revisedWalletTotal, revisedPaymentTotal, revisedHipbarWallet, revisedGiftWallet }) => (

  <div className="orders-detail-card">
    <div className="header">
      <h4> REVISED PAYMENT DETAILS</h4>
    </div>

    <div className="content">

      <div className="flex-item" style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}> Revised Payment Total</p>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{revisedPaymentTotal ? `₹${revisedPaymentTotal}` : "-"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{"Wallets"}</p>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{revisedWalletTotal ? `₹${revisedWalletTotal}` : "-"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '8px' }}>
        <p>{"Hipbar Wallet"}</p>
        <p>{revisedHipbarWallet ? `₹${revisedHipbarWallet}` : "-"}</p>
      </div>

      <div className="flex-item" style={{ marginBottom: '16px' }}>
        <p>{"Gift Wallet"}</p>
        <p>{revisedGiftWallet ? `₹${revisedGiftWallet}` : "-"}</p>
      </div>

    </div>
  </div>
)

export default RevisedPaymentDetails