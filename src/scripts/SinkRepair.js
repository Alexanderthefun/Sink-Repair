import { Requests } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"

//the injector for the innerHTML of the mainContainer
export const SinkRepair = () => {
    return `
    <h1>Maude and Merle's Sink Repair</h1>
    <section class="serviceForm">
        ${ServiceForm()}
    </section>

    <section class="serviceRequests">
        <h2>Service Requests</h2>
        ${Requests()}
    </section>
    
    `
}

