import React, { useState } from 'react'
import Dialog from "Components/dialog/index"
import "./order-detail.scss"

function DeliveryAgentDetails({ deliveryAgentPickupDateAndTime, deliveryAgentId, deliveryAgentName, deliveryAgentVehicleNumber, deliveryAgentMobileNumber }) {

  const [showMountModal, setShowUnmountModal] = useState(false)

  const unmountModal = () => {
    setShowUnmountModal(false)
  }

  const mountModal = () => {
    setShowUnmountModal(true)
  }

  const [comments, setComments] = useState("")
  const [kyc, setKyc] = useState("")
  const [documentId, setDocumentId] = useState("")


  const handleComments = () => {
    setComments(event.target.value)
    console.log("Comments", comments)
  }

  const handleKycDocumnet = () => {
    setKyc(event.target.value)
    console.log("KYC", kyc)
  }

  const handleDocumentId = () => {
    setDocumentId(event.target.value)
    console.log("DocumentId", documentId)
  }

  const handleSave = () => {
    console.log("Hello from delivery agent",kyc,documentId,comments)
  }

  return (
    <div className="orders-detail-card">
      <div className="header">
        <h4>DELIVERY AGENT DETAILS</h4>
      </div>
      <div className="content">

        <div className="item">
          <p className="label">Delivery Agent ID</p>
          <p className="value">{deliveryAgentId ? deliveryAgentId : "-"}</p>
        </div>

        <div className="item">
          <p className="label">Delivery Agent Name</p>
          <p className="value">{deliveryAgentName ? deliveryAgentName : "-"}</p>
        </div>

        <div className="item">
          <p className="label">Delivery Agent Vehicle Number </p>
          <p className="value">{deliveryAgentVehicleNumber ? deliveryAgentVehicleNumber : "-"} </p>
        </div>

        <div className="item">
          <p className="label">Delivery Agent Mobile Number</p>
          <p className="value" style={{ marginBottom: '10px' }}>
            {deliveryAgentMobileNumber ? deliveryAgentMobileNumber : "-"}
          </p>
        </div>

        <div className="item">
          <p className="label">Manual Completion</p>
          <button onClick={mountModal}>Complete Order</button>
          {
            showMountModal && (
              <Dialog
                title="Complete Order"
                // label1="Select KYC Document"
                // placeholder1="Select KYC Document"
                // label2="Comments"
                // placeholder2="Enter your notes"
                actions={[
                  <form>
                    <div className="form">
                      <div className ="kyc-create" style={{marginTop:"32px"}}>
                       <p className="label">Enter KYC Document</p>
                       <input type="text-box" onChange ={handleKycDocumnet} placeholder ="Enter a KYC document from the List"/>
                      </div>
                      <div className="document-id-create">
                        <p className="label">Enter Document ID</p>
                        <input type="text-box" onChange={handleDocumentId} placeholder="Enter a valid Document ID"/>
                      </div>
                      <div className="comments-create">
                        <p className="label">Comments</p>
                        <input type="text-box" onChange={handleComments} placeholder="Enter your Notes"/>
                      </div>
                    </div>
                  </form>,
                  <button onClick={handleSave} color="primary" style={{marginTop:"32px"}}key={1} autoFocus>
                    SAVE
                  </button>,
                  <button onClick={unmountModal} style={{ marginTop: "32px" }}key={2} color="primary">
                    CLOSE
                  </button>
                ]}
              />
            )}

        </div>
      </div>
    </div>
  )
}
export default DeliveryAgentDetails