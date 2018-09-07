JSON.stringify(
    $("tr")
        .toArray()
        .map(tr => $(tr).find("td.small").toArray())
        .filter(tds => tds.length === 6)
        .map(row => ({
            id: Number($(row[1]).find("a").attr("href").substr(14)),
            name: $(row[1]).text(),
            bookCount: row[2].innerHTML,
        }))
    , null, 2)