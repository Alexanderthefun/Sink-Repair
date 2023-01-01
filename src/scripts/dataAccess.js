

const applicationState = {
    requests: [],
    plumbers: [],
    completions: []          //<- Property that holds the array that will 
}                           //contain the request objects sent by the Requests() function

const API = "http://localhost:8088"

//function whose responsibility is to fetch the API, convert to .json, then add the request object as a property to the application state.
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

//returns a copy of the requests held in the application state "database(?)"
export const getRequests = () => {
    return [...applicationState.requests]
}

//POST means "Hey API, make something new"
//new thing: turns input data into object property "key: value" format readable by json module
//2nd part of this function then sends to data.json
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//func to initiate fetch request to the API for delete.
export const deleteRequest = (id) => {
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

//function to get the plumbers from the API file and add that data to the applicationState
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

export const getPlumbers = () => {
    return [...applicationState.plumbers]
}

//this func should perform the POST request to save the completion object to the API
export const saveCompletion = (plumberCompletion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plumberCompletion)
    }

    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//This function will retrieve all completion objects from the API
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}

export const getCompletions = () => {
    return [...applicationState.completions]
}