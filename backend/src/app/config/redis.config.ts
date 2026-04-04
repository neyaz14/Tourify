import { createClient } from 'redis';
import { envVars } from './env';

export const client = createClient({
    // username: envVars.REDIS.REDIS_USERNAME,
    // password: envVars.REDIS.REDIS_PASSWORD,
    // socket: {
    //     host: envVars.REDIS.REDIS_HOST,
    //     port: Number(envVars.REDIS.REDIS_PORT)
    // }

    username: envVars.REDIS.REDIS_USERNAME,
    password: envVars.REDIS.REDIS_PASSWORD,
    socket: {
        host: envVars.REDIS.REDIS_HOST,
        port: 18500
    }
});

client.on('error', err => console.log('Redis client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar


export const redisConnect = async () => {
    if (!client.isOpen) {
        await client.connect();

        // await client.set('foo', 'bar');
        // const result = await client.get('foo');
        // console.log(result)  // >>> bar

        console.log("Redis Connected !!");
    }
}

// redisConnect();