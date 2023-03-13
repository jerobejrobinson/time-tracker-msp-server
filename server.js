// require('dotenv').config()
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors({origin: "http://localhost:3000"}))


app.get('/gabt', (req, res) => {
    fetch(process.env.url, {
        method: "POST",
        body: ``,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()).then(data => {
      console.log(data)
      res.send(data)
    })
})
app.use(cors({origin: "http://localhost:3000"}))
app.get('/api/getproductpricing', (req, res) => {
    fetch(`https://mingle-ionapi.inforcloudsuite.com/D7NMH8MYY885DBPS_TRN/SX/rest/sxapirestservice/sxapioepricingv5`, {
            method: 'POST',
            headers: {
                "Authorization": req.headers.authorization,
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: `{
              "request": {
                  "companyNumber": 3,
                  "operatorInit": "jjr",
                  "operatorPassword": "",
                  "customerNumber": 98762,
                  "warehouse": "300",
                  "productCode": "${req.query.product}",
                  "quantity": ${req.query.quantity},
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
          }`
            
        }).then(res => res.json()).then(data => res.send(data))
})

app.listen(5000, () => console.log('Server ready'))