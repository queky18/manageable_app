import React, { Component } from 'react';

import utils from './../../utils';

class ReviewVotingTab extends Component {
    constructor(props) {
        super(props);

        const membersWithVotes = this.props.members.map(member => {
            // Copy all the member object properties and also add a vote property
            return {...member, vote: 0};
        });

        this.state = {
            members: membersWithVotes,
            voteResult: 0
        }

        this.changeMemberVote = this.changeMemberVote.bind(this);
        this.vote = this.vote.bind(this);
    }

    changeMemberVote(e) {
        const memberIndex = parseInt(e.target.dataset.index, 10);
        const vote = parseFloat(e.target.value);

        this.setState({
            members: this.state.members.map((member, index) => {
                if (memberIndex === index) {
                    return {...member, vote: vote}
                } else {
                    return member;
                }
            })
        });
    }

    vote() {
        this.setState({
            voteResult: utils.weightedAverage(this.state.members, this.props.totalValuePoints)
        });
    }

    render () {
        return (
            <div className="review-voting-tab">
                <ul className="review-voting-tab__members-list">
                    {this.state.members.map((member, index) => (
                        <li key={member._id} className="review-voting-tab__members-list__item">
                            <span className="review-voting-tab__members-list__name">{member.name}</span>
                            <input type="number"
                                   min="0.0"
                                   max="1.0"
                                   step="0.1"
                                   name="vote"
                                   data-index={index}
                                   onChange={this.changeMemberVote} />
                        </li>
                    ))}
                </ul>
                <div className="review-voting-tab__action-bar">
                    <span className="review-voting-tab__total-score">
                        <label>Result:</label>
                        <span>{this.state.voteResult}</span>
                    </span>
                    <button onClick={this.vote}>Vote</button>
                </div>
            </div>
        );
    }
}

export default ReviewVotingTab;