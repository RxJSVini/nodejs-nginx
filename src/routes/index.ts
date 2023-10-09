import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const fakeUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        age: 25,
    },
    {
        id: 3,
        name: 'Alice',
        email: 'alice@example.com',
        age: 22,
    },
    {
        id: 4,
        name: 'Bob',
        email: 'bob@example.com',
        age: 35,
    },
    {
        id: 5,
        name: 'Charlie',
        email: 'charlie@example.com',
        age: 40,
    },
];



interface BodyUserRequest {
    name: string, 
    email:string, 
    age:number
}

export async function AppRoutes(app: FastifyInstance) {
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
            age

        } = request.body;  

        const newId = fakeUsers[fakeUsers.length - 1].id + 1;

        fakeUsers.push({ id: newId, name, email, age });


        reply.send({
            status: 200,
            message:'The user has been created'
        });



    });


}
