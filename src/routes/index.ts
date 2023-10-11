import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt';
import 'dotenv/config';

const fakeUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'user1@pass2023',
        age: 30,
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'user2@pass2023',
        age: 25,
    },
    {
        id: 3,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'user3@pass2023',
        age: 22,
    },
    {
        id: 4,
        name: 'Bob',
        email: 'bob@example.com',
        password: 'user4@pass2023',
        age: 35,
    },
    {
        id: 5,
        name: 'Charlie',
        email: 'charlie@example.com',
        password: 'user5@pass2023',
        age: 40,
    },
];



interface BodyUserRequest {
    name: string, 
    email:string, 
    age:number,
    password: string,
}

interface BodyAuthenticationRequest {
    email: string,
    password: string,
}


export async function AppRoutes(app: FastifyInstance) {

    app.register(jwt, {
        secret: process.env.JWT_SECRET || '03c7c0ace395d80182db07ae2c30f034'// Só pra testar kkkkkkkk 😂
    });



    app.get('/ping', (request, reply: FastifyReply) => {
        reply.send({
            status: 200,
            message: 'API OK',
        });
    });


    app.get('/users', (request, reply: FastifyReply) => {
        reply.send({
            status: 200,
            data: fakeUsers
        });
    });

    app.post('/users', (request: FastifyRequest<{Body:BodyUserRequest }>, reply: FastifyReply) => {
        const {
            name,
            email,
            age,
            password

        } = request.body;  

        const newId = fakeUsers[fakeUsers.length - 1].id + 1;

        fakeUsers.push({ id: newId, name, email, age, password: password });


        reply.send({
            status: 200,
            message:'The user has been created'
        });

    });


    app.post('/auth', async (request:FastifyRequest<{Body:BodyAuthenticationRequest}>, reply: FastifyReply) =>{

        try {
            const { email, password }: BodyAuthenticationRequest  = request.body;

            const userExists = fakeUsers.map(a => a).filter(b => b.email === email);
    
            if(userExists.length >= 1){
    
                if(userExists[0].password === password){
                    const token = await reply.jwtSign({
                        email,
                    }, {expiresIn: '1d'});
        
        
                    return reply.send({
                        status: 200,
                        message: 'The user has been authenticated',
                        token
                    });
                }
                
            }
            return reply.status(403).send({
                status: 403,
                message:'No Access'
            });
     
        } catch (error) {
            throw new Error(error);
        }
    });


}
