const axios = require("axios")
const { JSDOM } = require("jsdom")
const fs = require("fs");

async function scrape() {
    const page = await axios.get("https://en.wikipedia.org/wiki/List_of_WBA_world_champions")
    const html = page.data
    console.log(html); 
    //javascript object with HTML
    const jsdom = new JSDOM(html);
     //console.log(jsdom.window.document); 
     const tableSection = jsdom.window.document.querySelector(".mw-parser-output")
     const tables = tableSection.querySelectorAll("tr");
     //console.log(table.length);

     const champions = []


     for (index =0; index<tables.length; index++){
        const table = tables[index]; 
        const tableItems = table.querySelectorAll('td')

        for(tableItem of tableItems){
        const name = tableItem.querySelector("a")?.title;

//? possible that it is nothing
//it is called optional chaining 
        const linkAddress = tableItem.querySelector("a")?.href;

        //{name:link} 
        

        // let link = tableItem.querySelector("a")
        // let linkAddress = null 
        // if (link){
        //     linkAddress = link.href
        // }
        //console.log(linkAddress )
        //console.log(name)
        champions.push({"name":name,"linkAddress":linkAddress})



       // champions.push(name)
        
           //     let wikipediaUrl = linkAddress.includes("/wiki") ? linkAddress : null;


    //     if (linkAddress) {
    //         const champion = { name: name, wikipediaUrl: wikipediaUrl };
    //         champions.push(champion);

    //     }
            }

     }
    //console.log(champions);


    fs.writeFileSync("WBAChampions.json", JSON.stringify(champions)); 
     }



scrape(); 