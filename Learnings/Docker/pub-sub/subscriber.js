const redis = require("redis");
const publisher = redis.createClient({
    socket:{
        host: "localhost",
        port: 6379
    }
});
(async function(){
await subscriber.connect();
subscriber.subscribe("channel-01", (message));
console.log(message);
})