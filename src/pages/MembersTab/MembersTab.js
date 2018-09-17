import React, {Component} from 'react';
import axios from 'axios';

import { API_URL } from './../../config';

class MembersTab extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          newMember: {
              name: '',
              valuePoints: null
          }
        };

        this.memberNameInputRef = React.createRef();
        this.addMember = this.addMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
        this.updateNewMemberName = this.updateNewMemberName.bind(this);
        this.updateNewMemberValuePoints = this.updateNewMemberValuePoints.bind(this);
    }

    addMember() {
        axios.post(API_URL + '/members', this.state.newMember)
            .then(response => {
                const member = response.data;
                this.props.updateStateMembers([...this.props.members, member]);
            })
            .catch(error => console.log(error));
    }

    deleteMember(e) {
        const memberId = e.target.value; 
        axios.delete(API_URL + '/members/' + memberId)
            .then(() => {
                const memberIndex = this.props.members.findIndex(m => m._id === memberId);
                let updatedMembers = [...this.props.members];
                updatedMembers.splice(memberIndex, 1);
                this.props.updateStateMembers(updatedMembers);
            })
            .catch(error => console.log(error));
    }

    updateNewMemberName(e) {
        this.setState({ 
            newMember: { 
                name: e.target.value,
                valuePoints: this.state.newMember.valuePoints
            }
        });
    }

    updateNewMemberValuePoints(e) {
        this.setState({ 
            newMember: { 
                name: this.state.newMember.name,
                valuePoints: e.target.value
            }
        });
    }

    render() {
        return (
            <div className="members-tab">
                <ul className="members-tab__list">
                    {this.props.members.map(member => (
                        <li key={member._id} className="members-tab__item">
                            <span className="members-tab__item__name">{member.name}</span>
                            <span className="members-tab__item__value-points">{member.valuePoints}</span>
                            <button className="members-tab__item__remove-button" value={member._id} onClick={this.deleteMember}>X</button>
                        </li>
                    ))}
                </ul>
                <div className="members-tab__action-bar">
                    <input type="text" name="name" onChange={this.updateNewMemberName} />
                    <input type="number" name="valuePoints" onChange={this.updateNewMemberValuePoints} />
                    <button onClick={this.addMember}>Add new member</button>
                </div>
            </div>
        );
    }
}

export default MembersTab;