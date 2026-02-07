import {useState} from "react"
import {Link, Redirect} from "react-router-dom"
import Cookies from "js-cookie"
import {apiRequest} from "../../services/api"
import "./index.css"

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

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

  try {
    const res = await apiRequest("/auth/register", "POST", form)
    const data = await res.json()

    if (res.ok) {
      window.location.href = "/login"
    } else {
      alert(data.error || "Signup failed")
      setLoading(false)
    }
  } catch (err) {
    console.log("Signup error:", err)
    alert("Network error")
    setLoading(false)
  }
}


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={onSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={onChange}
            required
          />

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
            {loading ? <span className="btn-spinner" /> : "Sign Up"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
