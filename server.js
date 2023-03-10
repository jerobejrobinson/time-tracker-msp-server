import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()

app.use(cors({origin: "http://localhost:3000"}))
app.get('/', (req, res) => res.send('hello World!'))
app.get('/gabt', (req, res) => {
    fetch(process.env.TOKEN_URL, {
        method: "POST",
        body: `grant_type=${process.env.GRANT_TYPE}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&username=${process.env.USERNAME}&password=${process.env.PASSWORD}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()).then(data => res.send(data))
})

app.get('/api/getproductpricing', (req, res) => {
    fetch(`${process.env.API_ENDPOINT}/sxapioepricingv5`, {
            method: 'POST',
            headers: {
                "Authorization": req.headers.authorization
            },
            body: JSON.stringify({
                "request": {
                  "companyNumber": 3,
                  "operatorInit": "jjr",
                  "operatorPassword": "",
                  "customerNumber": 98762,
                  "warehouse": "300",
                  "productCode": req.query.product,
                  "quantity": 2,
                  "tInfieldvalue": {
                    "t-infieldvalue": [
                      {
                        "level": "string",
                        "lineno": 0,
                        "seqno": 0,
                        "fieldname": "string",
                        "fieldvalue": "string"
                      }
                    ]
                  }
                }
              })
        }).then(res => res.json()).then(data => res.send(data))
})

app.listen(5000, () => console.log('Server ready'))