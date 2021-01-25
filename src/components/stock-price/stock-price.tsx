import { Component, h, State } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
    tag: 'wc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})

export class StockPrice{
    @State() fetchedPrice : number
 
    onFetchStockPrice(event) {
        event.preventDefault();
        console.log('submitted!');
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${AV_API_KEY}`)
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
                <input id='stock-symbol'/>
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