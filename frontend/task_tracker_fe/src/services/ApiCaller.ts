const api = "http://192.168.0.151:3003/api/";

const http = async (request: string) => {
    return new Promise(resolve => {
        fetch(request, {
            // tok: ''
        })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
    });
};

export async function GetAllTasks() {
    return await http(api + "tasks");
}

export async function GetAllActiveTasks() {
    return await http(api + "tasks/active_tasks");
}