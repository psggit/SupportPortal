import { POST, GET } from "../utils/fetch"

export function fetchCompleteOrderDetails (payload) {
  return GET ({
    api:`/deliveryman/api/1/support/complete_order_details/${payload.order_id}`,
    apiBase: "api",
    handleError: true
  })
}

export function fetchOrderDetails (payload) {
  return POST({
    api: `/deliveryman/api/1/fetch-order-details`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function cancelOrder (payload) {
  return POST({
    api: `/orderman/api/1/agent/lot/order/cancel`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function completeOrder (payload) {
  return POST({
    api: `/orderman/api/1/agent/lot/order/deliver`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function submitNotes (payload) {
  return POST({
    api: `/deliveryman/api/1/support/order-notes`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function fetchCancellationReasons (payload) {
  return POST({
    api: `/deliveryman/api/1/support/cancel-reason`,
    apiBase: "api",
    handleError: true,
    data:payload
  })
}

export function fetchKycDocumentList (payload) {
  return GET({
    api: `/deliveryman/api/1/agent/kyc-list`,
    apiBase: "api",
    handleError: true
  })
}
