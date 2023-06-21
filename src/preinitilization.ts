import { PrismaClient } from '@prisma/client';
import Authenticator from './util/authenticator';

declare global {
    var prismaClient:PrismaClient;
    var authenticator:Authenticator;
}

global.prismaClient = new PrismaClient();
global.authenticator = new Authenticator();