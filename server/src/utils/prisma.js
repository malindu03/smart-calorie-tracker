// Create one instance of PrismaClient to be used throughout the application
// connecting to the postgresql database. This ensures only one connection and prevents
// potential issues with too many connections.

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;