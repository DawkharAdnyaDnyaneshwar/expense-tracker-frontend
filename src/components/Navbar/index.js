import {Link} from "react-router-dom"
import Cookies from "js-cookie"
import {FiLogOut, FiHome, FiDollarSign, FiPieChart} from "react-icons/fi"
import "./index.css"

const Navbar = () => {
  const logout = () => {
    Cookies.remove("jwt_token")
    window.location.href = "/"
  }
  

  return (
    <div className="navbar">
      <h2 className="logo">ExpenseTracker</h2>

      <div className="nav-links">
        <Link to="/dashboard" className="nav-item">
          <FiHome /> Dashboard
        </Link>

        <Link to="/expense" className="nav-item">
          <FiDollarSign /> Add Expense
        </Link>

        <Link to="/budgets" className="nav-item">
          <FiPieChart /> Budgets
        </Link>

        <Link to="/compare" className="nav-item">
          Compare
        </Link>

        <button className="logout" onClick={logout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
