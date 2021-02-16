import { Component, h } from "@stencil/core";

@Component({
    tag: 'wc-spinner',
    styleUrl: './spinner.css',
    shadow: true
})
export class Spinner{

    render(){
        return (
            <div class="lds-ring">
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        )
    }
}