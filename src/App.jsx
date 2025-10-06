import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, IndianRupee, Percent } from 'lucide-react'
import './App.css'

export default function App() {
  const [totalAmount, setTotalAmount] = useState('')
  const [ratePerItem, setRatePerItem] = useState('')
  const [gstRate, setGstRate] = useState('18')

  const amountIncludingGST = parseFloat(totalAmount) || 0
  const gstRateDecimal = parseFloat(gstRate) || 0
  const amountExcludingGST = amountIncludingGST / (1 + gstRateDecimal / 100)
  const allGST = amountIncludingGST - amountExcludingGST
  const cgst = allGST / 2
  const sgst = allGST / 2

  const formatCurrency = (value) => {
    return `₹${value.toFixed(2)}`
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <div className="app">
      <motion.div
        className="container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="header" variants={itemVariants}>
          <Calculator className="header-icon" size={40} />
          <h1>Smart GST Calculator</h1>
          <p>Calculate GST with ease</p>
        </motion.div>

        <motion.div className="card" variants={itemVariants}>
          <h2>Input Details</h2>
          
          <div className="input-group">
            <IndianRupee className="input-icon" size={20} />
            <input
              type="number"
              id="totalAmount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder=" "
              className="input-field"
            />
            <label htmlFor="totalAmount" className="floating-label">
              Total Amount (Including GST)
            </label>
          </div>

          <div className="input-group">
            <IndianRupee className="input-icon" size={20} />
            <input
              type="number"
              id="ratePerItem"
              value={ratePerItem}
              onChange={(e) => setRatePerItem(e.target.value)}
              placeholder=" "
              className="input-field"
            />
            <label htmlFor="ratePerItem" className="floating-label">
              Rate per Item
            </label>
          </div>

          <div className="input-group">
            <Percent className="input-icon" size={20} />
            <input
              type="number"
              id="gstRate"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              placeholder=" "
              className="input-field"
            />
            <label htmlFor="gstRate" className="floating-label">
              GST Rate (%)
            </label>
          </div>
        </motion.div>

        <motion.div className="card results" variants={itemVariants}>
          <h2>Calculated Results</h2>
          
          <div className="result-item">
            <span className="result-label">Amount Including GST</span>
            <span className="result-value">{formatCurrency(amountIncludingGST)}</span>
          </div>

          <div className="result-item highlight">
            <span className="result-label">Amount Excluding GST</span>
            <span className="result-value">{formatCurrency(amountExcludingGST)}</span>
          </div>

          <div className="result-item highlight">
            <span className="result-label">All GST</span>
            <span className="result-value">{formatCurrency(allGST)}</span>
          </div>

          <div className="divider"></div>

          <div className="result-item">
            <span className="result-label">CGST (Central GST)</span>
            <span className="result-value">{formatCurrency(cgst)}</span>
          </div>

          <div className="result-item">
            <span className="result-label">SGST (State GST)</span>
            <span className="result-value">{formatCurrency(sgst)}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
