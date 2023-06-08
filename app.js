import * as dotenv from 'dotenv'
import express from 'express'
import AWS from 'aws-sdk'
const PORT = process.env.PORT || 3000
dotenv.config()

console.log(process.env.ACCESS_KEY_ID)
console.log(process.env.SECRET_ACCESS_KEY)

const SESCONFIG = {
  apiVersion: "2010-12-01",
  region: 'us-east-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
}

const PARAMS = {
  Source: 'olojam4969@gmail.com',
  Destination: {
    ToAddresses: [
      'olojam4969@gmail.com',
      'olojam266@gmail.com',
    ]
  },
  Message: {
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data: "It is <strong>Working</strong>!",
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: "Nodejs + SES",
    },
  }
}

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/email', (req, res) => {
  new AWS.SES(SESCONFIG).sendEmail(PARAMS).promise().then(res => {
    console.log(res)
  })
  res.send('email sent')
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)

})


