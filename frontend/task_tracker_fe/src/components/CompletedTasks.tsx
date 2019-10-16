import React from "react";
import { GetAllTasks } from '../services/ApiCaller'

type CompletedTasksState = {
    days: any; // TODO: define type for days
}

class CompletedTasks extends React.Component<{}, CompletedTasksState> {
    constructor({ }) {
        super({})
        this.state = {
            days: []
        }
    }

    componentDidMount() {
        GetAllTasks().then((data: any) => { // TODO: define type for data
            this.setState({ days: data })
        });
    };

    formatDuration(duration: number) {
        return duration / 60000
    }

    render() {
        let dateDisplayOptions = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric"
        };
        return (
            <div className="completed-tasks">
                {(this.state.days === [] || this.state.days === null) &&
                    <p>No tasks</p>
                }
                <h2>Completed tasks</h2>
                {this.state.days != null &&
                    this.state.days.map((group: any) => { // TODO: define type for group
                        return (
                            <div className="task-section">
                                <div className="task-day-header">
                                    <div className="day-title">{(new Date(group._id)).toLocaleDateString("en-nz", dateDisplayOptions)}</div>
                                </div>
                                {group.tasks.map((task: any, i: number) => {
                                    return (
                                        <div key={i++} className="task-section-info">
                                            <h4 className="task-title">{task.title}</h4>
                                            <p className="task-duration">{this.formatDuration(task.duration)}m</p>
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
