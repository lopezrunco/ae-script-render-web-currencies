var JSONFile = './data.json'
var titleLayers = ['title-1', 'title-2', 'title-3', 'title-4', 'title-5']
var priceLayers = ['price-1', 'price-2', 'price-3', 'price-4', 'price-5']
var stringifiedData = []

function setInfoAndRender(file) {
    // Read JSON file and obtain data
    file.open('r')
    var data = file.read()
    file.close()
    data = JSON.parse(data)
    // Set content in layers
    for (var i = 0; i < titleLayers.length; i++) {
        setContentInLayer(data[i].title, titleLayers[i])
        setContentInLayer(data[i].price, priceLayers[i])
    }
}

function setContentInLayer(content, layer) {
    // Select _render comp
    var comp = app.project.item(1)
    // Select layer and set new text
    var layer = comp.layer(layer)
    var textProp = layer.property("Source Text")
    var textDocument = textProp.value
    textDocument.text = content
    textProp.setValue(textDocument)
}

setInfoAndRender(File(JSONFile))

