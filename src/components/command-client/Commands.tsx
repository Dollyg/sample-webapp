import * as React from "react";
import { CommandApi } from "./api";
import { Completed } from "./types/response";
import { intKey } from "../../params/Key";

const commandApi = new CommandApi("localhost", 9999);

export class Commands extends React.Component {
    intKey = intKey("encoder").set([12,23,23])
    private readonly newProperty = new Set().add(this.intKey);
    state = {
        commandResponse: { runId: -1, result: this.newProperty }
    };
    async submitCommand() {
        let commandResponse: Completed = await commandApi.submit();
        this.setState({ commandResponse });
    }

    render() {
        return (
            <div>
                <button onClick={() => this.submitCommand()}><label> Submit </label></button>
                {this.state.commandResponse.runId !== -1 && <div>
                    result for runid: {this.state.commandResponse.runId}
                    <ul>
                        {Array(this.state.commandResponse.result).map(paramter => {
                            // for (let [key, value] of Object.entries(paramter)) {
                            //     return <li key={key}>{key}: {value}</li>
                            // }
                        }
                        )}
                    </ul>
                </div>}
            </div>
        );
    }
}
