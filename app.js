import * as dotenv from 'dotenv'
import express from 'express'
import AWS from 'aws-sdk'
import ejs from 'ejs'
import path from 'path'
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


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/email', (req, res) => {

  ejs.renderFile('./templates/welcome.ejs', { receiver: 'Oloja', content: 'Nice one' }, (err, data) => {
    if (err) {
      console.log(err);
    }


    const PARAMS = {
      Source: 'olojam4969@gmail.com',
      Destination: {
        ToAddresses: [
          'olojam4969@gmail.com',
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: data,
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: "Ejs"
        },
      }
    }

    new AWS.SES(SESCONFIG).sendEmail(PARAMS).promise().then(res => {
      console.log(res)
    })
    res.send('email sent')
  })

})

app.get('/ejs', (req, res) => {

  ejs.renderFile('./templates/welcome.ejs', { receiver: 'Oloja', content: 'Nice one' }, (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(data)
    }
  })
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)

})


