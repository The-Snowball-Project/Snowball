import { PrismaClient } from '@prisma/client'
import logger from './util/logger'
import { json } from 'express';

const prisma = new PrismaClient()


async function test() {
    logger.info("Adding new test user with name: 'test'");
    await prisma.user.create({
        data: {
            Name: "test",
            Bio: ""
        }
    })
    const data = await prisma.user.findMany();
    logger.info("all users in users table:\n\tUser.Name: "+data.map((user) => user.Name).join('\n\tUser.Name: '));
}
 
export default test;


