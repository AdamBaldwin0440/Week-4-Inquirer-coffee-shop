import inquirer from "inquirer";

let Menu = {
    coffee: 3,
    tea: 2.5,
    latte: 2,
    coke: 1.5,
}


let menuChoices = Object.keys(Menu);
menuChoices.push("-- Go To Checkout --")

class CoffeeShop {
    constructor(CustomerName) {
        this.name = CustomerName
        this.Order =[]
        this.Total = 0
    }

    calculateTotal() {
        //this calculates the total cost of the order
        console.log(`Thanks for ordering ${this.name}`)
        for(let i = 0; i < this.Order.length; i++){
            console.log(this.Order[i], Menu[this.Order[i]])
            
            this.Total += Menu[this.Order[i] ]
        }
        console.log(`Your total is £${this.Total}`)
    }

    set UpdateOrder(newItem) {
        this.Order.push(newItem)
    }
}

const question = [
    {
        type: "input",
        name: "GetName",
        message: "What is your name?"
    }
]
const NameResponse = await inquirer.prompt(question)

const customer = new CoffeeShop(NameResponse.GetName)

const askForOrder = async () => {
    const TakeOrder = await inquirer.prompt([
        {
            type: "list",
            name: "getOrder",
            message: "What would you like to order?",
            choices: menuChoices
        }
    ])

    if(TakeOrder.getOrder === "-- Go To Checkout --"){
        customer.calculateTotal()
        return;
    } else {
        customer.UpdateOrder = TakeOrder.getOrder
    }

       askForOrder()
}

askForOrder()