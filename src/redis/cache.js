const Redis = require('ioredis')

require('dotenv').config()

class Cache{
    constructor(){
        this.redis = new Redis({
            host: process.env.REDIS_HOST || "localhost",
            port: process.env.REDIS_PORT || 6379,
            keyPrefix: "cache"
        })
    }

    // getting data from redis
    async get(key){
        const value = await this.redis.get(key) 

        // if has value return a json
        return value ? JSON.parse(value) : null
    }

    // setting data to redis
    set(key, value, timeExp){
        return this.redis.set(key, JSON.stringify(value), "EX", timeExp)
    }

    del(key){
        return this.redis.del(key)
    }


    // mapping everything inside redis has the prefix and deleting
    async delPrefix(prefix){
        const keys = (
            await this.redis.keys(`cache:${prefix}:*`))
                .map(key =>{
                    key.replace("cache:", "")
        })

        return this.redis.del(keys)
    }
}

module.exports = new Cache()