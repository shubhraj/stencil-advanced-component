import { Component, h, State, Element } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
    tag: 'wc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})

export class StockPrice{
    
    stockElement : HTMLInputElement;

    @Element() el: HTMLElement;

    @State() fetchedPrice : number
 
    onFetchStockPrice(event) {
        event.preventDefault();
        //const stockSymbol = (this.el.shadowRoot.querySelector("#stock-symbol") as HTMLInputElement).value;
        const stockSymbol = this.stockElement.value;
        
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        .then(res => {
            return res.json()
        })
        .then(parsedRes =>{
           this.fetchedPrice = parsedRes["Global Quote"]['05. price'];
        } )
        .catch(e => {
            console.log(e)
        })
    }

    render(){
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input id='stock-symbol' ref={ el => this.stockElement = el }/>
                <button type='submit'>Fetch</button>
            </form>,

            <div>
                <p>
                    Price is : {this.fetchedPrice}
                </p>
            </div>    
        ];
    }
}