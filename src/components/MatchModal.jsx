import React, { useState } from 'react'

function MatchModal({ match, teams, onClose, onMatchesUpdate, onTeamsUpdate }) {
  const [homeScore, setHomeScore] = useState(match.homeScore || 0)
  const [awayScore, setAwayScore] = useState(match.awayScore || 0)
  const [events, setEvents] = useState(match.events || {
    goals: [],
    yellowCards: [],
    redCards: [],
    saves: []
  })

  const homeTeam = teams.find(t => t.id === match.homeTeamId)
  const awayTeam = teams.find(t => t.id === match.awayTeamId)

  if (!homeTeam || !awayTeam) return null

  const handleAddEvent = (eventType) => {
    const newEvent = {
      playerId: '',
      teamId: match.homeTeamId
    }
    setEvents({
      ...events,
      [eventType]: [...(events[eventType] || []), newEvent]
    })
  }

  const handleRemoveEvent = (eventType, index) => {
    const updatedEvents = [...(events[eventType] || [])]
    updatedEvents.splice(index, 1)
    setEvents({
      ...events,
      [eventType]: updatedEvents
    })
  }

  const handleUpdateEventPlayer = (eventType, index, playerId, teamId) => {
    const updatedEvents = [...(events[eventType] || [])]
    updatedEvents[index] = { playerId, teamId }
    setEvents({
      ...events,
      [eventType]: updatedEvents
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const allMatches = JSON.parse(localStorage.getItem('footballLeagueMatches') || '[]')
    const updatedMatches = allMatches.map(m => {
      if (m.id === match.id) {
        return {
          ...m,
          homeScore: parseInt(homeScore) || 0,
          awayScore: parseInt(awayScore) || 0,
          status: 'completed',
          events
        }
      }
      return m
    })

    // Update player statistics
    const updatedTeams = teams.map(team => {
      const updatedPlayers = (team.players || []).map(player => {
        const stats = { ...(player.stats || { goals: 0, yellowCards: 0, redCards: 0, saves: 0 }) }

        // Count goals
        const goals = (events.goals || []).filter(g => g.playerId === player.id && g.teamId === team.id).length
        stats.goals += goals

        // Count yellow cards
        const yellowCards = (events.yellowCards || []).filter(c => c.playerId === player.id && c.teamId === team.id).length
        stats.yellowCards += yellowCards

        // Count red cards
        const redCards = (events.redCards || []).filter(c => c.playerId === player.id && c.teamId === team.id).length
        stats.redCards += redCards

        // Count saves (only for goalkeepers)
        if (player.position === 'Goalkeeper') {
          const saves = (events.saves || []).filter(s => s.playerId === player.id && s.teamId === team.id).length
          stats.saves += saves
        }

        return {
          ...player,
          stats
        }
      })

      return {
        ...team,
        players: updatedPlayers
      }
    })

    localStorage.setItem('footballLeagueMatches', JSON.stringify(updatedMatches))
    localStorage.setItem('footballLeagueData', JSON.stringify(updatedTeams))
    onMatchesUpdate(updatedMatches)
    onTeamsUpdate(updatedTeams)
    onClose()
    alert('Match score updated successfully!')
  }

  const getTeamPlayers = (teamId) => {
    const team = teams.find(t => t.id === teamId)
    return team?.players || []
  }

  const getTeamGoalkeepers = (teamId) => {
    return getTeamPlayers(teamId).filter(p => p.position === 'Goalkeeper')
  }

  return (
    <div className="modal" style={{ display: 'block' }} onClick={(e) => e.target.className === 'modal' && onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{homeTeam.name} vs {awayTeam.name}</h2>

        <form onSubmit={handleSubmit}>
          <div className="score-input-section">
            <div className="team-score">
              <label>{homeTeam.name}</label>
              <input
                type="number"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                min="0"
                required
              />
            </div>
            <div className="score-separator">-</div>
            <div className="team-score">
              <label>{awayTeam.name}</label>
              <input
                type="number"
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
                min="0"
                required
              />
            </div>
          </div>

          <h3>Match Events</h3>

          {/* Goals Section */}
          <div className="events-section">
            <h4>Goals</h4>
            <div className="events-list">
              {(events.goals || []).map((goal, index) => (
                <div key={index} className="event-item">
                  <select
                    value={goal.teamId}
                    onChange={(e) => handleUpdateEventPlayer('goals', index, goal.playerId, e.target.value)}
                  >
                    <option value={match.homeTeamId}>{homeTeam.name}</option>
                    <option value={match.awayTeamId}>{awayTeam.name}</option>
                  </select>
                  <select
                    value={goal.playerId}
                    onChange={(e) => handleUpdateEventPlayer('goals', index, e.target.value, goal.teamId)}
                  >
                    <option value="">Select player</option>
                    {getTeamPlayers(goal.teamId).map(player => (
                      <option key={player.id} value={player.id}>
                        #{player.jerseyNumber} - {player.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveEvent('goals', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleAddEvent('goals')}
            >
              + Add Goal
            </button>
          </div>

          {/* Yellow Cards Section */}
          <div className="events-section">
            <h4>Yellow Cards</h4>
            <div className="events-list">
              {(events.yellowCards || []).map((card, index) => (
                <div key={index} className="event-item">
                  <select
                    value={card.teamId}
                    onChange={(e) => handleUpdateEventPlayer('yellowCards', index, card.playerId, e.target.value)}
                  >
                    <option value={match.homeTeamId}>{homeTeam.name}</option>
                    <option value={match.awayTeamId}>{awayTeam.name}</option>
                  </select>
                  <select
                    value={card.playerId}
                    onChange={(e) => handleUpdateEventPlayer('yellowCards', index, e.target.value, card.teamId)}
                  >
                    <option value="">Select player</option>
                    {getTeamPlayers(card.teamId).map(player => (
                      <option key={player.id} value={player.id}>
                        #{player.jerseyNumber} - {player.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveEvent('yellowCards', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleAddEvent('yellowCards')}
            >
              + Add Yellow Card
            </button>
          </div>

          {/* Red Cards Section */}
          <div className="events-section">
            <h4>Red Cards</h4>
            <div className="events-list">
              {(events.redCards || []).map((card, index) => (
                <div key={index} className="event-item">
                  <select
                    value={card.teamId}
                    onChange={(e) => handleUpdateEventPlayer('redCards', index, card.playerId, e.target.value)}
                  >
                    <option value={match.homeTeamId}>{homeTeam.name}</option>
                    <option value={match.awayTeamId}>{awayTeam.name}</option>
                  </select>
                  <select
                    value={card.playerId}
                    onChange={(e) => handleUpdateEventPlayer('redCards', index, e.target.value, card.teamId)}
                  >
                    <option value="">Select player</option>
                    {getTeamPlayers(card.teamId).map(player => (
                      <option key={player.id} value={player.id}>
                        #{player.jerseyNumber} - {player.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveEvent('redCards', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleAddEvent('redCards')}
            >
              + Add Red Card
            </button>
          </div>

          {/* Saves Section */}
          <div className="events-section">
            <h4>Goalkeeper Saves</h4>
            <div className="events-list">
              {(events.saves || []).map((save, index) => (
                <div key={index} className="event-item">
                  <select
                    value={save.teamId}
                    onChange={(e) => handleUpdateEventPlayer('saves', index, save.playerId, e.target.value)}
                  >
                    <option value={match.homeTeamId}>{homeTeam.name}</option>
                    <option value={match.awayTeamId}>{awayTeam.name}</option>
                  </select>
                  <select
                    value={save.playerId}
                    onChange={(e) => handleUpdateEventPlayer('saves', index, e.target.value, save.teamId)}
                  >
                    <option value="">Select goalkeeper</option>
                    {getTeamGoalkeepers(save.teamId).map(player => (
                      <option key={player.id} value={player.id}>
                        #{player.jerseyNumber} - {player.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveEvent('saves', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleAddEvent('saves')}
            >
              + Add Save
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Update Score</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MatchModal

