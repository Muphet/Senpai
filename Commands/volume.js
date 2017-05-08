exports.run = (client, msg, args) => {
    var play = client.commands.get("PLAY");
    var number = Number(args[0])
    if(args[0] === undefined) {
    play.showVolume(msg)
    } else {
    if (isNaN(number)) return msg.channel.send("This command only accept numbers!")
    if(number > 2 || number < 0.1) return msg.channel.send("You can only choose a number between 2 and 0.1 where 2=200% volume and 0.1=10% volume from the current volume!")
    play.changeVolume(msg, number)
    }
    console.log("[Command]     ", msg.author.username + "/" + msg.author.id, "(" + msg.content + ")")
}

exports.help = {
    'name': 'volume',
    'description': 'show/change the volume on the current playing song from the bot',
    'usage': 'volume or volume [number between 0.1 and 1]'
}
