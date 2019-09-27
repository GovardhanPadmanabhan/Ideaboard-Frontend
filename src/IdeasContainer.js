import React, { Component } from 'react';
import axios from 'axios';
import Idea from './Idea';
import update from 'immutability-helper';
import IdeaForm from './IdeaForm';

class IdeasContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ideas: [],
            editingIdeaId: null,
            notification: ''
        }

        this.addNewIdea = this.addNewIdea.bind(this)
        this.updateIdea = this.updateIdea.bind(this)
        this.resetNotification = this.resetNotification.bind(this)
        this.enableEditing = this.enableEditing.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/v1/ideas.json')
        .then(response => {
            console.log(response)
            this.setState({ideas: response.data})
        })
        .catch(error => console.log(error))
    }

    addNewIdea() {
        axios.post('http://localhost:3001/api/v1/ideas',
            {   idea: 
                {
                    title: '',
                    body: ''
                }

            }
        )
        .then(response => {
            const ideas = update(this.state.ideas, {
                $splice: [[0, 0, response.data]]
            })
            this.setState({
                ideas: ideas,
                editingIdeaId: response.data.id
            })
        })
        .catch(error => console.log(error))
    }

    updateIdea(idea) {
        const ideaId = this.state.ideas.findIndex(x => x.id === idea.id)
        const ideas = update(this.state.ideas, {
            [ideaId]: {$set: idea}
        })
        this.setState({ideas: ideas, notification: 'All changes saved'})
    }

    resetNotification() {
        this.setState({notification: ''})
    }

    enableEditing(id) {
        this.setState({editingIdeaId: id})
    }

    deleteIdea = (id) => {
        axios.delete(`http://localhost:3001/api/v1/ideas/${id}`)
        .then(response => {
            const ideaIndex = this.state.ideas.findIndex(x => x.id === id)
            const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]]})
            this.setState({ideas: ideas})
        })
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <div>
                <div className="float-left">
                    <button type="button" className="btn btn-primary" onClick={this.addNewIdea} >New Note</button>
                    <span className="notification">
                        {this.state.notification}
                    </span>
                </div>
                <br />
                <br />
                <br />
                <div>
                    {this.state.ideas.map((idea) => {
                        if(idea.id === this.state.editingIdeaId){
                            return (<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} resetNotification={this.resetNotification} />)
                        }
                        else {
                            return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing} onDelete={this.deleteIdea}/>)
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default IdeasContainer