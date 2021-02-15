import { Component, h, State, Element, Prop, Watch } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
    tag: 'wc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})

export class StockPrice{
    
    stockElement : HTMLInputElement;
    //initialStockSymbol : string;

    @Element() el: HTMLElement;
    
    //State
    @State() fetchedPrice : number
    @State() stockUserInut: string;
    @State() stockInputValid = false;
    @State() error: string;
    
    //Props
    @Prop({mutable: true, reflect: true}) stockSymbol : string; 
    
    //Watchers
    @Watch('stockSymbol')
    stockSymbolChanged(newValue:string, oldValue:string){
        if(newValue !== oldValue){
            this.stockUserInut = newValue;
            this.fetchStockPrice(newValue);
        }
    }


    onUserInput(event: Event){
        this.stockUserInut = (event.target as HTMLInputElement).value;
        if(this.stockUserInut.trim() != ''){
            this.stockInputValid = true;
        }else{
            this.stockInputValid = false;
        }
    }

    onFetchStockPrice(event) {
        event.preventDefault();
        //const stockSymbol = (this.el.shadowRoot.querySelector("#stock-symbol") as HTMLInputElement).value;
        this.stockSymbol = this.stockElement.value;
        //this.fetchStockPrice(stockSymbol);
    }

    componentDidLoad(){
        console.log('Component Did Load!');
        if(this.stockSymbol){
           // this.initialStockSymbol = this.stockSymbol;
            this.stockUserInut = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
        }
    }

    componentWillLoad(){
        console.log('loading the component');
    }

    componentDidUpdate(){
        console.log('Component Did Update')
        // if(this.stockSymbol !== this.initialStockSymbol){
        //     this.initialStockSymbol = this.stockSymbol;
        //     //this.stockUserInut = this.stockSymbol;
        //     this.fetchStockPrice(this.stockSymbol);

        // }

    }

    disconnectedCallback(){
        console.log('component Did Unload');
    }

    fetchStockPrice(stockSymbol: string) {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        .then(res => {
            if(res.status !== 200){
                throw new Error('Invalid req!');
            }
            return res.json()
        })
        .then(parsedRes => {
            if(!parsedRes["Global Quote"]['05. price']){
               this.fetchedPrice = null;
               throw new Error('Invalid Symbol!');
            }
            this.error = null;
            this.fetchedPrice = parsedRes["Global Quote"]['05. price'];
        })
        .catch(e => {
           this.error = e.message;
        })
    }

    render(){
        let dataContent = <div> Please Enter A symbol</div>
        if(this.error){
            dataContent = <p>{this.error}</p>
        }

        if(this.fetchedPrice){
            dataContent = <div>Price is : {this.fetchedPrice};</div>
        }

        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input id='stock-symbol' 
                ref={ el => this.stockElement = el } 
                value={this.stockUserInut}
                placeholder={this.stockSymbol}
                onInput={this.onUserInput.bind(this)}
                />
                
                <button type='submit' disabled={!this.stockInputValid}>Fetch</button>
            </form>,

            <div>
                <p>
                   {dataContent}
                </p>
            </div>    
        ];
    }
}