import {useEffect, useState} from "react"
import Navbar from "../Navbar"
import Loader from "../Loader"
import {apiRequest} from "../../services/api"
import apiStatus from "../../constants/apiStatusConstants"
import "./index.css"

const Dashboard = () => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState(apiStatus.initial)

  const getData = async () => {
    setStatus(apiStatus.inProgress)
    try {
      const res = await apiRequest("/budgets/compare")
      const result = await res.json()

      if (Array.isArray(result)) {
        setData(result)
      } else {
        setData([])
      }
      setStatus(apiStatus.success)
    } catch {
      setData([])
      setStatus(apiStatus.failure)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (status === apiStatus.inProgress) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    )
  }

  const totalBudget = data.reduce(
    (a, b) => a + Number(b.monthly_limit || 0),
    0
  )

  const totalSpent = data.reduce(
    (a, b) => a + Number(b.total_spent || 0),
    0
  )

  const remaining = totalBudget - totalSpent

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Dashboard</h1>

        <div className="summary-row">
          <div className="summary-card">
            <span>Total Budget</span>
            <h2 className="blue">₹{totalBudget}</h2>
          </div>

          <div className="summary-card">
            <span>Total Spent</span>
            <h2 className="red">₹{totalSpent}</h2>
          </div>

          <div className="summary-card">
            <span>Remaining</span>
            <h2 className="green">₹{remaining}</h2>
          </div>
        </div>

        <div className="section">
          <h3>Budget Summary by Category</h3>

          {data.map(item => {
            const percent =
              (item.total_spent / item.monthly_limit) * 100

            return (
              <div className="category-card" key={item.category}>
                <h4>{item.category}</h4>

                <div className="row">
                  <span>Budget</span>
                  <span>₹{item.monthly_limit}</span>
                </div>

                <div className="row">
                  <span>Spent</span>
                  <span>₹{item.total_spent}</span>
                </div>

                <div className="progress">
                  <div
                    className={
                      percent > 100
                        ? "progress-bar red"
                        : "progress-bar green"
                    }
                    style={{width: `${Math.min(percent, 100)}%`}}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Dashboard
