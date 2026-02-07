import {useState} from "react"
import Navbar from "../Navbar"
import {apiRequest} from "../../services/api"
import categories from "../../constants/categories"
import "./index.css"

const Budgets = () => {
  const [activeTab, setActiveTab] = useState("set")

  const [setForm, setSetForm] = useState({
    category: "Food",
    monthly_limit: "",
    month_year: "",
  })

  const [updateForm, setUpdateForm] = useState({
    category: "Food",
    monthly_limit: "",
    month_year: "",
  })

  const onSetChange = e => {
    setSetForm({...setForm, [e.target.name]: e.target.value})
  }

  const onUpdateChange = e => {
    setUpdateForm({...updateForm, [e.target.name]: e.target.value})
  }

  const submitSetBudget = async e => {
    e.preventDefault()
    await apiRequest("/budgets", "POST", setForm)
    alert("Budget created")
  }

  const submitUpdateBudget = async e => {
    e.preventDefault()
    await apiRequest("/budgets", "PUT", updateForm)
    alert("Budget updated")
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Manage Budgets</h1>
        <p className="subtitle">
          Set and update your monthly budget limits
        </p>

        {/* Toggle buttons */}
        <div className="tab-buttons">
          <button
            className={
              activeTab === "set"
                ? "tab-btn active"
                : "tab-btn"
            }
            onClick={() => setActiveTab("set")}
          >
            Set New Budget
          </button>

          <button
            className={
              activeTab === "update"
                ? "tab-btn active"
                : "tab-btn"
            }
            onClick={() => setActiveTab("update")}
          >
            Update Budget
          </button>
        </div>

        {/* Set Budget Form */}
        {activeTab === "set" && (
          <div className="card">
            <h3>Set New Budget</h3>

            <form className="form" onSubmit={submitSetBudget}>
              <select
                name="category"
                value={setForm.category}
                onChange={onSetChange}
              >
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <input
                name="monthly_limit"
                placeholder="Monthly Limit"
                onChange={onSetChange}
                required
              />

              <input
                name="month_year"
                placeholder="YYYY-MM"
                onChange={onSetChange}
                required
              />

              <button type="submit" className="primary-btn">
                Set Budget
              </button>
            </form>
          </div>
        )}

        {/* Update Budget Form */}
        {activeTab === "update" && (
          <div className="card">
            <h3>Update Budget</h3>

            <form
              className="form"
              onSubmit={submitUpdateBudget}
            >
              <select
                name="category"
                value={updateForm.category}
                onChange={onUpdateChange}
              >
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <input
                name="monthly_limit"
                placeholder="New Limit"
                onChange={onUpdateChange}
                required
              />

              <input
                name="month_year"
                placeholder="YYYY-MM"
                onChange={onUpdateChange}
                required
              />

              <button type="submit" className="primary-btn">
                Update Budget
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Budgets
