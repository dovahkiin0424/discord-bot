module.exports = async (bot, message, args) => {

    message.channel.send('Pong!');

}

module.exports.config = {
    command: "ping"
}