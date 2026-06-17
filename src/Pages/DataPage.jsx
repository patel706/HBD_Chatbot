import { useState } from 'react'
import { Search, Filter, Download } from 'lucide-react'

export default function DataPage() {
  // Mock data representing your businesses.db or CSV listings
  const [data] = useState([
    { id: 1, name: "Honeybee Digital", category: "Marketing", status: "Healthy", phone: "98xxxxxxx" },
    { id: 2, name: "Tech Solutions", category: "Software", status: "At Risk", phone: "97xxxxxxx" },
    { id: 3, name: "Global Retail", category: "E-commerce", status: "Healthy", phone: "95xxxxxxx" },
  ])

  return (
    <div className="p-6 md:p-10 space-y-6 overflow-y-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Business Intelligence</h2>
          <p className="text-zinc-400">View and manage extracted listings from SQL and CSV sources.</p>
        </div>
        <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors">
          <Download size={18} /> Export
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <div className="text-zinc-500 text-sm">Total Listings</div>
          <div className="text-2xl font-mono">1,240</div>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <div className="text-zinc-500 text-sm">Active Queries</div>
          <div className="text-2xl font-mono text-blue-400">14</div>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <div className="text-zinc-500 text-sm">DB Health</div>
          <div className="text-2xl font-mono text-green-400">98%</div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-800/50 text-zinc-400 text-sm uppercase">
              <th className="p-4 font-medium">Business Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="p-4 font-medium text-zinc-200">{item.name}</td>
                <td className="p-4 text-zinc-400">{item.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    item.status === 'Healthy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right text-zinc-500 font-mono">{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}