"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    exposedHeaders: ['authToken']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
                console.log(key + ": " + request.body.deltas[0].metadata[key]);
            }
        }
        console.log('==========BODY DELTAS START==========\n');
    }
    response.status(200).end(); // Responding is important
});
// app.use('/', authRoute);
// app.use('/login', loginRoutes);
// app.use('/dashboard', dashboardRoutes);
// app.use('/candidate', candidateRoutes);
// app.use('/user', userRoutes);
// app.use('/job', authRoute, jobRoutes);
// app.use('/contact', authRoute, contactRoutes);
// app.use('/', authRoute)
// app.use('/candidate', authRoute, candidateRoutes, encryptData);
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});
// app.use((req, res, next) => {
//     const axios = require('axios');
//     // axios.post(
//     //     'https://apis.indeed.com/oauth/v2/tokens',
//     //     'code=EuGxY9CxOUM&client_id=ed9549bb15914c8245be7a7180a6cbed749a79890faef84d30505fac3c9d76c1&client_secret=ZeuFz1Qc38W09Fy5qQll20e5mLlEM1EIfUBqnLCKBfGYVUEBoLw4s6PmAfBeiGot&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin',
//     //     {
//     //         headers: {
//     //             'Content-Type': 'application/x-www-form-urlencoded',
//     //             'Accept': 'application/json'
//     //         }
//     //     }
//     // ).then(function (response: any) {
//     //     console.log(response);
//     //     res.status(200).send(response);
//     // })
//     //     .catch(function (error: any) {
//     //         console.log(error);
//     //         res.status(200).send(error);
//     //     });
//     const params = new URLSearchParams();
//     params.append("redirect_uri", "http://localhost:4200/login")
//     params.append("code", "4rfQa4P4-o8")
//     params.append("client_id", "ed9549bb15914c8245be7a7180a6cbed749a79890faef84d30505fac3c9d76c1")
//     params.append("client_secret", "ZeuFz1Qc38W09Fy5qQll20e5mLlEM1EIfUBqnLCKBfGYVUEBoLw4s6PmAfBeiGot")
//     params.append("grant_type", "authorization_code")
//     var config = {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Accept': 'application/json'
//         }
//     }
//     axios.post('https://apis.indeed.com/oauth/v2/tokens', params, config)
//         .then(function (response: any) {
//             console.log(response);
//             res.status(200).send(response);
//         })
//         .catch(function (error: any) {
//             console.log(error);
//             res.status(200).send(error);
//         });
//     // var headers = {
//     //     'Content-Type': 'application/x-www-form-urlencoded',
//     //     'Accept': 'application/json'
//     // };
//     // var dataString = 'code=xBJt68NUOws&client_id=c09dbf5222b85688b3ce380fde5316fd4e6bdf337d0d4cdff0b5c7a9ec4501b5&client_secret=tu15EJ1woBbpvsjWC3Ttl1cxZnAakMrN5WLLnmNgWaCYZ2ISJx2mNBIsyvIzWuHz&redirect_uri=http://localhost:4200/login&grant_type=authorization_code';
//     // var body1 = `grant_type=authorization_code&client_id=43e98d7e0e01d30a00972861d5b20cc7b4912b36ffbf838677afb3124689132c&client_secret=bMI5qQESukNEJ23pPva0RymLiuDTM9fNpRqLShb51pdYnSn0T07Zk3ieDbn3Bkzf&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin&code=iMwwYCoZLG8`;
//     // var body2 = `grant_type=authorization_code&client_id=43e98d7e0e01d30a00972861d5b20cc7b4912b36ffbf838677afb3124689132c&client_secret=bMI5qQESukNEJ23pPva0RymLiuDTM9fNpRqLShb51pdYnSn0T07Zk3ieDbn3Bkzf&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin&code=iMwwYCoZLG8`;
//     // var obj = {
//     //     redirect_uri: "http://localhost:4200/login",
//     //     code: "4XhVcnWWHfw",
//     //     grant_type: 'authorization_code',
//     //     client_id: "43e98d7e0e01d30a00972861d5b20cc7b4912b36ffbf838677afb3124689132c",
//     //     client_secret: "bMI5qQESukNEJ23pPva0RymLiuDTM9fNpRqLShb51pdYnSn0T07Zk3ieDbn3Bkzf"
//     // };
//     // var options = {
//     //     url: 'https://apis.indeed.com/oauth/v2/tokens',
//     //     method: 'POST',
//     //     headers: headers,
//     //     data: body2
//     // };
//     // function callback(error: any, response: Response) {
//     //     // if (!error && response.statusCode == 200) {
//     //     //     console.log(response);
//     //     //     res.status(200).send(response);
//     //     // } else if(response && response.body){
//     //     //     res.status(200).send(response.body);
//     //     // } else {
//     //     res.status(200).send(response);
//     //     // }
//     // }
//     // request(options, callback);
// });
app.listen(3000);
