import Cookies from "js-cookie"

const BASE_URL =
  "https://expense-tracker-backend-production-bf28.up.railway.app"

export const apiRequest = async (endpoint, method = "GET", body) => {
  const token = Cookies.get("jwt_token")

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options)

  if (response.status === 401) {
    Cookies.remove("jwt_token")
    window.location.href = "/login"
  }

  return response
}
