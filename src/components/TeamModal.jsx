import React, { useState } from 'react'
import { generateId } from '../utils/storage'

function TeamModal({ team, teams, onClose, onTeamsUpdate }) {
  const [playerName, setPlayerName] = useState('')
  const [playerAge, setPlayerAge] = useState('')
  const [playerJersey, setPlayerJersey] = useState('')
  const [playerPosition, setPlayerPosition] = useState('')

  if (!team) return null

  const handleAddPlayer = (e) => {
    e.preventDefault()

    if (!playerName.trim() || !playerAge || !playerJersey || !playerPosition) {
      alert('Please fill in all fields')
      return
    }

    const updatedTeams = teams.map(t => {
      if (t.id === team.id) {
        const players = t.players || []
        
        if (players.some(p => p.jerseyNumber === parseInt(playerJersey))) {
          alert(`Jersey number ${playerJersey} is already taken in this team!`)
          return t
        }

        const newPlayer = {
          id: generateId(),
          name: playerName.trim(),
          age: parseInt(playerAge),
          jerseyNumber: parseInt(playerJersey),
          position: playerPosition,
          stats: { goals: 0, yellowCards: 0, redCards: 0, saves: 0 }
        }

        return {
          ...t,
          players: [...players, newPlayer]
        }
      }
      return t
    })

    onTeamsUpdate(updatedTeams)
    setPlayerName('')
    setPlayerAge('')
    setPlayerJersey('')
    setPlayerPosition('')
    alert(`Player "${playerName}" added successfully!`)
  }

  const handleDeletePlayer = (playerId) => {
    if (!confirm('Are you sure you want to delete this player?')) {
      return
    }

    const updatedTeams = teams.map(t => {
      if (t.id === team.id) {
        return {
          ...t,
          players: (t.players || []).filter(p => p.id !== playerId)
        }
      }
      return t
    })

    onTeamsUpdate(updatedTeams)
  }

  const players = team.players || []

  return (
    <div className="modal" style={{ display: 'block' }} onClick={(e) => e.target.className === 'modal' && onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{team.name}</h2>

        <div className="add-player-section">
          <h3>Add New Player</h3>
          <form onSubmit={handleAddPlayer}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="playerName">Player Name *</label>
                <input
                  type="text"
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  required
                  placeholder="Enter player name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="playerAge">Age *</label>
                <input
                  type="number"
                  id="playerAge"
                  value={playerAge}
                  onChange={(e) => setPlayerAge(e.target.value)}
                  required
                  min="16"
                  max="50"
                  placeholder="Age"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="playerJersey">Jersey Number *</label>
                <input
                  type="number"
                  id="playerJersey"
                  value={playerJersey}
                  onChange={(e) => setPlayerJersey(e.target.value)}
                  required
                  min="1"
                  max="99"
                  placeholder="Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="playerPosition">Position *</label>
                <select
                  id="playerPosition"
                  value={playerPosition}
                  onChange={(e) => setPlayerPosition(e.target.value)}
                  required
                >
                  <option value="">Select position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Player</button>
          </form>
        </div>

        <div className="players-section">
          <h3>Players</h3>
          {players.length === 0 ? (
            <p className="empty-message">No players yet. Add your first player above!</p>
          ) : (
            <div className="players-list">
              {players.map(player => (
                <div key={player.id} className="player-item">
                  <div className="player-info">
                    <div className="player-name">#{player.jerseyNumber} - {player.name}</div>
                    <div className="player-details">
                      <span>Age: {player.age}</span>
                      <span>Position: {player.position}</span>
                      {player.stats && player.stats.goals > 0 && (
                        <span>⚽ Goals: {player.stats.goals}</span>
                      )}
                    </div>
                  </div>
                  <div className="player-actions">
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDeletePlayer(player.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamModal

