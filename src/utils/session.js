export function getHasuraRole(data) {
  const hasuraRoles = data.hasura_roles
 
  const rolesMap = {
    admin: 8,
    account_manager: 8,
    opadmin: 8,
    dataadmin: 7,
    opdataadmin: 7,
    dataentry: 6,
    opdataentry: 6,
    support_admin: 5,
    support_master: 4,
    support_person: 3,
    business_team: 9,
    product_team: 5,
    delivery_support_person: 3,
    user: 1
  }
  let maxRole = rolesMap["admin"]
  let xHasuraRole = "admin"
  //console.log("roles", hasuraRoles)
  for (let i = 0; i < hasuraRoles.length; i++) {
    if (maxRole <= rolesMap[hasuraRoles[i]]) {
      //console.log("data", rolesMap[hasuraRoles[i]], hasuraRoles[i])
      maxRole = rolesMap[hasuraRoles[i]]
      xHasuraRole = hasuraRoles[i]
    }
  }
  return xHasuraRole
}

export function getHasuraId(data) {
  const hasuraId = data.hasura_id
  return hasuraId
}

export function createSession(data) {
  console.log("hasure role", getHasuraRole(data))
  localStorage.setItem('x-hasura-role', getHasuraRole(data))
  localStorage.setItem("hasura-id", getHasuraId(data))
}