import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { HUBSPOT_PIPELINE, HUBSPOT_API } from '../../data/hubspotConfig'
import { pushToHubSpot } from '../../services/hubspot'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'
import { FiDatabase, FiRefreshCw, FiCheck, FiAlertCircle, FiClock, FiTrash2, FiEye } from 'react-icons/fi'

const TYPE_LABELS = {
  contact_create: 'Contact',
  company_create: 'Company',
  deal_create: 'Deal (New)',
  deal_update: 'Deal (Update)',
}

const TYPE_COLORS = {
  contact_create: 'bg-blue-100 text-blue-700',
  company_create: 'bg-purple-100 text-purple-700',
  deal_create: 'bg-emerald-100 text-emerald-700',
  deal_update: 'bg-orange-100 text-orange-700',
}

const STATUS_ICONS = {
  queued: FiClock,
  synced: FiCheck,
  failed: FiAlertCircle,
}

export default function AdminCRMPage() {
  const { hubspotSync, markSyncEvent, clearSyncedEvents } = useAuth()
  const [viewPayload, setViewPayload] = useState(null)
  const [syncing, setSyncing] = useState(null)

  const events = hubspotSync || []
  const queued = events.filter(e => e.status === 'queued')
  const synced = events.filter(e => e.status === 'synced')
  const failed = events.filter(e => e.status === 'failed')

  const isApiReady = !!HUBSPOT_API.apiKey

  const handleSync = async (event) => {
    setSyncing(event.id)
    const result = await pushToHubSpot(event)
    if (result.success) {
      markSyncEvent(event.id, 'synced')
      toast.success(`Synced: ${TYPE_LABELS[event.type]}`)
    } else {
      markSyncEvent(event.id, 'failed', result.error)
      toast.error(`Sync failed: ${result.error}`)
    }
    setSyncing(null)
  }

  const handleSyncAll = async () => {
    for (const event of queued) {
      await handleSync(event)
    }
  }

  const handleMarkSynced = (eventId) => {
    markSyncEvent(eventId, 'synced')
    toast.success('Marked as synced')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">HubSpot CRM Sync</h1>
          <p className="text-gray-500 text-sm mt-1">Manage HubSpot integration and sync queue.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${isApiReady ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {isApiReady ? 'API Connected' : 'API Not Configured'}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
              <FiClock className="text-yellow-500" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-gray-900">{queued.length}</p>
              <p className="text-xs text-gray-500">Queued</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <FiCheck className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-gray-900">{synced.length}</p>
              <p className="text-xs text-gray-500">Synced</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <FiAlertCircle className="text-red-500" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-gray-900">{failed.length}</p>
              <p className="text-xs text-gray-500">Failed</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FiDatabase className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-gray-900">{events.length}</p>
              <p className="text-xs text-gray-500">Total Events</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pipeline Config Reference */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold font-heading text-gray-900 mb-3">Pipeline Configuration</h2>
        <p className="text-sm text-gray-500 mb-4">
          Create this pipeline in HubSpot: <span className="font-semibold text-gray-900">{HUBSPOT_PIPELINE.name}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {HUBSPOT_PIPELINE.stages.map((stage, i) => (
            <div key={stage.stageId} className="flex items-center gap-1">
              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                {i + 1}. {stage.label}
              </span>
              {i < HUBSPOT_PIPELINE.stages.length - 1 && (
                <span className="text-gray-300 text-xs">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {queued.length > 0 && isApiReady && (
          <Button variant="primary" size="sm" onClick={handleSyncAll}>
            <FiRefreshCw size={14} />
            Sync All Queued ({queued.length})
          </Button>
        )}
        {synced.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearSyncedEvents}>
            <FiTrash2 size={14} />
            Clear Synced
          </Button>
        )}
      </div>

      {/* Sync Queue Table */}
      <div>
        <h2 className="text-lg font-bold font-heading text-gray-900 mb-3">Sync Queue</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Time</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Source</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Key Data</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {events.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <FiDatabase className="mx-auto text-gray-300 mb-2" size={32} />
                      <p className="text-gray-400">No sync events yet.</p>
                      <p className="text-gray-400 text-xs mt-1">Events appear when users register or orders are created/updated.</p>
                    </td>
                  </tr>
                )}
                {[...events].reverse().map(event => {
                  const StatusIcon = STATUS_ICONS[event.status] || FiClock
                  const keyData = event.meta.email
                    || event.meta.businessName
                    || event.meta.orderId
                    || '—'
                  return (
                    <tr key={event.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(event.createdAt).toLocaleString('en-GB', {
                          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${TYPE_COLORS[event.type] || 'bg-gray-100 text-gray-600'}`}>
                          {TYPE_LABELS[event.type] || event.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{event.meta.source || '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-700 font-mono">{keyData}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                          event.status === 'synced' ? 'text-green-600'
                          : event.status === 'failed' ? 'text-red-500'
                          : 'text-yellow-600'
                        }`}>
                          <StatusIcon size={12} />
                          {event.status}
                        </span>
                        {event.error && (
                          <p className="text-[10px] text-red-400 mt-0.5 truncate max-w-[150px]">{event.error}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewPayload(event)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            <FiEye size={14} />
                          </button>
                          {event.status === 'queued' && isApiReady && (
                            <button
                              onClick={() => handleSync(event)}
                              disabled={syncing === event.id}
                              className="text-xs text-emerald-600 hover:underline disabled:opacity-50"
                            >
                              <FiRefreshCw size={14} className={syncing === event.id ? 'animate-spin' : ''} />
                            </button>
                          )}
                          {event.status === 'queued' && !isApiReady && (
                            <button
                              onClick={() => handleMarkSynced(event.id)}
                              className="text-xs text-gray-500 hover:underline"
                              title="Mark as manually synced"
                            >
                              <FiCheck size={14} />
                            </button>
                          )}
                          {event.status === 'failed' && (
                            <button
                              onClick={() => handleSync(event)}
                              className="text-xs text-orange-600 hover:underline"
                              title="Retry"
                            >
                              <FiRefreshCw size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Setup Guide */}
      {!isApiReady && (
        <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6">
          <h3 className="font-bold text-orange-800 mb-2">Setup Guide — Connect HubSpot API</h3>
          <ol className="text-sm text-orange-700 space-y-2 list-decimal list-inside">
            <li>Go to HubSpot → Settings → Integrations → Private Apps</li>
            <li>Create a new Private App with scopes: <code className="bg-orange-100 px-1.5 py-0.5 rounded text-xs">crm.objects.contacts.write</code>, <code className="bg-orange-100 px-1.5 py-0.5 rounded text-xs">crm.objects.companies.write</code>, <code className="bg-orange-100 px-1.5 py-0.5 rounded text-xs">crm.objects.deals.write</code></li>
            <li>Copy the Access Token</li>
            <li>Set it in <code className="bg-orange-100 px-1.5 py-0.5 rounded text-xs">src/data/hubspotConfig.js</code> → <code className="bg-orange-100 px-1.5 py-0.5 rounded text-xs">HUBSPOT_API.apiKey</code></li>
            <li>Create pipeline &quot;{HUBSPOT_PIPELINE.name}&quot; in HubSpot with the stages shown above</li>
            <li>Set the pipeline ID in <code className="bg-orange-100 px-1.5 py-0.5 rounded text-xs">HUBSPOT_PIPELINE.pipelineId</code></li>
          </ol>
        </div>
      )}

      {/* Payload Viewer Modal */}
      <Modal isOpen={!!viewPayload} onClose={() => setViewPayload(null)} title="HubSpot API Payload">
        {viewPayload && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${TYPE_COLORS[viewPayload.type]}`}>
                {TYPE_LABELS[viewPayload.type]}
              </span>
              <span className="text-xs text-gray-400">{viewPayload.id}</span>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 overflow-auto max-h-64">
              <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                {JSON.stringify(viewPayload.payload, null, 2)}
              </pre>
            </div>
            <div className="text-xs text-gray-500">
              <p>Created: {new Date(viewPayload.createdAt).toLocaleString()}</p>
              {viewPayload.syncedAt && <p>Synced: {new Date(viewPayload.syncedAt).toLocaleString()}</p>}
              {viewPayload.error && <p className="text-red-500">Error: {viewPayload.error}</p>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
