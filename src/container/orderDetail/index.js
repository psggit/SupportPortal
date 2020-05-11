import React, { useState, useEffect } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import CustomerDetails from "./customer-details"
import OrderSummary from "./order-summary"
import RetailerDetails from "./retailer-details"
import DeliveryAgentDetails from "./delivery-agent-details"
import PaymentDetails from "./payment-details"
import DeliveryStatusDetails from "./delivery-status-details"
import SupportDetails from "./support-details"
import OrderDetailsHeader from "./order-details-header"
import { fetchCompleteOrderDetails } from "../api"

function OrderDetail (props) {

  const [orderDetails,setOrderDetails] = useState([])
  const [orderDetailsTaxes,setOrderDetailsTaxes] = useState([])
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false)


  useEffect(() => {
    fetchOrderDetailsData()
  },[]);

   const fetchOrderDetailsData = () => {
     setLoadingOrderDetails(true)
     const payload = {
       order_id: props.match.params.orderId
     }
     fetchCompleteOrderDetails(payload)
      .then((response) => {
        setOrderDetails(response.order_details)
        setOrderDetailsTaxes(response.order_details.taxes)
        setLoadingOrderDetails(false)
        console.log("HHHHHHHH",response.order_details.order_status_button)
        // console.log("Response", response.order_details, response.order_details.fee_details_struct[0])
      })
      .catch((err) => {
        setLoadingOrderDetails(false)
        console.log("Error in fetching order details", err)
      })
  }
 
  return (
    <div id="order-detail">
      <div className="order-details" style={{ marginBottom: "40px" }}>
        <OrderDetailsHeader
          orderId={orderDetails.order_id}
          partialDelivery={orderDetails.partial_delivery}
          dateAndTime={orderDetails.order_date_and_time}
          slotDate={orderDetails.slot_time}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <CustomerDetails
          orderId={props.match.params.orderId}
          customerId={orderDetails.customer_id}
          customerName={orderDetails.customer_name}
          customerMobileNumber={orderDetails.customer_contact_number}
          customerState={orderDetails.customer_state}
          customerCity={orderDetails.customer_city}
          customerAddress={orderDetails.customer_address}
          customerLandmark={orderDetails.customer_landmark}
          orderButtonStatus={orderDetails.order_status_button}
        />
        <RetailerDetails
          orderId={props.match.params.orderId}
          retailerId={orderDetails.retailer_id}
          retailerStoreCode={orderDetails.retailer_code}
          retailerName={orderDetails.retailer_name}
          retailerMobileNumber={orderDetails.retailer_contact_number}
          retailerAddress={orderDetails.retailer_address}
          orderButtonStatus={orderDetails.order_status_button}
        />
        <OrderSummary
          orderTotal={orderDetails.original_order_total}
          cartTotal={orderDetails.original_cart_total}
          cartItems={orderDetails.cart_items}
          feeDetails={orderDetails.fee_details_struct}
          cgstPercentage={orderDetails.cgst_percentage}
          cgstAmount ={ orderDetailsTaxes.cgst_total}
          sgstPercentage={orderDetails.sgst_percentage}
          sgstAmount={orderDetailsTaxes.sgst_total}
        />

        <DeliveryAgentDetails
          //deliveryAgentPickupDateAndTime={orderDetails.delivery_agent_pick_up_date_and_time}
          orderId={props.match.params.orderId}
          deliveryAgentId={orderDetails.delivery_agent_id}
          deliveryAgentName={orderDetails.delivery_agent_name}
          deliveryAgentMobileNumber={orderDetails.delivery_agent_contact_number}
          deliveryAgentVehicleNumber={orderDetails.delivery_agent_vehicle_number}
        />

        <PaymentDetails
          walletTotal={orderDetails.WalletTotal}
          hipbarWallet={orderDetails.hipbar_wallet}
          giftWallet={orderDetails.gift_wallet}
          paymentTotal={orderDetails.payment_total}
          upi={orderDetails.upi}
        />

        <DeliveryStatusDetails
          deliveryStatus={orderDetails.delivery_status}
          deliveryDateAndTime={orderDetails.delivery_date_and_time}
          deliveryPickupTime={orderDetails.delivery_agent_pick_up_date_and_time}
          deliveryIdVerification={orderDetails.delivery_id_verification}
        />

        <SupportDetails />

      </div>
    </div>
  )
}

export default OrderDetail