import React from "react";
import { GetAllTasks } from '../services/ApiCaller'

class CompletedTasks extends React.Component {
    state = {
        days: null
    }

    componentDidMount() {
        GetAllTasks().then((data) => {
            this.setState({ days: data })
        });
    };

    render() {
        return (
            <div className="completed-tasks">
                {(this.state.days === [] || this.state.days === null) &&
                    <p>No tasks</p>
                }
                {this.state.days != null &&
                    this.state.days.map((group) => {
                        return (
                            <div className="task-section">
                                <h2>Completed tasks</h2>
                                <h3>{group._id}</h3>
                                {group.tasks.map((task, i) => {
                                    return (
                                        <div key={i++} className="task-section-info">
                                            <hr />
                                            <h4>{task.title}</h4>
                                            <p>Start: {(new Date(task.startDate)).toTimeString()}</p>
                                            <p>End: {(new Date(task.stopDate)).toTimeString()}</p>
                                            <p>Duration: {task.duration} minutes (?)</p>
                                        </div>
                                    )
                                })
                                }
                            </div >
                        )
                    })
                }
            </div>
        )
    }
}

export default CompletedTasks;