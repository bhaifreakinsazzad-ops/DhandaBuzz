/**
 * HubSpot CRM Integration Configuration for AI DhandaBuzz
 *
 * Pipeline: "AI DhandaBuzz Orders"
 * This config maps portal data to HubSpot CRM fields.
 * When HubSpot write access is enabled, these mappings drive the API calls.
 */

// Pipeline definition — create this pipeline in HubSpot settings
export const HUBSPOT_PIPELINE = {
  name: 'AI DhandaBuzz Orders',
  pipelineId: null, // Set after creating pipeline in HubSpot
  stages: [
    { stageId: 'submitted', label: 'Submitted', displayOrder: 0, probability: 0.1 },
    { stageId: 'review', label: 'Review', displayOrder: 1, probability: 0.2 },
    { stageId: 'processing', label: 'Processing', displayOrder: 2, probability: 0.4 },
    { stageId: 'preview_ready', label: 'Preview Ready', displayOrder: 3, probability: 0.6 },
    { stageId: 'delivered', label: 'Delivered', displayOrder: 4, probability: 0.8 },
    { stageId: 'completed', label: 'Completed', displayOrder: 5, probability: 1.0 },
  ],
}

// Map portal order status → HubSpot deal stage ID
export const STATUS_TO_STAGE = {
  'Submitted': 'submitted',
  'Review': 'review',
  'Processing': 'processing',
  'Preview Ready': 'preview_ready',
  'Delivered': 'delivered',
  'Completed': 'completed',
}

// Sync event types
export const SYNC_TYPES = {
  CONTACT_CREATE: 'contact_create',
  COMPANY_CREATE: 'company_create',
  DEAL_CREATE: 'deal_create',
  DEAL_UPDATE: 'deal_update',
}

// HubSpot API config — set your API key here when ready
export const HUBSPOT_API = {
  baseUrl: 'https://api.hubapi.com',
  apiKey: null, // Set your HubSpot private app access token
}
