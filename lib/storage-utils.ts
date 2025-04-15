/**
 * Utilitário para operações seguras com localStorage
 */

export const storageUtils = {
  /**
   * Obtém um item do localStorage de forma segura
   */
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key)
      }
      return null
    } catch (error) {
      console.error(`Erro ao obter item ${key} do localStorage:`, error)
      return null
    }
  },

  /**
   * Define um item no localStorage de forma segura
   */
  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value)
        return true
      }
      return false
    } catch (error) {
      console.error(`Erro ao definir item ${key} no localStorage:`, error)
      return false
    }
  },

  /**
   * Remove um item do localStorage de forma segura
   */
  removeItem: (key: string): boolean => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key)
        return true
      }
      return false
    } catch (error) {
      console.error(`Erro ao remover item ${key} do localStorage:`, error)
      return false
    }
  },

  /**
   * Obtém um objeto do localStorage de forma segura
   */
  getObject: <T>(key: string): T | null => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      }
      return null
    } catch (error) {
      console.error(`Erro ao obter objeto ${key} do localStorage:`, error)
      return null
    }
  },

  /**
   * Define um objeto no localStorage de forma segura
   */
  setObject: <T>(key: string, value: T): boolean => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value))
        return true
      }
      return false
    } catch (error) {
      console.error(`Erro ao definir objeto ${key} no localStorage:`, error)
      return false
    }
  }
}
