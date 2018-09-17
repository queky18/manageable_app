import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from './config';
import './App.css';

import MembersTab from './pages/MembersTab/MembersTab';
import TaskValueVotingTab from './pages/TaskValueVotingTab/TaskValueVotingTab';
import ReviewVotingTab from './pages/ReviewVotingTab/ReviewVotingTab';
import DecisionVotingTab from './pages/DecisionVotingTab/DecisionVotingTab';

const headerTitles = {
  'members': 'Members',
  'task-voting-tab': 'Task Value Voting',
  'review-voting-tab': 'Review Voting',
  'decision-voting-tab': 'Decision Voting'
}

let totalValuePoints = 0;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'members',
      members: []
    };

    this.changeTab = this.changeTab.bind(this);
    this.updateStateMembers = this.updateStateMembers.bind(this);
  }

  componentWillMount() {
    axios.get(API_URL + '/members')
        .then(response => {
          const members = response.data;
          this.setState({ members: members });

          // Calculate the total value points
          members.forEach(member => { totalValuePoints += member.valuePoints; });
        })
        .catch(error => console.log(error));
  }

  changeTab(e) {
    this.setState({activeTab: e.target.value});
  }

  updateStateMembers(updatedMembers) {
    this.setState({ members: updatedMembers });
  }

  render() {
    return (
      <div className="manageable">
        <header className="manageable__header">
          <h1 className="manageable__">Manageable App - Meritocracy Implemented</h1>
          <h2>{headerTitles[this.state.activeTab]}</h2>
        </header>
        <div className="manageable__container">
          {this.state.activeTab === 'members' ? <MembersTab members={this.state.members}
                                                            updateStateMembers={this.updateStateMembers} /> : null}
          {this.state.activeTab === 'task-voting-tab' ? <TaskValueVotingTab members={this.state.members}
                                                                            totalValuePoints={totalValuePoints} /> : null}
          {this.state.activeTab === 'review-voting-tab' ? <ReviewVotingTab members={this.state.members}
                                                                           totalValuePoints={totalValuePoints} /> : null}
          {this.state.activeTab === 'decision-voting-tab' ? <DecisionVotingTab members={this.state.members} /> : null}
        </div>
        <footer>
          <ul className="manageable__tabs">
            <li><button value="members" onClick={this.changeTab}>Members</button></li>
            <li><button value="task-voting-tab" onClick={this.changeTab}>Task Value Voting</button></li>
            <li><button value="review-voting-tab" onClick={this.changeTab}>Review Voting</button></li>
            <li><button value="decision-voting-tab" onClick={this.changeTab}>Decision Voting</button></li>
          </ul>
        </footer>
      </div>
    );
  }
}

export default App;
