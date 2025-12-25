import React, { useState } from 'react'
import { generateId } from '../utils/storage'

function TeamsTab({ teams, onTeamsUpdate, onOpenTeam }) {
  const [teamName, setTeamName] = useState('')
  const [teamLogo, setTeamLogo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!teamName.trim()) {
      alert('Please enter a team name')
      return
    }

    if (teams.some(team => team.name.toLowerCase() === teamName.toLowerCase())) {
      alert('A team with this name already exists!')
      return
    }

    const newTeam = {
      id: generateId(),
      name: teamName.trim(),
      logo: teamLogo.trim() || '',
      players: []
    }

    onTeamsUpdate([...teams, newTeam])
    setTeamName('')
    setTeamLogo('')
    alert(`Team "${newTeam.name}" added successfully!`)
  }

  const handleDelete = (teamId) => {
    if (!confirm('Are you sure you want to delete this team? All players will also be deleted.')) {
      return
    }

    const team = teams.find(t => t.id === teamId)
    if (!team) return

    const updatedTeams = teams.filter(t => t.id !== teamId)
    onTeamsUpdate(updatedTeams)
    alert(`Team "${team.name}" deleted successfully!`)
  }

  return (
    <div className="tab-content active">
      <section className="add-team-section">
        <h2>Add New Team</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="teamName">Team Name *</label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              placeholder="Enter team name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamLogo">Team Logo URL (Optional)</label>
            <input
              type="url"
              id="teamLogo"
              value={teamLogo}
              onChange={(e) => setTeamLogo(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Team</button>
        </form>
      </section>

      <section className="teams-section">
        <h2>Teams</h2>
        {teams.length === 0 ? (
          <p className="empty-message">No teams yet. Add your first team above!</p>
        ) : (
          <div className="teams-grid">
            {teams.map(team => (
              <div key={team.id} className="team-card">
                {team.logo ? (
                  <img 
                    src={team.logo} 
                    alt={team.name} 
                    className="team-logo"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div 
                  className="team-logo-placeholder"
                  style={{ display: team.logo ? 'none' : 'flex' }}
                >
                  {team.name.charAt(0)}
                </div>
                <div className="team-name">{team.name}</div>
                <div className="team-actions">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => onOpenTeam(team)}
                  >
                    View Team
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(team.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default TeamsTab

