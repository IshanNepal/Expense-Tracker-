import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [expenseList, setExpensesList] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseTitle, setExpenseTitle] = useState('');

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem('expenseList');
      const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];
      setExpensesList(Array.isArray(parsedExpenses) ? parsedExpenses : []);
    } catch (error) {
      console.error('Error loading expenses:', error);
      setExpensesList([]);
    }
  }, []);

  const addExpense = () => {
    if (expenseTitle === '') {
      alert('Please enter a title')
    } else {
      setExpensesList([...expenseList, { Topic: expenseTitle, Amount: expenseAmount }]);
      localStorage.setItem('expenseList', JSON.stringify([...expenseList, { Topic: expenseTitle, Amount: expenseAmount }]))
    }
  }

  useEffect(() => {
  }, [expenseList])

  const deleteExpense = (id) => {
    const updatedExpenses = expenseList.filter((item, index) => index !== id);
    setExpensesList(updatedExpenses);
    localStorage.setItem('expenseList', JSON.stringify(updatedExpenses));
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Expense Tracker</h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="Title Input" className="block text-sm font-medium text-gray-700 mb-1">Expense Title</label>
            <input
              type="text"
              name="expenseTitle"
              id="Title Input"
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter expense title"
            />
          </div>
          
          <div>
            <label htmlFor="AmtInput" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name='expenseAmount'
              id='AmtInput'
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter amount"
              step="1"
              min="0"
            />
          </div>
          
          <button
            onClick={addExpense}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add Expense
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expenses</h2>
          <div className="space-y-3">
            {expenseList.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div>
                  <span className="font-medium text-gray-800">{item.Topic}</span>
                  <span className="ml-2 text-gray-600">${item.Amount}</span>
                </div>
                <button
                  onClick={() => deleteExpense(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
