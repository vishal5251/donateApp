const cors  = require('cors')
const express = require('express')

const stripe = require('stripe')('sk_test_51IpAgiSHOVJl1RZ3IOXOPBGFXTroBnC5TmPUgxVwCAIYgthPWrLn1T9yf6L0gPPk9EjSMsng1yImDc3JZqAFzc2x00fCr1MfoV')
const uuid = require('uuid')

const app = express()


//middleware
app.use(express.json())
app.use(cors())

//Routes
app.get('/' , (req, res) =>{
    res.send("IT WORKS ON MY WEBSITE")
})

app.post("/payment",(req,res) => {
    const { product,token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", price);
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer => {
        stripe.charges.create(
            {
                amount:product.price * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.id,
                description: `purchase of ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        country:token.card.address_country
                    }
                }
            },
            { idempotencyKey }
        )
    })
})

//Listen
app.listen(5000, () => console.log("Listening at port 5000!"))