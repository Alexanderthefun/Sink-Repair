import { fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


export const mainContainer = document.querySelector("#container")

//will fetch data from API and store it in application state.
const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()


//looks for "dispatched announcement and restarts everything on the page."
mainContainer.addEventListener(
    "stateChanged",
    CustomEvent => {
        render()
    }
)

