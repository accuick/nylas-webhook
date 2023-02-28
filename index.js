
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express, { Request } from 'express'

const app = express();
import cors from 'cors';


app.use(cors({
    exposedHeaders: ['authToken']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/indeed', indeedRoute)

app.all("/", (request, response) => {
    // console.log(request);
    if (request.method === "GET" && request.query.challenge) {
        console.log(`Received challenge code! - ${request.query}`);
        response.send(request.query.challenge);
        console.log(`Sending challenge code! - ${request.query.challenge}`);
    }

    if (request.method === "POST") {
        console.log('==========BODY DELTAS START==========');
        console.log(request.body);
        if (request.body.deltas[0].metadata) {
            for (const key in request.body.deltas[0].metadata) {
                console.log(key + ": " + request.body.deltas[0].metadata[key])
            }
        }
        console.log('==========BODY DELTAS START==========\n');
    }

    response.status(200).end() // Responding is important
})

app.listen(3000);