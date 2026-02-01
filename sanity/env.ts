export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset = 
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === 'your_project_id_here') {
    // In development, we might not want to crash immediately if the project ID is just the placeholder
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Sanity] ${errorMessage}. Please update your .env.local file.`);
      return (v || '') as T;
    }
    throw new Error(errorMessage)
  }
  return v
}
