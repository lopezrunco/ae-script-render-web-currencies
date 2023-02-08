const axios = require('axios')      // Promise-based HTTP client for the browser and node.js
const cheerio = require('cheerio')  // Parses markup and provides an API for traversing/manipulating the resulting data structure
const fs = require('fs')            // File System module

const url = "https://www.bcu.gub.uy/Paginas/Default.aspx"
const itemsIDs = [2225, 2230, 1111, 501, 1001, 9800]
let list = []

async function scrape() {
    console.log(`Scraping ${url}...`)
    try {
        // Fetch & load html
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        itemsIDs.forEach(element => {
            // Select div tags
            const item = $(`div#${element}`)
            // Populate the currency object with the selected elements
            const title = $(item).find('div.info span:first-child').text()
            const price = $(item).find('div.info span:last-child').text()
            const icon = $(item).find('img').attr('src')
            let currencyItem = new Object({
                title: title,
                price: price,
                icon: icon
            })
            list.push(currencyItem)
        })
        // Create currency.json file
        fs.writeFile('data.json', JSON.stringify(list, null, 2), (error) => {
            if (error) {
                console.error(error)
                return
            }
            console.log('Done!')
        })
    } catch (error) {
        console.log(error)
    }
}
scrape()