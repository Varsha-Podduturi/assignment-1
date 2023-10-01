const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    ICECREAM: Symbol("icecream"),
    FLAVOR: Symbol("flavor"),
    CAKE: Symbol("cake"),
    CAKEFLAVOR: Symbol("cakeflavor"),
    PIECES: Symbol("pieces"),
    SHAKES:  Symbol("shakes")
});

module.exports = class MenchiesOrder extends Order{
    static orderNumber = 1;
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sItem = "";
        this.sItem2 = "";
        this.sPieces = "";
        this.sFlavor = "";
        this.sCakeFlavor = "",
        this.sShakes = "";
        this.sUserReply = "";
        this.Order = [];
        this.totalOrder = {}
        this.CakePrice = 5;
        this.IceCreamPrice = 10;
        this.ShakePrice = 5;
        this.totalPrice = 0
        this.orderNumber = MenchiesOrder.orderNumber++;
        
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                if(sInput.toLowerCase() == "icecream" || sInput.toLowerCase() == 'both'){
                    this.sUserReply = sInput;
                    this.stateCur = OrderState.SIZE
                    this.sItem = "Ice cream"
                    aReturn.push("Which Ice-cream Size would you like?")
                    break
                }else if(sInput.toLowerCase() == "cake"){
                    this.stateCur = OrderState.CAKEFLAVOR
                    this.sItem2 = "Cake"
                    aReturn.push("Which Flavor would you like?")
                    break;
                }else{

                    aReturn.push("Welcome to Menchies.");
                    aReturn.push("What would you like icecream or cake or both?");
                    break;
                }
            
            case OrderState.FLAVOR:
                this.stateCur = OrderState.TOPPINGS
                this.sFlavor = sInput;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.FLAVOR
                this.sSize = sInput;
                aReturn.push("What Ice-cream Flavor would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SHAKES
                this.sToppings = sInput;
                if(this.sUserReply == "both"){
                    this.stateCur = OrderState.CAKEFLAVOR
                    this.sItem2 = "Cake"
                    aReturn.push("Which Cake Flavor would you like?")
                    break
                }
                aReturn.push("Would you like shakes with that? If yes , Please mention the shake name");
                break;
            case OrderState.CAKEFLAVOR:
                this.stateCur = OrderState.PIECES
                this.sCakeFlavor = sInput,
                // this.sPieces = sInput;
                aReturn.push("How many pieces would you like to have?");
                break;
            case OrderState.PIECES:
                this.stateCur = OrderState.SHAKES
                this.sPieces = sInput;
                aReturn.push("Would you like shakes with that? If yes , Please mention the shake name");
                break;
            case OrderState.SHAKES:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sShakes = sInput;
                }
                aReturn.push("Thank-you for your order of");
                if(this.sItem != ""){

                    aReturn.push(`${this.sFlavor} ${this.sItem}, ${this.sSize} with toppings- ${this.sToppings}`);
                    let ice_creamOrder = {
                        item_name : this.sItem,
                        size: this.sSize,
                        flavor: this.sFlavor,
                        toppings : this.sToppings,
                        price: this.IceCreamPrice,

                    }
                    this.totalPrice += this.IceCreamPrice
                    this.Order.push(ice_creamOrder)
                }
                if(this.sItem2 != ""){
                    aReturn.push(`${this.sPieces} pieces of ${this.sItem2} with ${this.sCakeFlavor} flavor`);
                    let cake_price = Number(this.sPieces) * this.CakePrice
                    let cakeOrder = {
                        item_name : this.sItem2,
                        pieces: this.sPieces,
                        flavor: this.sCakeFlavor,
                        price: cake_price,

                    }
                    this.Order.push(cakeOrder)
                    this.totalPrice += cake_price
                    // console.log("inside handle",this.Order)
                }
                if(this.sShakes){
                    let shakeOrder = {
                        item_name : this.sShakes,
                        price: this.ShakePrice

                    }
                    this.Order.push(shakeOrder)
                    this.totalPrice += this.ShakePrice
                    aReturn.push(`${this.sShakes}`)

                } 
                this.Order.push({total_price : this.totalPrice})
                this.totalOrder[this.orderNumber] = this.Order
                

                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 30);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
    getOrderData() {
        console.log("inside getorder",this.totalOrder)
        return this.totalOrder
    }
}

