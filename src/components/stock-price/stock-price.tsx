import { Component, h } from "@stencil/core";

@Component({
    tag: 'wc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})

export class StockPrice{
 
    onFetchStockPrice(event) {
        event.preventDefault();
        console.log('submitted!');
    }

    render(){
        return [
            <form onSubmit={this.onFetchStockPrice}>
                <input id='stock-symbol'/>
                <button type='submit'>Fetch</button>
            </form>,

            <div>
                <p>
                    Price is : {0}
                </p>
            </div>    
        ];
    }
}