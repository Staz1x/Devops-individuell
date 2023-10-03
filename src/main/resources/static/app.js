document.querySelector('#push').onclick = async function () {
    var taskInput = document.querySelector('#newtask input[type="text"]');
    var dateInput = document.querySelector('#taskDate');
    var timeInput = document.querySelector('#taskTime');

    if (taskInput.value.length === 0) {
        alert("Please enter a task.");
    } else {
        var taskName = taskInput.value;
        var dateValue = dateInput.value;
        var timeValue = timeInput.value;

        var deadline = dateValue + ' ' + timeValue;

        document.querySelector('#tasks').innerHTML += `
      <div class="task">
        <span id="taskname">
          ${taskName}
        </span>
        <span id="taskDeadline">
          Deadline: ${deadline}
        </span>
        <button class="delete">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    `;

        var currentTasks = document.querySelectorAll(".delete");
        for (var i = 0; i < currentTasks.length; i++) {
            currentTasks[i].onclick = function () {
                this.parentNode.remove();
            };
        }

        var tasks = document.querySelectorAll(".task");
        for (var i = 0; i < tasks.length; i++) {
            tasks[i].onclick = function () {
                this.classList.toggle('completed');
            };
        }

        taskInput.value = "";
        dateInput.value = "";
        timeInput.value = "";

        //TODO: fix time input
        console.log(timeValue);
        let dummyBody = {"name":taskName,"time":"23"}

        let data = await postJson("tasks/add", dummyBody);
        console.log(data);
    }
};
async function postJson(endpoint, requestBody) {
    console.log("http://localhost:8080/" + endpoint)
    const response = await fetch('http://localhost:8080/' + endpoint, {
        method: 'POST', // You can change the HTTP method as needed (e.g., 'PUT', 'DELETE', etc.)
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify(requestBody) // Convert the requestBody to a JSON string
    });

    const data = await response.text();

    return data;
}






