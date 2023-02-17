import express, {Request, Response, NextFunction, RequestHandler} from 'express'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

// dotenv.config();

// routes
app.get('/', (req, res) => {
    res.send(`<h1>Hello from Dev Patel add /users in url</h1>`)
})

let users = [
    {
        id: 1,
        name: 'Dev',
    },
    {
        id: 2,
        name: 'Daksh',
    },
    {
        id: 3,
        name: 'Shubham',
    },
    {
        id: 4,
        name: 'Meet',
    },
];
// Create
app.post('/users', (req, res) => {
    const newUser = {
        name: req.body.name,
        id: Date.now()
    };
    users.push(newUser);
    res.json(newUser)
})

// Read
app.get('/users', (req, res) => {  
    res.send(users);
})

// Update
app.put('/users', (req, res) => {
    const {id, name} = req.body;
    users = users.map((user) => {
        if (user.id === id) {
            user.name = name;
        }
        return user;
    });
    res.json(users)
})

// Delete
app.delete('/users', (req, res) => {
    const {id} = req.body;
    users = users.filter((user) => user.id !== id);
    res.json(users);
})

const isAutorized:RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader === "mysecretvalue") {
        next();
    } else {
        res.status(401);
        res.json({ msg: "No Access"})
    }
}


// get one user
app.get('/users/:id', isAutorized, (req, res) => {  
    const id = +req.params.id
    const user = users.filter(user => user.id === id)[0];
    res.json(user);
})

// start
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});