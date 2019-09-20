var prefixes = require('./util/data holders/prefixes.json')
var Discord = require("discord.js")
module.exports = {
    //modules
    fs: require('fs'),
    random: require("unique-random-array"),
    get: require("node-fetch"),
    eco: require("discord-economy"),
    settings: require("./util/data holders/guildsettings.json"),
    weeb() {
        const nekoclient = require('nekos.life');
        const { sfw } = new nekoclient();

        return sfw;
    },

    //Other stuff
    racistRegex: /nig(g|)(a|er)|fag(|got|ger|git)|kys|trann(y|ies)/gi,
    inviteRegex: /(http:\/\/|https:\/\/)?(?:discord(?:(?:.|.?dot.?)(?:gg|me|li|to|link)|app(?:.|.?dot.?)com\/invite)|(invite|disco)(?:.|.?dot.?)gg)\/[\da-z]+/,
    idRegex: /[^0-9]/g,

    //functions
    unvaporwave(text) {
        try {
            if (typeof text !== "string") { throw "(text) must be a string, nerd" }
            var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.?!,:;\"'-_+%=$*(){}[]<>|/~\\@&%£#"
                letters = letters.split('')
            var wp = "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ　０１２３４５６７８９．？！，：；＂＇－＿＋％＝＄＊（）｛｝［］＜＞｜／～＼＠＆％￡＃"
                wp = wp.split('')
            return text.split('').map(i => wp.includes(i) ? letters[wp.indexOf(i)] : i).join("")
        } catch (error) { console.log(error) }
    },

    unemojify(text) {
        return text.replace(/🅱/g, "b").replace(/🅾/g, "o").replace(/🅰/g, "a")
    },

    checkCommand(text) {
        try {
            text = this.unvaporwave(text)


            if (typeof text !== "string") { throw "Both text and output must be strings" }
            let prefix = false;
            for (const thisPrefix of prefixes) {
                if (this.unemojify(text.toLowerCase()).startsWith(thisPrefix)) prefix = thisPrefix;
            }

            if (!prefix) return;

            var args = text.slice(prefix.length).trim().split(/ +/g);
            var commandName = this.unemojify(args.shift().toLowerCase());

            var victims = args.map(a => a.replace(/[^0-9]+/g, ""))
            victims = victims.slice(0, victims.indexOf(""))
            var reason = args.slice(victims.length, args.length).join(" ")

            return {
                args,
                name: commandName, //will display the command name OR the alias used (if any)
                command: prefix+commandName, //not only displays the command's name, but also the used prefix
                victims: [...new Set(victims)],
                reason
            } 

            /* 
             * reason and victims are used for commands like ban or kick which accept multiple targets
             * for example: hi!kick [user1] [user2] [reason]
             * non number characters are removed from the targets to turn mentions into plain user IDs
            */
            
        }
        catch (error) { console.log(error) }
    },

    setDefaultSettings(guildid) {
        this.settings[guildid] = this.settings["default"]
        this.fs.writeFile('./util/data holders/guildsettings.json', JSON.stringify(this.settings, null, 2), function (error) {
            if (error) {
                return console.log(error)
            }
        })
    },

    embedImage(zelda) {
        var embed = new Discord.RichEmbed()
            .setImage(zelda)
        return embed
    },

    firstLetterUppercase(string) {
        return string = string.replace(string[0], string[0].toUpperCase())
    },

    vaporwavecolor() {
        var r = (Math.round(Math.random() * 127) + 127).toString(16);
        var g = (Math.round(Math.random() * 127) + 127).toString(16);
        var b = (Math.round(Math.random() * 127) + 127).toString(16);
        return '#' + r + g + b;
    }
}
