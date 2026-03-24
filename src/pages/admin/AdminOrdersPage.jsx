import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { ORDER_STATUSES } from '../../data/constants'
import StatusBadge from '../../components/orders/StatusBadge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

export default function AdminOrdersPage() {
  const { orders, adminUpdateOrderStatus, adminSetOrderUrls, adminAddOrderNote } = useAuth()
  const [filterStatus, setFilterStatus] = useState('')
  const [editOrder, setEditOrder] = useState(null)
  const [notesOrder, setNotesOrder] = useState(null)
  const [form, setForm] = useState({ status: '', previewUrl: '', downloadUrl: '', note: '' })
  const [noteText, setNoteText] = useState('')
  const [saving, setSaving] = useState(false)

  const filtered = filterStatus ? orders.filter(o => o.status === filterStatus) : orders

  const openEdit = (order) => {
    setEditOrder(order)
    setForm({
      status: order.status,
      previewUrl: order.previewUrl || '',
      downloadUrl: order.downloadUrl || '',
      note: '',
    })
  }

  const handleUpdate = async () => {
    setSaving(true)
    try {
      if (form.status !== editOrder.status) {
        await adminUpdateOrderStatus(editOrder.id, form.status, form.note)
      }
      const urls = {}
      if (form.previewUrl !== (editOrder.previewUrl || '')) urls.previewUrl = form.previewUrl
      if (form.downloadUrl !== (editOrder.downloadUrl || '')) urls.downloadUrl = form.downloadUrl
      if (Object.keys(urls).length > 0) await adminSetOrderUrls(editOrder.id, urls)
      toast.success(`Order ${editOrder.id} updated`)
      setEditOrder(null)
    } catch {
      toast.error('Update failed. Try again.')
    }
    setSaving(false)
  }

  const handleAddNote = async () => {
    if (!noteText.trim()) return
    setSaving(true)
    try {
      await adminAddOrderNote(notesOrder.id, noteText.trim())
      toast.success('Note added')
      setNoteText('')
    } catch {
      toast.error('Failed to add note.')
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-gray-900">Orders Management</h1>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus('')}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
            !filterStatus ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          All ({orders.length})
        </button>
        {ORDER_STATUSES.map(status => {
          const count = orders.filter(o => o.status === status).length
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                filterStatus === status ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status} ({count})
            </button>
          )
        })}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Order ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Business</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Service</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Cost</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Rev.</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Notes</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{order.id}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 truncate max-w-[100px]">{order.businessName || '—'}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{order.service}</td>
                  <td className="px-4 py-3 text-gray-700 truncate max-w-[160px]">{order.title}</td>
                  <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-3 font-semibold text-brand-accent whitespace-nowrap">{order.maalCost} M</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {(order.revisions || []).length}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => { setNotesOrder(order); setNoteText('') }}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {(order.adminNotes || []).length || 'Add'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEdit(order)}
                      className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-gray-400">No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      <Modal isOpen={!!editOrder} onClose={() => setEditOrder(null)} title={`Update ${editOrder?.id}`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
            >
              {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Preview URL</label>
            <input
              type="text"
              value={form.previewUrl}
              onChange={e => setForm(f => ({ ...f, previewUrl: e.target.value }))}
              placeholder="https://... or /previews/filename.jpg"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Download URL</label>
            <input
              type="text"
              value={form.downloadUrl}
              onChange={e => setForm(f => ({ ...f, downloadUrl: e.target.value }))}
              placeholder="https://... or /downloads/filename.zip"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Timeline Note</label>
            <input
              type="text"
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              placeholder="Optional note for status change"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            />
          </div>
          <Button onClick={handleUpdate} className="w-full" variant="dark" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Modal>

      {/* Notes Modal */}
      <Modal isOpen={!!notesOrder} onClose={() => setNotesOrder(null)} title={`Notes — ${notesOrder?.id}`}>
        <div className="space-y-4">
          {(notesOrder?.adminNotes || []).length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {notesOrder.adminNotes.map((note, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-sm text-gray-700">{note.text}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{new Date(note.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">No notes yet</p>
          )}
          <div>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Add internal note..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            />
          </div>
          <Button onClick={handleAddNote} className="w-full" variant="dark" disabled={!noteText.trim() || saving}>
            {saving ? 'Adding...' : 'Add Note'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
