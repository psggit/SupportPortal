import React, { useState } from 'react'
import './order-detail.scss'

function SupportDetails ()  {

  return (
    <div className="orders-detail-card" style={{marginLeft:'auto'}}>
      <div className="header">
        <h4>SUPPORT TEAM LOGS</h4>
      </div>
      <div className="content">
        <div className="item">
          <p className="label">Support Executive Assigned</p>
          <p className="value">
            {"Naveen"}
          </p>
        </div>

        <div className="item">
          <p className="label">Activity Logs</p>
          <p className="value">
            {"Krishnan transfered to Naveen"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SupportDetails