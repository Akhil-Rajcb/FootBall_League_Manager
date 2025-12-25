import React, { useState, useEffect } from 'react'
import { generateId } from '../utils/storage'

function MatchesTab({ teams, matches, onMatchesUpdate, onOpenMatch }) {
  const [homeTeamId, setHomeTeamId] = useState('')
  const [awayTeamId, setAwayTeamId] = useState('')
  const [matchDate, setMatchDate] = useState('')
  const [matchTime, setMatchTime] = useState('')

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setMatchDate(today)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!homeTeamId || !awayTeamId || !matchDate || !matchTime) {
      alert('Please fill in all fields')
      return
    }

    if (homeTeamId === awayTeamId) {
      alert('Home team and away team cannot be the same!')
      return
    }

    const newMatch = {
      id: generateId(),
      homeTeamId,
      awayTeamId,
      date: matchDate,
      time: matchTime,
      homeScore: 0,
      awayScore: 0,
      status: 'scheduled',
      events: {
        goals: [],
        yellowCards: [],
        redCards: [],
        saves: []
      }
    }

    onMatchesUpdate([...matches, newMatch])
    setHomeTeamId('')
    setAwayTeamId('')
    alert('Match scheduled successfully!')
  }

  const sortedMatches = [...matches].sort((a, b) => {
    const dateA = new Date(a.date + 'T' + a.time)
    const dateB = new Date(b.date + 'T' + b.time)
    return dateB - dateA
  })

  return (
    <div className="tab-content active">
      <section className="add-match-section">
        <h2>Schedule New Match</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="homeTeam">Home Team *</label>
              <select
                id="homeTeam"
                value={homeTeamId}
                onChange={(e) => setHomeTeamId(e.target.value)}
                required
              >
                <option value="">Select home team</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="awayTeam">Away Team *</label>
              <select
                id="awayTeam"
                value={awayTeamId}
                onChange={(e) => setAwayTeamId(e.target.value)}
                required
              >
                <option value="">Select away team</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="matchDate">Match Date *</label>
              <input
                type="date"
                id="matchDate"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="matchTime">Match Time *</label>
              <input
                type="time"
                id="matchTime"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Schedule Match</button>
        </form>
      </section>

      <section className="matches-section">
        <h2>Matches</h2>
        {sortedMatches.length === 0 ? (
          <p className="empty-message">No matches scheduled yet. Schedule your first match above!</p>
        ) : (
          <div className="matches-list">
            {sortedMatches.map(match => {
              const homeTeam = teams.find(t => t.id === match.homeTeamId)
              const awayTeam = teams.find(t => t.id === match.awayTeamId)
              
              if (!homeTeam || !awayTeam) return null

              const matchDate = new Date(match.date + 'T' + match.time)
              const isCompleted = match.status === 'completed'
              const homeScore = match.homeScore || 0
              const awayScore = match.awayScore || 0

              return (
                <div key={match.id} className="match-item">
                  <div className="match-info">
                    <div className="match-teams">
                      <div>{homeTeam.name}</div>
                      <div className="match-score">
                        {isCompleted ? `${homeScore} - ${awayScore}` : 'vs'}
                      </div>
                      <div>{awayTeam.name}</div>
                    </div>
                    <div className="match-date">
                      {matchDate.toLocaleDateString()} at {matchDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                  <div>
                    <span className={`match-status ${match.status}`}>
                      {match.status === 'completed' ? 'Completed' : 'Scheduled'}
                    </span>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => onOpenMatch(match)}
                      style={{ marginLeft: '10px' }}
                    >
                      {isCompleted ? 'Update' : 'Enter Score'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default MatchesTab

