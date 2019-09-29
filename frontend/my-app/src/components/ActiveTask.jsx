import React from "react";

class ActiveTask extends React.Component {
    state = {
        isActiveTask: false,
        title: null,
        start_time: null
    };

    componentDidMount() {
        fetch("http://localhost:3003/api/tasks/active_task")
            .then(response => {
                if (response.ok) {
                    response.json().then(task => {
                        console.log("Ok" + task.title);
                        this.setState({
                            isActiveTask: true,
                            title: task.title,
                            start_date: task.startDate
                        });
                    });
                }
            });
    }

    render() {
        const { isActiveTask, title, start_date } = this.state;
        if (isActiveTask){
            return ( <h3>{title} &nbsp; {start_date}</h3> );
        }
        return (
            <form>
                <input type="text" name="task_title" placeholder="Task title" />
                <button type="submit">Start</button>
            </form>
        );
    }
}

export default ActiveTask;