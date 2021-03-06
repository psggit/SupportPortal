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
import RevisedPaymentDetails from "./revised-payment-details"
import { fetchCompleteOrderDetails } from "../api"
import DeliveryServiceProviderDetails from "./delivery-service-provider-details"

function OrderDetail (props) {

  const [orderDetails,setOrderDetails] = useState([])
  const [orderDetailsTaxes,setOrderDetailsTaxes] = useState([])
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false)
  const[cartItemsArray,setCartItemsArray] = useState([{id:120},{id:222}])


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
        console.log("HHHHHHHH",response.order_details)
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
          lotID={orderDetails.lot_id}
          platForm={orderDetails.platform}
          consumerConcern={orderDetails.consumer_concern}
          deliveryRating={orderDetails.delivery_rating}
          feedback={orderDetails.feedback}
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
          showResolveButton={orderDetails.to_show_resolve_button}
          consumerUPI={orderDetails.consumer_upi}
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
          orderTotal={orderDetails.revised_order_total}
          cartTotal={orderDetails.revised_cart_total}
          cartItems={orderDetails.cart_items}
          timingDetails={orderDetails.timing_details}
          // cartItemsArray={cartItemsArray}
          feeDetails={orderDetails.fee_details_struct}
          cgstPercentage={orderDetails.cgst_percentage}
          cgstAmount ={ orderDetailsTaxes.cgst_total}
          sgstPercentage={orderDetails.sgst_percentage}
          sgstAmount={orderDetailsTaxes.sgst_total}
          igstPercentage={orderDetails.igst_percentage}
          igstAmount={orderDetailsTaxes.igst_total}
          additionalTotalCharges={orderDetails.total_additional_fee}
          retailerId={orderDetails.retailer_id}
          cityId={orderDetails.city_id}
          stateId={orderDetails.state_id}
          gps={orderDetails.gps}
          orderId={orderDetails.order_id}
        />

        <DeliveryAgentDetails
          //deliveryAgentPickupDateAndTime={orderDetails.delivery_agent_pick_up_date_and_time}
          orderId={props.match.params.orderId}
          deliveryAgentId={orderDetails.delivery_agent_id}
          deliveryAgentStatus={orderDetails.delivery_agent_status}
          retailerId={orderDetails.retailer_id}
          deliveryAgentName={orderDetails.delivery_agent_name}
          deliveryAgentMobileNumber={orderDetails.delivery_agent_contact_number}
          deliveryAgentVehicleNumber={orderDetails.delivery_agent_vehicle_number}
          orderButtonStatus={orderDetails.order_status_button}
          reservedForDeliveryAgent={orderDetails.reserved_for_da_id}
        />

        <PaymentDetails
          nodalAmount={orderDetails.nodal_amount}
          walletTotal={orderDetails.wallet_total}
          hipbarWallet={orderDetails.hipbar_wallet}
          giftWallet={orderDetails.gift_wallet}
          paymentTotal={orderDetails.original_order_total}
          upi={orderDetails.upi}
          timingDetails={orderDetails.timing_details}
        />

        <DeliveryStatusDetails
          orderId={props.match.params.orderId}
          deliveryStatus={orderDetails.delivery_status}
          deliveryDateAndTime={orderDetails.delivered_date_and_time}
          deliveryPickupTime={orderDetails.delivery_agent_pick_up_date_and_time}
          deliveryIdVerification={orderDetails.verification_type}
          orderButtonStatus={orderDetails.order_status_button}
          cancelledBy={orderDetails.cancelled_by}
          showNotes={orderDetails.show_notes}
          cancellationReason={orderDetails.delivery_cancellation_reason}
          orderCancellationDateAndTime={orderDetails.order_cancelled_time}
          lotID={orderDetails.lot_id}
        />

        <RevisedPaymentDetails
          revisedWalletTotal={orderDetails.revised_wallet_total}
          revisedHipbarWallet={orderDetails.revised_hipbar_wallet}
          revisedGiftWallet={orderDetails.revised_gift_wallet}
          revisedPaymentTotal={orderDetails.revised_order_total}
        />

        <SupportDetails />

        <DeliveryServiceProviderDetails
          orderId={props.match.params.orderId}
          assignedDSP={orderDetails.assigned_delivery_service_provider}
          dspAcceptedTime={orderDetails.delivery_service_provider_accepted_time}
          showRestockButton={orderDetails.restock_button}
          showPushOrderButton={orderDetails.push_order_to_dsp_button}
          showCancelOrderButton={orderDetails.cancel_order_from_dsp_button}
        />
      </div>
    </div>
  )
}

export default OrderDetail
