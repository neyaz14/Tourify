import { createClient } from 'redis';
import { envVars } from './env';

export const RedisClient = createClient({
    username: envVars.REDIS.REDIS_USERNAME,
    password: envVars.REDIS.REDIS_PASSWORD,
    socket: {
        host: envVars.REDIS.REDIS_HOST,
        port: Number(envVars.REDIS.REDIS_PORT)
    }
});

RedisClient.on('error', err => console.log('Redis RedisClient Error', err));

// await RedisClient.connect();

// await RedisClient.set('foo', 'bar');
// const result = await RedisClient.get('foo');
// console.log(result)  // >>> bar


export const redisConnect = async () =>{
    if(!RedisClient.isOpen){
        await RedisClient.connect();
        console.log("Redis Connected !!");
    }
}

// redisConnect();