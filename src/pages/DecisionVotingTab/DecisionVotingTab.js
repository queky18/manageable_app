import React, { Component } from 'react';

class DecisionVotingTab extends Component {
    constructor(props) {
        super(props);

        const membersWithVotes = this.props.members.map(member => {
            // Copy all the member object properties and also add a vote property
            return {...member, vote: 0};
        });

        this.state = {
            members: membersWithVotes,
            voteResult: null
        }

        this.changeMemberVote = this.changeMemberVote.bind(this);
        this.vote = this.vote.bind(this);
    }

    changeMemberVote(e) {
        const memberVote = e.target.checked ? 1 : 0;
        const memberIndex = parseInt(e.target.dataset.index, 10);

        this.setState({
            members: this.state.members.map((member, index) => {
                if (memberIndex === index) {
                    return {...member, vote: memberVote}
                } else {
                    return member;
                }
            })
        });
    }

    vote() {
        let yesSum = 0;
        let noSum = 0;

        for (let i = 0; i < this.state.members.length; i++) {
            const member = this.state.members[i];
            if (member.vote === 1) {
                yesSum += member.valuePoints;
            } else {
                noSum += member.valuePoints;
            }
        }

        this.setState({  voteResult: yesSum > noSum ? 'Accept' : 'Reject' });
    }

    render () {
        return (
            <div className="decision-voting-tab">
                <ul className="decision-voting-tab__members-list">
                    {this.props.members.map((member, index) => (
                        <li key={member._id} className="decision-voting-tab__members-list__item">
                            <span className="decision-voting-tab__members-list__name">{member.name}</span>
                            <input type="checkbox" data-index={index} onChange={this.changeMemberVote} />
                        </li>
                    ))}
                </ul>
                <div className="decision-voting-tab__action-bar">
                    <span className="decision-voting-tab__total-score">
                        <label>Result:</label>
                        <span>{this.state.voteResult}</span>
                    </span>
                    <button onClick={this.vote}>Vote</button>
                </div>
            </div>
        );
    }
}

export default DecisionVotingTab;