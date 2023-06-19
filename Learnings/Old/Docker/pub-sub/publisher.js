const redis = require("redis");
const publisher = redis.createClient({
    socket:{
        host: "localhost",
        port: 6379
    }
});
(async function(){
await publisher.connect();
await publisher.publish("channel-01", (message));
console.log("Messge sent!");
ProcessingInstruction.exit(0);
})
