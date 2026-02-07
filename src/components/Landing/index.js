import {Link} from "react-router-dom"
import "./index.css"

const Landing = () => (
  <div className="landing">
    <div className="hero">
      <h1>
        Take Control of Your <span>Finances</span>
      </h1>
      <p>
        Track expenses, set budgets, and get real-time insights.
      </p>

      <Link to="/signup" className="primary-btn">
        Start Free
      </Link>

      <Link to="/login" className="secondary-btn">
        Sign In
      </Link>
    </div>
  </div>
)

export default Landing
