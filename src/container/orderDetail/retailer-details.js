import React , {useState} from 'react'
import Dialog from "./../../components/dialog/index"
import "./order-detail.scss"

function RetailerDetails({ retailerId, retailerStoreCode, retailerName, retailerMobileNumber, retailerAddress, retailerLandmark }) {

  const [showMountModal, setShowUnmountModal] = useState(false)

  const unmountModal = () => {
    setShowUnmountModal(false)
  }

  const mountModal = () => {
    setShowUnmountModal(true)
  }

  const [comments, setComments] = useState("")
  const [cancellation, setCancellation] = useState("")


  const handleComments = () => {
    setComments(event.target.value)
    console.log("Comments", comments)
  }

  const handleCancellation = () => {
    setCancellation(event.target.value)
    console.log("Cancellation", cancellation)
  }

  const handleSave = () => {
    console.log("Hello from delivery agent", kyc, documentId, comments)
  }

  return(
  <div className="orders-detail-card">
    <div className="header">
      <h4>RETAILER DETAILS</h4>
    </div>
    <div className='content'>
      <div className="item">
        <p className="label">Retailer ID</p>
          <p className="value">{retailerId ? retailerId : '-'}</p>
      </div>

      <div className="item">
        <p className="label">Store Code</p>
          <p className="value">{retailerStoreCode ? retailerStoreCode : '-'}</p>
      </div>

      <div className="item">
        <p className="label">Retailer Name</p>
          <p className="value">{retailerName ? retailerName : '-'}</p>
      </div>

      <div className="item">
        <p className="label">Retailer Phone Number</p>
          <p className="value">{retailerMobileNumber ? retailerMobileNumber : '-'}</p>
      </div>

      <div className="item">
        <p className="label">Retailer Address</p>
        <p className="value">
            {retailerAddress ? retailerAddress : '-'}
        </p>
      </div>

      <div className="item">
        <p className="label">Manual Cancellation</p>
        <button onClick={mountModal}>Cancel Order</button>
          {
            showMountModal && (
              <Dialog
                title="Cancel Order"
                label1="Reason for Cancellation"
                placeholder1="Select a reason from the list"
                label2="Comments"
                placeholder2="Enter your notes"
                actions={[
                  <form>
                    <div className="form">
                      <div className="cancellation-reason">
                        <p className="label">Enter Reason for Cancellation</p>
                        <input type="text-box" onChange={handleCancellation} placeholder="Enter a valid Document ID" />
                      </div>
                      <div className="comments-create">
                        <p className="label">Comments</p>
                        <input type="text-box" onChange={handleComments} placeholder="Enter your Notes" />
                      </div>
                    </div>
                  </form>,
                  <button color="primary" onClick={handleSave} style={{ marginTop: "32px" }} key={1} autoFocus>
                    SAVE
            </button>,
                  <button onClick={unmountModal} style={{ marginTop: "32px" }} key={2} color="primary">
                    CLOSE
            </button>
                ]}
              />
            )
          }
      </div>
    </div>
  </div>
)
}

export default RetailerDetails