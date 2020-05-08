import React from 'react';
import "./modal-box.scss"

const Modal = ({ isShowing, hide, header,label1,label2,placeholder1,placeholder2 }) => isShowing === true ?(
  <React.Fragment>
    <div className="modal-box">
      <div className="modal-container">
        <div className="row1">
          <p>{header} </p>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="form">
          <p className="form-label">{label1}</p>
          <input type="text-box" placeholder={placeholder1}/>
        </div>
        <div className="form">
          <p className="form-label">{label2}</p>
          <input type="text-box" placeholder={placeholder2} />
        </div>
      </div>
    </div>
  </React.Fragment>
) :null
export default Modal;