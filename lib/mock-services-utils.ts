// Helper functions for mock services
import { v4 as uuidv4 } from "uuid"

// Create a safe version of uuid that works in both client and server environments
export function generateId(): string {
  try {
    return uuidv4()
  } catch (error) {
    // Fallback for environments where crypto might not be available
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}

// Simulate API delay with a configurable timeout
export async function simulateApiDelay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
