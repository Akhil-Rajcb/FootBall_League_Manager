// Storage keys
const STORAGE_KEY = 'footballLeagueData'
const MATCHES_KEY = 'footballLeagueMatches'

/**
 * Get all teams from localStorage
 */
export function getTeams() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

/**
 * Save teams array to localStorage
 */
export function saveTeams(teams) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams))
}

/**
 * Get all matches from localStorage
 */
export function getMatches() {
  const data = localStorage.getItem(MATCHES_KEY)
  return data ? JSON.parse(data) : []
}

/**
 * Save matches array to localStorage
 */
export function saveMatches(matches) {
  localStorage.setItem(MATCHES_KEY, JSON.stringify(matches))
}

/**
 * Generate a unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

