import { useState } from 'react'
import { evaluate } from 'mathjs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function App() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [firstTerm, setFirstTerm] = useState(1)
  const [diffRatio, setDiffRatio] = useState(1)
  const [count, setCount] = useState(5)
  const [sequence, setSequence] = useState([])
  const [problem, setProblem] = useState('')
  const [problemAnswer, setProblemAnswer] = useState('')

  const evaluateExpression = () => {
    try { setResult(String(evaluate(expression))) }
    catch { setResult('Error') }
  }

  const generateArithmetic = () => {
    const a = Number(firstTerm), d = Number(diffRatio), n = Math.max(0, Number(count) || 0)
    setSequence(Array.from({ length: n }, (_, i) => a + i * d))
  }

  const generateGeometric = () => {
    const a = Number(firstTerm), r = Number(diffRatio), n = Math.max(0, Number(count) || 0)
    setSequence(Array.from({ length: n }, (_, i) => a * r ** i))
  }

  const solveWordProblem = () => {
    const text = problem.toLowerCase()
    try {
      if (text.includes('sum of first') && text.includes('arithmetic')) {
        const numbers = text.match(/\d+/g)?.map(Number)
        if(numbers && numbers.length>=3){
          const a = numbers[0], d = numbers[1], n = numbers[2]
          const sum = n/2*(2*a+(n-1)*d)
          setProblemAnswer(sum)
          return
        }
      }
      setProblemAnswer('Cannot solve this problem yet')
    } catch { setProblemAnswer('Error') }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">📐 Amath Solver</h1>
        <p className="text-gray-600 mt-2">Calculator, sequences, visualization & word problem solver</p>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        <section className="p-6 bg-white rounded-2xl shadow">
          <h2 className="text-2xl mb-4">Calculator</h2>
          <div className="flex gap-2 mb-3">
            <input className="border rounded px-3 py-2 flex-1" placeholder="2+3*4" value={expression} onChange={e=>setExpression(e.target.value)}/>
            <button onClick={evaluateExpression} className="bg-blue-600 text-white px-4 rounded">Solve</button>
          </div>
          <p>Result: <span className="font-bold">{result}</span></p>
        </section>

        <section className="p-6 bg-white rounded-2xl shadow">
          <h2 className="text-2xl mb-4">Sequences & Visualization</h2>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <input type="number" className="border rounded px-2 py-1" value={firstTerm} onChange={e=>setFirstTerm(e.target.value)} placeholder="First term"/>
            <input type="number" className="border rounded px-2 py-1" value={diffRatio} onChange={e=>setDiffRatio(e.target.value)} placeholder="Diff / Ratio"/>
            <input type="number" className="border rounded px-2 py-1" value={count} onChange={e=>setCount(e.target.value)} placeholder="# terms"/>
          </div>
          <div className="flex gap-2 mb-3">
            <button onClick={generateArithmetic} className="px-3 py-1 border rounded">Arithmetic</button>
            <button onClick={generateGeometric} className="px-3 py-1 border rounded">Geometric</button>
          </div>
          {sequence.length>0 && (
            <div>
              <p>Sequence: <span className="font-mono">{sequence.join(', ')}</span></p>
              <LineChart width={300} height={200} data={sequence.map((v,i)=>({x:i+1,y:v}))}>
                <XAxis dataKey="x"/>
                <YAxis/>
                <Tooltip/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="y" stroke="#8884d8"/>
              </LineChart>
            </div>
          )}
        </section>

        <section className="p-6 bg-white rounded-2xl shadow md:col-span-2">
          <h2 className="text-2xl mb-4">Word Problem Solver</h2>
          <input type="text" className="border rounded px-3 py-2 w-full mb-3" placeholder="Enter word problem" value={problem} onChange={e=>setProblem(e.target.value)}/>
          <button onClick={solveWordProblem} className="bg-green-600 text-white px-4 py-1 rounded mb-3">Solve</button>
          {problemAnswer && <p>Answer: <span className="font-bold">{problemAnswer}</span></p>}
        </section>

      </main>

      <footer className="text-center mt-12 text-gray-600">
        <p>Founder: Andy Chen | Contact: <a href="mailto:andychen89766@gmail.com" className="underline">andychen89766@gmail.com</a></p>
      </footer>
    </div>
  )
}