console.log("OsmBot 1.0.0v");

declare global {
    interface Window {
        ko: any;
    }
}

const username = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;

import * as venom from 'venom-bot';

import path from "path";
import { PlayerModel,TransferedPlayer, posKeys } from "./model";

var LastPlayerList: Array<PlayerModel> = [];

import puppeteer from "puppeteer";
import { setInterval } from "timers";

var client : venom.Whatsapp;

venom.create({
    session : "dacoach",
})
.then ((cl)=>{
    client = cl;
    start(cl);
    init();
    console.log("Mustafa da coach started listening for deals...");
})

function broadCast(msg : string){
    // client.sendText()
    client
          .sendText('120363226634886216@g.us', msg);
}

function start(client : venom.Whatsapp) {
    client.onMessage((message) => {
      if(message.body === 'ID'){
        client
          .sendText(message.from, message.from);
          console.log( message.from);

      }
    })
}




//Removed Played
//Added Player
//Transfered Player


async function init(){

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();


    page.on('error', (e)=>page.reload());

    await page.goto("https://en.onlinesoccermanager.com/Login", {
        waitUntil: "networkidle0",
    });

    try{
    page.evaluate(() => {
        var url = document.URL;
        if (url.includes("PrivacyNotice")) {
            let allowButton: HTMLButtonElement | null = document.querySelector(
                ".btn-new.btn-orange"
            );
            window.ko.dataFor(allowButton).continueToOSM(true);
        }
    });
    }catch{}
    console.log("OSM : Privacy Page --Pressing Allow--");

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    try{
    page.evaluate(() => {
        let loging: HTMLButtonElement | null =
            document.querySelector(".btn-alternative");
        loging?.click();
    });
}catch{}

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    try{
    page.evaluate(() => {
        let name: HTMLInputElement | null = document.querySelector("#manager-name");
        if (name != null) name.value = "Fizeron";

        let pass: HTMLInputElement | null = document.querySelector("#password");
        if (pass != null) pass.value = "zxcv1234";

        var auth = window.ko.dataFor(
            document.querySelector("#login")?.parentElement
        );
        auth.managerName(username);
        auth.password(password);
        auth.login(); //LeaguesService
    });
}catch{}
    await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 0 });
    // .catch(()=>{
    //     page.reload({waitUntil:'networkidle0'});
    // })

    // let user = await page.evaluate(() => {
    //     var _user = window.ko
    //         .dataFor(document.querySelector("#page-content"))
    //         .userPartial();
    //     console.log(_user.teamSlots);

    //     return JSON.stringify(_user);
    // });

    try{
    await page.evaluate(()=>{
        window.appViewModel.switchSlot(0,0);
    })
    // await page.click(".clubslot-column");
}catch{}
    await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 0 });

    await page.goto("https://en.onlinesoccermanager.com/TransferList", {
        waitUntil: "networkidle0",
        timeout: 0,
    });

    const historyPage = await browser.newPage();
    historyPage.goto("https://en.onlinesoccermanager.com/Transferlist#transfer-history", {
        waitUntil: "networkidle0",
        timeout: 0,
    });

    let count = 0;
    var OldPlayerList : PlayerModel[] = []; 
    var newPlayers : PlayerModel[] = []; 
    var removedPlayerList : PlayerModel[] = []; 

    var history : TransferedPlayer[]=[];
    var newHistory : TransferedPlayer[]=[];
    var lastTimeStamp : number = Number.MAX_VALUE;

    setInterval( async ()=>{

        try{
        let historyStr = await historyPage.evaluate(()=>{
            var history : TransferedPlayer[] = window.ko.dataFor(document.querySelector("#body-content")).transfersPartial().getItems();
        
            return JSON.stringify(history);
        });

        history = JSON.parse(historyStr);
        await historyPage.reload();

        if(history == undefined) return;
        newHistory = [];
        for(let i = 0; i < history.length; i++){
            if(history[i].timestamp > lastTimeStamp){
                newHistory.push(history[i]);
            }else {
                break;
            }
        }

        // if(newTransfers.length > 0)
        //     lastTimeStamp = newTransfers[0].timestamp;
        var playersstr = await page.evaluate(()=>{
            let names : string[] = [];
            var playersList : PlayerModel[] = [];

            var transferService = window.ko.dataFor(document.querySelector("#body-content")).transferPlayersGroupablePartial();

            var lines = transferService.getPlayers().length;
            for(let x = 0; x < lines; x++){
                var count : number =  transferService.getPlayers()[x].players.count();
                for(let i =0; i < count; i++){
                    var player : PlayerModel = transferService.getPlayers()[x].players.getItems()[i];
                    playersList.push(player);
                    names.push(player.player.fullName + ", Rate: " + player.player.statAtt + ", Price: " + player.price, );
                } 
            }

            window.ko.dataFor(document.querySelector("#body-content")).refreshTransferlist()

            return JSON.stringify(playersList);
            return JSON.stringify(names);
        });
        count++;
        if(count * 5000 > 60 * 1000){
            page.reload();
            count = 0;
        }

        var players : PlayerModel[] = JSON.parse(playersstr);
        newPlayers = [];
        removedPlayerList = []

        if(OldPlayerList.length != 0){
        // console.log(players)
        for(let i = 0; i < players.length; i++){
            var match = OldPlayerList.find((e) => e.player.fullName == players[i].player.fullName);
            if(match == undefined){
                newPlayers.push(players[i]);
            }
        }

        for(let i = 0; i < OldPlayerList.length; i++){
            var match  = players.find((e) => e.player.fullName == OldPlayerList[i].player.fullName);
            if(match == undefined){
                removedPlayerList.push(OldPlayerList[i]);
            }
        }

    
       
        if(newPlayers.length != 0){
            console.log("New Added players:");
            newPlayers.forEach(element => {
                broadCast(`${element.player.fullName} : ${posKeys[element.player.position]} : (${element.player.statAtt} / ${element.player.statDef} / ${element.player.statOvr}) (${(element.price / 1_000_000).toFixed(2)})M \n was added by ${element.player.team?.manager.name}` );
            });
            console.log(" ");
        }

        if(removedPlayerList.length != 0){

            for(let i = 0; i < removedPlayerList.length; i++){ //Removed by player
                var element = removedPlayerList[i];
                if(newHistory.find((k)=> removedPlayerList[i].player.fullName == k.player.fullName) == undefined){
                    broadCast(`${element.player.fullName} : ${posKeys[element.player.position]} : (${element.player.statAtt} / ${element.player.statDef} / ${element.player.statOvr}) (${(element.price / 1_000_000).toFixed(2)})M \n was removed by ${element.team.manager.name}`)
                }
            }

            for(let i = 0; i < removedPlayerList.length; i++){ //Removed by player
                var element = removedPlayerList[i];
                if(newHistory.find((k)=> removedPlayerList[i].player.fullName == k.player.fullName) != undefined){
                    broadCast(`${element.player.fullName} : ${posKeys[element.player.position]} : (${element.player.statAtt} / ${element.player.statDef} / ${element.player.statOvr}) (${(element.price / 1_000_000).toFixed(2)})M \n Moved to ${element.team.name}`)
                }
            }

            // console.log("Sold players:");
            // removedPlayerList.forEach(element => {
            //     console.log(element.player.fullName);
            // });
            console.log(" ");
        }


        // console.log("All players:");
        // let names : string[] = players.map((e)=>e.player.fullName);
        // names.forEach(element => {
        //     console.log(element);
        // });
        }
        OldPlayerList = players;
        lastTimeStamp = history.length > 0 ? history[0].timestamp : Number.MAX_VALUE;
        }catch{
            page.reload();
            historyPage.reload();
        }

    }, 5000);

    // await page.goto("https://en.onlinesoccermanager.com/TransferList#transfer-history");

    // console.log(JSON.parse(user).teamSlots);

    //<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>
    //window.ko.dataFor(document.querySelector("#body-content")).transferPlayersGroupablePartial().getPlayers()[0].players.getItems()[0]


    // ko.dataFor(document.querySelector(".row.row-h-md-22")).refreshTransferlist()
    // await page.waitForNavigation({waitUntil:"networkidle0", timeout:0})

    // window.ko.dataFor(document.querySelector('thead')).players._items()

    //I commented this on 1/21/24
    // setInterval(async () => {
    //     let playersJsons = await page.evaluate(async () => {
    //         // await page.reload({ waitUntil: 'networkidle0', timeout: 0 });
    //         // window.ko.dataFor(document.querySelectorAll('.thead')).players
    //         let _players: Array<string> = [];
    //         document.querySelectorAll(".thead").forEach((x) => {
    //             let count = window.ko.dataFor(x).players.count();
    //             var list = window.ko.dataFor(x).players._items();
    //             for (let index = 0; index < count; index++) {
    //                 _players.push(JSON.stringify(list[index]));
    //             }
    //         });
            
    //         window.ko
    //             .dataFor(document.querySelector(".row.row-h-md-22"))
    //             .refreshTransferlist();
    //         return _players;
    //     });

    //     let players = playersJsons.map((value: string) => (JSON.parse(value) as PlayerModel))
    //     let newPlayers: Array<PlayerModel> = []
    //     if (LastPlayerList.length > 0) {
    //         players.forEach(player => {
    //             if (!LastPlayerList.find(x => x.id == player.id)) {
    //                 newPlayers.push(player);
    //             }
    //         });
    //     }
    //     // console.log(`OSM [${new Date().toLocaleTimeString()}] : NewPlayers{${newPlayers.length}} LastPlayers{${LastPlayerList.length}} \n Players{${players.length}}`)
    //     // console.log(`OSM [${new Date().toLocaleTimeString()}]: NewPlayers {${newPlayers.length}} : ${newPlayers}`)
    //     newPlayers.forEach(x => OnPlayerAdd(x));

    //     if (players.length != 0)
    //         LastPlayerList = players;

    // }, 10 * 1000);
};

var OnPlayerAdd = function (player: PlayerModel) {
    console.log(
        `OSM Bot [${new Date().toLocaleTimeString()}]: ${player.player.name} (${player.player.age} year) (${posKeys[player.player.specificPosition]}) was Added for ${player.transferPrice}$`
    );
};