import { deleteRequest, getCompletions, getPlumbers, getRequests, saveCompletion } from "./dataAccess.js"


//formats a request description to an HTML list element.
export const requestToHTML = (request) => {
    const completions = getCompletions()
    const plumbers = getPlumbers()
    let html = ""
    html += `<li>${request.description}`
    html += `<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
            </select>
                <button class="request__delete"
                id="request--${request.id}">
            Delete
            </button></li>`
    completions.map(completion => {
        if (completion.requestId === request.id) {
            html = `<li>${request.description}<button class="request__delete"
            id="request--${request.id}">
        Delete
        </button></li>`
        }
    })

    return html
}


//maps & joins all of the requests <li> elements together and returns HTML
export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${requests.map(requestToHTML).join("")
        }
        </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")
//this function is there to detect and delete an ID
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

//this function should 
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

            saveCompletion(completion)
        }
    }
)