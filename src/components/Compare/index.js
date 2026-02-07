import {useEffect, useState} from "react"
import Navbar from "../Navbar"
import Loader from "../Loader"
import {apiRequest} from "../../services/api"
import apiStatus from "../../constants/apiStatusConstants"
import "./index.css"

const Compare = () => {
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

  if (status === apiStatus.failure) {
    return (
      <>
        <Navbar />
        <p className="error-text">Failed to load data</p>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Budget vs Expenses</h1>
        <p className="subtitle">
          Compare your spending against budgets
        </p>

        {data.map(item => {
          const percent =
            (item.total_spent / item.monthly_limit) * 100

          const isOver = item.remaining < 0

          return (
            <div
              className="compare-card"
              key={`${item.category}-${item.month_year}`}
            >
              <div className="compare-header">
                <h3>{item.category}</h3>

                <span
                  className={
                    isOver ? "status over" : "status on-track"
                  }
                >
                  {isOver ? "Over Budget" : "On Track"}
                </span>
              </div>

              <div className="compare-row">
                <span>Budget</span>
                <span>₹{item.monthly_limit}</span>
              </div>

              <div className="compare-row">
                <span>Spent</span>
                <span>₹{item.total_spent}</span>
              </div>

              <div className="compare-row">
                <span>Remaining</span>
                <span
                  className={isOver ? "red-text" : "green-text"}
                >
                  ₹{item.remaining}
                </span>
              </div>

              <div className="progress">
                <div
                  className={
                    isOver
                      ? "progress-bar red"
                      : "progress-bar green"
                  }
                  style={{
                    width: `${Math.min(percent, 100)}%`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Compare
