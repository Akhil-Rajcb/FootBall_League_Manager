import React from 'react'

function LeagueTableTab({ teams, matches }) {
  const completedMatches = matches.filter(m => m.status === 'completed')

  if (completedMatches.length === 0) {
    return (
      <div className="tab-content active">
        <section className="league-section">
          <h2>League Table</h2>
          <p className="empty-message">No matches played yet. Play some matches to see the league table!</p>
        </section>
      </div>
    )
  }

  // Calculate standings
  const standings = teams.map(team => {
    let played = 0, wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0

    // Count matches as home team
    completedMatches.filter(m => m.homeTeamId === team.id).forEach(match => {
      played++
      goalsFor += match.homeScore || 0
      goalsAgainst += match.awayScore || 0
      if (match.homeScore > match.awayScore) wins++
      else if (match.homeScore === match.awayScore) draws++
      else losses++
    })

    // Count matches as away team
    completedMatches.filter(m => m.awayTeamId === team.id).forEach(match => {
      played++
      goalsFor += match.awayScore || 0
      goalsAgainst += match.homeScore || 0
      if (match.awayScore > match.homeScore) wins++
      else if (match.awayScore === match.homeScore) draws++
      else losses++
    })

    const goalDifference = goalsFor - goalsAgainst
    const points = wins * 3 + draws

    return {
      team,
      played,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDifference,
      points
    }
  })

  // Sort by points, then goal difference, then goals for
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    return b.goalsFor - a.goalsFor
  })

  return (
    <div className="tab-content active">
      <section className="league-section">
        <h2>League Table</h2>
        <div className="league-table-container">
          <table className="league-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index) => (
                <tr key={standing.team.id} className={index < 3 ? 'top-three' : ''}>
                  <td>{index + 1}</td>
                  <td className="team-name-cell">{standing.team.name}</td>
                  <td>{standing.played}</td>
                  <td>{standing.wins}</td>
                  <td>{standing.draws}</td>
                  <td>{standing.losses}</td>
                  <td>{standing.goalsFor}</td>
                  <td>{standing.goalsAgainst}</td>
                  <td>{standing.goalDifference >= 0 ? '+' : ''}{standing.goalDifference}</td>
                  <td><strong>{standing.points}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default LeagueTableTab

