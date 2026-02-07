import {useState} from "react"
import Navbar from "../Navbar"
import {apiRequest} from "../../services/api"
import categories from "../../constants/categories"
import "./index.css"

const AddExpense = () => {
  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    date: "",
    description: "",
  })

  const onChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const onSubmit = async e => {
    e.preventDefault()

    await apiRequest("/expenses", "POST", form)
    alert("Expense added!")
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <h1>Expenses</h1>
        <p className="subtitle">
          Add and view your expense transactions
        </p>

        <div className="card">
          <h3>Add New Expense</h3>

          <form onSubmit={onSubmit} className="form">
            <input
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={onChange}
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={onChange}
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              required
            />

            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={onChange}
            />

            <button type="submit">Add Expense</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddExpense
