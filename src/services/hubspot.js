/**
 * HubSpot Integration Service for AI DhandaBuzz
 *
 * Builds HubSpot-ready API payloads for contacts, companies, and deals.
 * When HUBSPOT_API.apiKey is set, pushToHubSpot() sends data via REST API.
 * Until then, payloads are queued in the sync log for manual review.
 */

import { STATUS_TO_STAGE, HUBSPOT_PIPELINE, SYNC_TYPES, HUBSPOT_API } from '../data/hubspotConfig'

// ─── Payload Builders ───────────────────────────────────────────────

/**
 * Build HubSpot Contact payload from portal user data
 */
export function buildContactPayload(user) {
  return {
    properties: {
      email: user.email,
      firstname: user.name?.split(' ')[0] || user.name || '',
      lastname: user.name?.split(' ').slice(1).join(' ') || '',
      phone: user.phone || '',
      company: user.businessName || '',
      lifecyclestage: 'customer',
    },
  }
}

/**
 * Build HubSpot Company payload from portal user data
 */
export function buildCompanyPayload(user) {
  return {
    properties: {
      name: user.businessName || user.name || '',
      phone: user.phone || '',
      description: `AI DhandaBuzz client — ${user.businessName || user.name}`,
    },
  }
}

/**
 * Build HubSpot Deal payload from portal order data
 */
export function buildDealPayload(order, user) {
  const stage = STATUS_TO_STAGE[order.status] || 'submitted'
  return {
    properties: {
      dealname: `${order.id} — ${order.title}`,
      pipeline: HUBSPOT_PIPELINE.pipelineId || 'default',
      dealstage: stage,
      amount: String(order.maalCost || 0),
      description: [
        `Order ID: ${order.id}`,
        `Service: ${order.service}`,
        `Status: ${order.status}`,
        `Date: ${order.date}`,
        `Maal Cost: ${order.maalCost}`,
        user ? `Client: ${user.businessName || user.name} (${user.email})` : '',
        order.revisions?.length ? `Revisions: ${order.revisions.length}` : '',
      ].filter(Boolean).join('\n'),
    },
  }
}

/**
 * Build HubSpot Deal update payload (status change)
 */
export function buildDealUpdatePayload(order, note) {
  const stage = STATUS_TO_STAGE[order.status] || 'submitted'
  return {
    properties: {
      dealstage: stage,
      description: [
        `Order ID: ${order.id}`,
        `Service: ${order.service}`,
        `Status: ${order.status}`,
        `Date: ${order.date}`,
        `Maal Cost: ${order.maalCost}`,
        note ? `Note: ${note}` : '',
        order.revisions?.length ? `Revisions: ${order.revisions.length}` : '',
      ].filter(Boolean).join('\n'),
    },
  }
}

// ─── Sync Event Builder ─────────────────────────────────────────────

/**
 * Create a sync queue event
 */
export function createSyncEvent(type, payload, meta = {}) {
  return {
    id: `SYNC-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    payload,
    meta,
    status: 'queued', // queued | synced | failed
    createdAt: new Date().toISOString(),
    syncedAt: null,
    error: null,
  }
}

// ─── API Push (when API key is configured) ──────────────────────────

/**
 * Attempt to push a sync event to HubSpot via REST API.
 * Returns { success, error } — fails gracefully if no API key.
 */
export async function pushToHubSpot(syncEvent) {
  if (!HUBSPOT_API.apiKey) {
    return { success: false, error: 'API key not configured' }
  }

  const endpointMap = {
    [SYNC_TYPES.CONTACT_CREATE]: '/crm/v3/objects/contacts',
    [SYNC_TYPES.COMPANY_CREATE]: '/crm/v3/objects/companies',
    [SYNC_TYPES.DEAL_CREATE]: '/crm/v3/objects/deals',
    [SYNC_TYPES.DEAL_UPDATE]: null, // needs deal ID
  }

  const endpoint = endpointMap[syncEvent.type]
  if (!endpoint && syncEvent.type !== SYNC_TYPES.DEAL_UPDATE) {
    return { success: false, error: `Unknown sync type: ${syncEvent.type}` }
  }

  try {
    const url = syncEvent.type === SYNC_TYPES.DEAL_UPDATE
      ? `${HUBSPOT_API.baseUrl}/crm/v3/objects/deals/${syncEvent.meta.hubspotDealId}`
      : `${HUBSPOT_API.baseUrl}${endpoint}`

    const method = syncEvent.type === SYNC_TYPES.DEAL_UPDATE ? 'PATCH' : 'POST'

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API.apiKey}`,
      },
      body: JSON.stringify(syncEvent.payload),
    })

    if (!response.ok) {
      const errBody = await response.text()
      return { success: false, error: `HTTP ${response.status}: ${errBody}` }
    }

    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
