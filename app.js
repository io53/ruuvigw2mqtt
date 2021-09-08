const ruuviParser = require("./ruuvi/parser");
const dc = require("./device_config");
var mqtt = require('mqtt')
var pjson = require('./package.json')

var timeBetweenData = pjson.update_limit * 1000; // ms
var lastSent = {};
var mqttOpts = {
    clientId: 'ruuvigw2mqtt_'+Math.random().toString(16).substr(2,8),
    username: pjson.mqtt_username,
    username: pjson.mqtt_password,
}

var client = mqtt.connect(pjson.mqtt_address, mqttOpts)
client.on('connect', function () {
    console.log("mqtt connected");
    client.subscribe(pjson.ruuvi_topic)
})

client.on('close', function () {
    console.log("mqtt disconnected");
});

client.on('error', function (err) {
    console.log("mqtt error "+err);
});

client.on('message', function (topic, message) {
    //console.log(topic, message.toString());
    var payload = JSON.parse(message.toString());
    if (payload && payload.data) {
        var mac = /[^/]*$/.exec(topic)[0];
        handleData(payload, mac)
    } else {
        console.log(topic, message.toString())
    }
});

function send(id, payload) {
    console.log(pjson.ha_topic + id, JSON.stringify(payload));
    client.publish(pjson.ha_topic + id, JSON.stringify(payload))
}

function sendConfig(id, type, payload) {
    console.log(pjson.ha_topic+"sensor/" + id + "/" + type + "/config", JSON.stringify(payload));
    client.publish(pjson.ha_topic+"sensor/" + id + "/" + type + "/config", JSON.stringify(payload), { retain: true })
}

function handleData(sr, mac) {
    mac = mac.split(":").join("")
    if (sr.data.indexOf("FF9904") !== -1) {
        // ruuvitag
        let adv = Buffer.from(sr.data.split("FF9904")[1], "hex")
        let dataFormat = adv[0];
        var ruuvitag = {
            dataFormat: dataFormat,
            rssi: sr.rssi,
            ...ruuviParser(sr.data),
        }
        ruuvitag.voltage = ruuvitag.battery;
        delete ruuvitag.battery;
        updated(mac, "RuuviTag", ruuvitag);
        return
    }
    if (sr.data.indexOf("02010603029") !== -1) {
        // mi flora
        var data = hexToBytes(sr.data)
        var dataType = data[23];
        var out = {};
        switch (dataType) {
            case 7: // LIGHT
                out.light = parseInt(intToHex(data[data.length - 1]) + intToHex(data[data.length - 2]) + intToHex(data[data.length - 3]), 16);
                break;
            case 9: // COND 
                out.conductivity = parseInt(intToHex(data[data.length - 1]) + intToHex(data[data.length - 2]), 16);
                break;
            case 8: // MOISTURE
                out.moisture = (data[data.length - 1]);
                break;
            case 4: // TEMP
                out.temperature = parseInt(intToHex(data[data.length - 1]) + intToHex(data[data.length - 2]), 16) / 10.0;
                break;
            default:
                console.log("Flower unknown dataType", dataType);
                return;
        }
        out.rssi = sr.rssi;
        updated(mac, "Flower care", out);
        return
    }
    if (sr.data.indexOf("10161A18A4C") !== -1) {
        // flashed ATC
        var data = hexToBytes(sr.data)
        var out = {};
        out.temperature = parseInt(intToHex(data[10]) + intToHex(data[11]), 16) / 10.0;
        out.humidity = parseInt(intToHex(data[12]), 16);
        out.battery = parseInt(intToHex(data[13]), 16);
        out.voltage = parseInt(intToHex(data[14]) + intToHex(data[15]), 16) / 1000.0;
        out.rssi = sr.rssi;
        updated(mac, "ACT_MI_TEMP", out)
        return
    }
    if (sr.data.indexOf("020106151695FE") !== -1) {
        // xiaomi round temperature & humidity sensor
        var data = hexToBytes(sr.data)
        var dataType = data[18];
        var out = {};
        switch (dataType) {
            case 13: // temp and humidity
                out.humidity = parseInt(intToHex(data[data.length - 1]) + intToHex(data[data.length - 2]), 16) / 10.0;
                out.temperature = parseInt(intToHex(data[data.length - 3]) + intToHex(data[data.length - 4]), 16) / 10.0;
                break;
            case 10: // battery
                out.battery = data[data.length - 1];
                break;
            case 6: // humidity
                out.humidity = parseInt(intToHex(data[data.length - 1]) + intToHex(data[data.length - 2]), 16) / 10.0;
                break;
            case 4: // temp 
                out.temperature = parseInt(intToHex(data[data.length - 1]) + intToHex(data[data.length - 2]), 16) / 10.0;
                break;
            default:
                console.log("MiTemp unknown dataType", dataType);
                return;
        }
        out.rssi = sr.rssi;
        updated(mac, "MJ_HT_V1", out);
        return
    }
}

var things = {};

function updated(id, type, data) {
    for (const key in data) {
        if (things[id] !== undefined && things[id][key] !== undefined) continue;
        switch (key) {
            case "temperature":
                if (type === "MJ_HT_V1") {
                    var rep = dc.miTemp.tempConfig(id);
                    sendConfig(id, "temperature", rep)
                } else if (type === "Flower care") {
                    var rep = dc.miPlant.tempConfig(id);
                    sendConfig(id, "temperature", rep)
                } else if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.tempConfig(id);
                    sendConfig(id, "temperature", rep)
                } else if (type === "ACT_MI_TEMP") {
                    var rep = dc.miTemp2.tempConfig(id);
                    sendConfig(id, "temperature", rep)
                }
                break;
            case "rssi":
                if (type === "MJ_HT_V1") {
                    var rep = dc.miTemp.rssiConfig(id);
                    sendConfig(id, "rssi", rep)
                } else if (type === "Flower care") {
                    var rep = dc.miPlant.rssiConfig(id);
                    sendConfig(id, "rssi", rep)
                } else if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.rssiConfig(id);
                    sendConfig(id, "rssi", rep)
                } else if (type === "ACT_MI_TEMP") {
                    var rep = dc.miTemp2.rssiConfig(id);
                    sendConfig(id, "rssi", rep)
                }
                break;
            case "humidity":
                if (type === "MJ_HT_V1") {
                    var rep = dc.miTemp.humidityConfig(id);
                    sendConfig(id, "humidity", rep)
                } else if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.humidityConfig(id);
                    sendConfig(id, "humidity", rep)
                } else if (type === "ACT_MI_TEMP") {
                    var rep = dc.miTemp2.humidityConfig(id);
                    sendConfig(id, "humidity", rep)
                }
                break;
            case "voltage":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.voltageConfig(id);
                    sendConfig(id, "voltage", rep)
                } else if (type === "ACT_MI_TEMP") {
                    var rep = dc.miTemp2.voltageConfig(id);
                    sendConfig(id, "voltage", rep)
                }
                break;
            case "pressure":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.pressureConfig(id);
                    sendConfig(id, "pressure", rep)
                }
                break;
            case "txPower":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.txPowerConfig(id);
                    sendConfig(id, "txPower", rep)
                }
                break;
            case "accelerationX":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.accelerationXConfig(id);
                    sendConfig(id, "accelerationX", rep)
                }
                break;
            case "accelerationY":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.accelerationYConfig(id);
                    sendConfig(id, "accelerationY", rep)
                }
                break;
            case "accelerationZ":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.accelerationZConfig(id);
                    sendConfig(id, "accelerationZ", rep)
                }
                break;
            case "movementCounter":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.movementCounterConfig(id);
                    sendConfig(id, "movementCounter", rep)
                }
                break;
            case "measurementSequenceNumber":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.measurementSequenceNumberConfig(id);
                    sendConfig(id, "measurementSequenceNumber", rep)
                }
                break;
            case "dataFormat":
                if (type === "RuuviTag") {
                    var rep = dc.ruuviTag.dataFormatConfig(id);
                    sendConfig(id, "dataFormat", rep)
                }
                break;
            case "battery":
                if (type === "MJ_HT_V1") {
                    var rep = dc.miTemp.batteryConfig(id);
                    sendConfig(id, "battery", rep)
                } else if (type === "ACT_MI_TEMP") {
                    var rep = dc.miTemp2.batteryConfig(id);
                    sendConfig(id, "battery", rep)
                }
                break;
            case "light":
                if (type === "Flower care") {
                    var rep = dc.miPlant.lightConfig(id);
                    sendConfig(id, "light", rep)
                }
                break;
            case "conductivity":
                if (type === "Flower care") {
                    var rep = dc.miPlant.conductivityConfig(id);
                    sendConfig(id, "conductivity", rep)
                }
                break;
            case "moisture":
                if (type === "Flower care") {
                    var rep = dc.miPlant.moistureConfig(id);
                    sendConfig(id, "moisture", rep)
                }
                break;
            default:
                console.log("No handler for " + key)
                break;
        }
    }

    if (things[id] === undefined) {
        things[id] = data;
    } else {
        things[id] = Object.assign(things[id], data);
    }
    if (lastSent[id] !== undefined) {
        if (lastSent[id] + timeBetweenData > new Date().getTime()) return;
    }
    lastSent[id] = new Date().getTime();
    send(id, things[id]);
}

function intToHex(val) {
    return ("00" + val.toString(16)).slice(-2);
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
