import fetch from "node-fetch";
import { Manager, PlayerModel, TransferedPlayer, posKeys } from "./model";
import {readFileSync, writeFileSync} from 'fs'
import * as venom from 'venom-bot';
import { Client, Events, GatewayIntentBits, Message, REST, Routes, TextChannel } from 'discord.js';
const { token, username, password } = require('../config.json');

const BROADCAST_MSG = true;
const Discord = true;

var disClient: Client<boolean>;
var wbaClient: venom.Whatsapp;


if (BROADCAST_MSG)

    if (Discord) {

        disClient = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]});
        disClient.once(Events.ClientReady, async readyClient =>  {
            console.log(`Ready! Logged in as ${readyClient.user.tag}`);
            Start();
        });
        disClient.login(token);

    } else {

        venom.create({ session: "dacoach" }).then((cl) => {
            wbaClient = cl;
            Start();
            console.log("Mustafa da coach started listening for deals...");
        })

    }
else
    Start();

async function broadCast(msg: string) {
    console.log(msg);
    if (!BROADCAST_MSG) return;

    if (Discord) {
        const channel :  TextChannel= ( await disClient.channels.fetch('1202402936399994972')) as  TextChannel;
        channel.send(msg);

    } else {
        if (BROADCAST_MSG)
            wbaClient.sendText('120363226634886216@g.us', msg);
    }

}

function creatGuild(): string { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (n) { var t = Math.random() * 16 | 0, i = n === "x" ? t : t & 3 | 8; return i.toString(16) }) }

async function RequestTokens(){
    var logInData = [
        `userName=${username}`,
        "grant_type=password",
        "client_id=jPs3vVbg4uYnxGoyunSiNf1nIqUJmSFnpqJSVgWrJleu6Ak7Ga",
        "client_secret=ePOVDMfAvU8zcyfaxLMtqYSmND3n6vmmKx9ZlVnNGjGkzucMCt",
        `password=${password}`
    ];

    var header = {
        "Accept-Language": "en-GB, en-GB",
        PlatformId: "13",
        Appversion: '3.195.0',
        isEmptyResultValid: "False",
        useFirstOrDefault: "False"
    }

    

    var responce = await fetch('https://web-api.onlinesoccermanager.com/api/token?' + logInData.join('&'),
        {
            headers: header,
            method: 'POST',
        });
    // console.log(await responce.text());

    var result = await responce.json();
    
    var access_token: string = result["access_token"];
    var refresh_token: string = result["refresh_token"];

    return access_token;
}


async function Start() {
    var access_token = await RequestTokens();
    console.log("Mustafa da coach logged in ...");



    var oldPlayerList: PlayerModel[] = [];
    var history: TransferedPlayer[] = [];
    var lastTimeStamp: number = Number.MAX_VALUE;

    setInterval(async () => {
        try{
        var guild = "batch_" + creatGuild();
        // var auth = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY2ODQ3Njg1OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJaaWFkIEdhbWVyWVQiLCJ3b3JsZCI6IjEiLCJ0ZWFtIjpbIjExMzE2MjM1OSwxIiwiMTY3NjAwMDQsMTAiXSwibmJmIjoxNzA2MzYyODg3LCJleHAiOjE3MDYzNjQwODcsImlzcyI6Ik9TTS5BdXRoZW50aWNhdGlvbiJ9.F13v8Qs5tFMsA4sXaUGO9eIu6lDooFzUjC649ImjDyU"

        var o = {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "multipart/mixed; boundary=" + guild,
            "Accept-Language": "en-GB, en-GB",
            PlatformId: "13",
            AppVersion: '3.195.0',
            Authorization: "Bearer " + access_token
        }

        var i: string[] = [];

        i.push("--" + guild);
        i.push("Content-Type: application/http; msgtype=request", "");
        i.push("GET" + " " + '/v1/leagues/16760004/teams/10/transferplayers/0' + " HTTP/1.1");
        i.push("Host: " + 'web-api.onlinesoccermanager.com/api');
        i.push("", "")

        i.push("--" + guild);
        i.push("Content-Type: application/http; msgtype=request", "");
        i.push("GET" + " " + '/v1/leagues/16760004/transfers?limit=10' + " HTTP/1.1");
        i.push("Host: " + 'web-api.onlinesoccermanager.com/api');
        i.push("", "")

        i.push("--" + guild);
        i.push("Content-Type: application/http; msgtype=request", "");
        i.push("GET" + " " + '/v1/leagues/16760004/managerswithoutpoints' + " HTTP/1.1");
        i.push("Host: " + 'web-api.onlinesoccermanager.com/api');
        i.push("", "")

        i.push("--" + guild + "--", "");

        var r = i.join("\r\n");

        var responce = await fetch('https://web-api.onlinesoccermanager.com/api/batch',
            {
                headers: o,
                method: 'POST',
                body: r
            }
        );
        var result = await responce.text()

        writeFileSync("./output.txt", result)

        var newPlayers: PlayerModel[] = JSON.parse(result.split('\r\n')[5]);
        var newHistory: TransferedPlayer[] = history = JSON.parse(result.split('\r\n')[11]);
        var managers: Manager[] = JSON.parse(result.split('\r\n')[17]);

        function GetManagerName(teamId: number) {
            var m = managers.find((x) => x.teamId == teamId);
            return m == undefined ? "Computer" : m.name;
        }

        if (oldPlayerList.length > 0) {
            //Added players
            for (let i = 0; i < newPlayers.length; i++) {
                const element = newPlayers[i];
                if (oldPlayerList.find((e) => e.player.fullName == element.player.fullName) == undefined) {
                    var manager_name = GetManagerName(element.player.teamId);
                    // broadCast(`➕${manager_name == "Computer"? "💻" : ""} ${element.player.fullName} (${element.player.age}) : ${posKeys[element.player.specificPosition]} : (${element.player.statAtt} / ${element.player.statDef} / ${element.player.statOvr}) (${(element.price / 1_000_000).toFixed(2)})M \nwas added by ${manager_name}`);
                    broadCast(`➕${manager_name == "Computer"? "💻" : ""} ${element.player.fullName} (${element.player.age}) : ${posKeys[element.player.specificPosition]} : (${(element.price / 1_000_000).toFixed(2)})M\n   (${element.player.statAtt} / ${element.player.statDef} / ${element.player.statOvr})  \nwas added by ${manager_name}`);
                    
                }
            }

            //Transfered Players
            for (let i = 0; i < history.length; i++) {
                const element = history[i];
                if (element.timestamp > lastTimeStamp) {
                    // element.destinationTeam.
                    var manager_nameSrc = GetManagerName(element.sourceTeam.id);
                    var manager_nameDist =  GetManagerName(element.destinationTeam.id)
                    var srcSumbol = manager_nameSrc == "Computer"? "💻" : "🧍🏻‍♂️"
                    var disSumbol = manager_nameDist == "Computer"? "💻" : "🧍🏻‍♂️"
                    broadCast(`${srcSumbol} => ${disSumbol} ${element.player.fullName} (${element.player.age}) : ${posKeys[element.player.specificPosition]} : (${(element.price / 1_000_000).toFixed(2)})M \nMoved from *${element.sourceTeam.name}* to *${element.destinationTeam.name}*`)
                }
            }

            //Removed players but not transfered
            for (let i = 0; i < oldPlayerList.length; i++) {
                const element = oldPlayerList[i];
                if (newPlayers.find((e) => e.player.fullName == element.player.fullName) == undefined) { //Removed but not unkown by who?
                    if (history.find((t) => t.timestamp > lastTimeStamp && t.player.fullName == element.player.fullName) == undefined) {
                        var manager_name = GetManagerName(element.player.teamId);
                        broadCast(`➖${manager_name == "Computer"? "💻" : ""} ${element.player.fullName} (${element.player.age}) : ${posKeys[element.player.specificPosition]} : (${(element.price / 1_000_000).toFixed(2)})M\n   (${element.player.statAtt} / ${element.player.statDef} / ${element.player.statOvr})  \nwas removed by ${manager_name}`);
                    }
                }
            }
        }

        oldPlayerList = newPlayers;
        lastTimeStamp = history.length > 0 ? history[0].timestamp : Number.MAX_VALUE;

        }catch{
            console.log("Error: Requesting new token")
            access_token = await RequestTokens();
            console.log(`New token ${access_token}`)
        }

    }, 5 * 1000);

}
