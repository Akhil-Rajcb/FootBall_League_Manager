import React, { useState, useEffect } from 'react'
import TeamsTab from './components/TeamsTab'
import MatchesTab from './components/MatchesTab'
import LeagueTableTab from './components/LeagueTableTab'
import StatisticsTab from './components/StatisticsTab'
import TeamModal from './components/TeamModal'
import MatchModal from './components/MatchModal'
import { getTeams, saveTeams, getMatches, saveMatches } from './utils/storage'

function App() {
  const [activeTab, setActiveTab] = useState('teams')
  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedMatch, setSelectedMatch] = useState(null)

  // Load data on mount
  useEffect(() => {
    setTeams(getTeams())
    setMatches(getMatches())
  }, [])

  // Save teams when they change
  useEffect(() => {
    if (teams.length > 0 || localStorage.getItem('footballLeagueData')) {
      saveTeams(teams)
    }
  }, [teams])

  // Save matches when they change
  useEffect(() => {
    if (matches.length > 0 || localStorage.getItem('footballLeagueMatches')) {
      saveMatches(matches)
    }
  }, [matches])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleTeamUpdate = (updatedTeams) => {
    setTeams(updatedTeams)
  }

  const handleMatchUpdate = (updatedMatches) => {
    setMatches(updatedMatches)
  }

  return (
    <div className="container">
      <header>
        <h1>Football League Manager</h1>
      </header>

      <nav className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => handleTabChange('teams')}
        >
          Teams
        </button>
        <button 
          className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => handleTabChange('matches')}
        >
          Matches
        </button>
        <button 
          className={`tab-btn ${activeTab === 'league' ? 'active' : ''}`}
          onClick={() => handleTabChange('league')}
        >
          League Table
        </button>
        <button 
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => handleTabChange('stats')}
        >
          Statistics
        </button>
      </nav>

      {activeTab === 'teams' && (
        <TeamsTab 
          teams={teams} 
          onTeamsUpdate={handleTeamUpdate}
          onOpenTeam={(team) => setSelectedTeam(team)}
        />
      )}

      {activeTab === 'matches' && (
        <MatchesTab 
          teams={teams}
          matches={matches}
          onMatchesUpdate={handleMatchUpdate}
          onOpenMatch={(match) => setSelectedMatch(match)}
        />
      )}

      {activeTab === 'league' && (
        <LeagueTableTab teams={teams} matches={matches} />
      )}

      {activeTab === 'stats' && (
        <StatisticsTab teams={teams} />
      )}

      {selectedTeam && (
        <TeamModal 
          team={selectedTeam}
          teams={teams}
          onClose={() => setSelectedTeam(null)}
          onTeamsUpdate={handleTeamUpdate}
        />
      )}

      {selectedMatch && (
        <MatchModal 
          match={selectedMatch}
          teams={teams}
          onClose={() => setSelectedMatch(null)}
          onMatchesUpdate={handleMatchUpdate}
          onTeamsUpdate={handleTeamUpdate}
        />
      )}
    </div>
  )
}

export default App

