import {useState} from "react"
import {Link, Redirect} from "react-router-dom"
import Cookies from "js-cookie"
import {apiRequest} from "../../services/api"
import Loader from "../Loader"
import "./index.css"

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const token = Cookies.get("jwt_token")

  if (token) {
    return <Redirect to="/dashboard" />
  }

  const onChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await apiRequest("/auth/login", "POST", form)
      const data = await res.json()

      if (data.token) {
        Cookies.set("jwt_token", data.token)
        window.location.href = "/dashboard"
      } else {
        setError(data.error || "Login failed")
      }
    } catch {
      setError("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <form onSubmit={onSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={onChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChange}
            required
          />

          <button disabled={loading} className="login-btn">
            {loading ? <span className="btn-spinner" /> : "Sign In"}
          </button>

        </form>

        {error && <p className="error">{error}</p>}

        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
