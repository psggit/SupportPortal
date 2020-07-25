import React from 'react';
import './order-detail.scss';
import Moment from 'moment';

const PaymentDetails = ({ walletTotal, paymentTotal, hipbarWallet, giftWallet, upi, nodalAmount, timingDetails}) => (

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

      <div className="flex-item" style={{ marginBottom: '20px', borderBottom: "1px solid #E5E5E5", paddingBottom: "20px" }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{"Nodal Amount"}</p>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{nodalAmount ? `₹${nodalAmount}` : "-"}</p>
      </div>
      {
        timingDetails &&
        <div style={{ fontSize: '18px', lineHeight: '20px', fontWeight: '600', marginBottom: "20px" }}>Timing Details</div>
      }
      {
        timingDetails && timingDetails.map((item, index) => {
          return <div>
            <div className="flex-item" key={index} style={{ marginBottom: '16px', display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: '16px', lineHeight: '20px', color: '#212121' }}>{item.display_name} </span>
              <span style={{ fontSize: '16px', lineHeight: '24px'}}>{Moment(item.display_value).format("DD/MM/YYYY h:mm A")}</span>
            </div>
          </div>
        })
      }

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