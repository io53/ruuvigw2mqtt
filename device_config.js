module.exports = {
    miTemp: {
        device: function (id) {
            return {
                identifiers: ["ruuvigw2mqtt_" + id],
                name: id,
                sw_version: "ruuvigw2mqtt",
                model: "Mi Temperature and Humidity Monitor",
                manufacturer: "Xiaomi"
            }
        },
        tempConfig: function (id) {
            return {
                ...module.exports.common(id, "temperature", "°C"),
                device_class: 'temperature',
                device: module.exports.miTemp.device(id),
            }
        },
        humidityConfig: function (id) {
            return {
                ...module.exports.common(id, "humidity", "%"),
                device_class: 'humidity',
                device: module.exports.miTemp.device(id),
            }
        },
        batteryConfig: function (id) {
            return {
                ...module.exports.common(id, "battery", "%"),
                device_class: 'battery',
                device: module.exports.miTemp.device(id),
            }
        },
        rssiConfig: function (id) {
            return {
                ...module.exports.common(id, "rssi", "dBm"),
                device_class: 'signal_strength',
                device: module.exports.miTemp.device(id),
            }
        }
    },
    miTemp2: {
        device: function (id) {
            return {
                identifiers: ["ruuvigw2mqtt_" + id],
                name: id,
                sw_version: "ruuvigw2mqtt",
                model: "Mi Temperature and Humidity Monitor 2",
                manufacturer: "Xiaomi"
            }
        },
        tempConfig: function (id) {
            return {
                ...module.exports.common(id, "temperature", "°C"),
                device_class: 'temperature',
                device: module.exports.miTemp.device(id),
            }
        },
        humidityConfig: function (id) {
            return {
                ...module.exports.common(id, "humidity", "%"),
                device_class: 'humidity',
                device: module.exports.miTemp.device(id),
            }
        },
        batteryConfig: function (id) {
            return {
                ...module.exports.common(id, "battery", "%"),
                device_class: 'battery',
                device: module.exports.miTemp.device(id),
            }
        },
        voltageConfig: function (id) {
            return {
                ...module.exports.common(id, "voltage", "V"),
                device_class: 'battery',
                device: module.exports.miTemp.device(id),
            }
        },
        rssiConfig: function (id) {
            return {
                ...module.exports.common(id, "rssi", "dBm"),
                device_class: 'signal_strength',
                device: module.exports.miTemp.device(id),
            }
        }
    },
    miPlant: {
        device: function (id) {
            return {
                identifiers: ["ruuvigw2mqtt_" + id],
                name: id,
                sw_version: "ruuvigw2mqtt",
                model: "Mi Flora",
                manufacturer: "Xiaomi"
            }
        },
        tempConfig: function (id) {
            return {
                ...module.exports.common(id, "temperature", "°C"),
                device_class: 'temperature',
                device: module.exports.miPlant.device(id),
            }
        },
        lightConfig: function (id) {
            return {
                ...module.exports.common(id, "light", "lx"),
                device_class: 'illuminance',
                device: module.exports.miPlant.device(id),
            }
        },
        moistureConfig: function (id) {
            return {
                ...module.exports.common(id, "moisture", "%"),
                icon: "mdi:water-percent",
                device: module.exports.miPlant.device(id),
            }
        },
        conductivityConfig: function (id) {
            return {
                ...module.exports.common(id, "conductivity", "µS/cm"),
                icon: "mdi:flash-circle",
                device: module.exports.miPlant.device(id),
            }
        },
        rssiConfig: function (id) {
            return {
                ...module.exports.common(id, "rssi", "dBm"),
                device_class: 'signal_strength',
                device: module.exports.miPlant.device(id),
            }
        }
    },
    ruuviTag: {
        device: function (id) {
            return {
                identifiers: ["ruuvigw2mqtt_" + id],
                name: "Ruuvi_"+id[8]+id[9]+id[10]+id[11],
                sw_version: "ruuvigw2mqtt",
                model: "RuuviTag",
                manufacturer: "Ruuvi Innovations"
            }
        },
        tempConfig: function (id) {
            return {
                ...module.exports.common(id, "temperature", "°C"),
                device_class: 'temperature',
                device: module.exports.ruuviTag.device(id),
            }
        },
        humidityConfig: function (id) {
            return {
                ...module.exports.common(id, "humidity", "%"),
                device_class: 'humidity',
                device: module.exports.ruuviTag.device(id),
            }
        },
        pressureConfig: function (id) {
            return {
                ...module.exports.common(id, "pressure", "hPa"),
                device_class: 'pressure',
                device: module.exports.ruuviTag.device(id),
            }
        },
        voltageConfig: function (id) {
            return {
                ...module.exports.common(id, "voltage", "V"),
                device_class: 'voltage',
                device: module.exports.ruuviTag.device(id),
            }
        },
        rssiConfig: function (id) {
            return {
                ...module.exports.common(id, "rssi", "dBm"),
                device_class: 'signal_strength',
                device: module.exports.ruuviTag.device(id),
            }
        },
        txPowerConfig: function (id) {
            return {
                ...module.exports.common(id, "txPower", ""),
                device: module.exports.ruuviTag.device(id),
            }
        },
        accelerationXConfig: function (id) {
            return {
                ...module.exports.common(id, "accelerationX", "g"),
                device: module.exports.ruuviTag.device(id),
            }
        },
        accelerationYConfig: function (id) {
            return {
                ...module.exports.common(id, "accelerationY", "g"),
                device: module.exports.ruuviTag.device(id),
            }
        },
        accelerationZConfig: function (id) {
            return {
                ...module.exports.common(id, "accelerationZ", "g"),
                device: module.exports.ruuviTag.device(id),
            }
        },
        movementCounterConfig: function (id) {
            return {
                ...module.exports.common(id, "movementCounter", ""),
                device: module.exports.ruuviTag.device(id),
            }
        },
        measurementSequenceNumberConfig: function (id) {
            return {
                ...module.exports.common(id, "measurementSequenceNumber", ""),
                device: module.exports.ruuviTag.device(id),
            }
        },
        dataFormatConfig: function (id) {
            return {
                ...module.exports.common(id, "dataFormat", ""),
                device: module.exports.ruuviTag.device(id),
            }
        },
    },
    common: function (id, type, unit_of_measurement) {
        return {
            unit_of_measurement: unit_of_measurement,
            value_template: "{{ value_json."+type+" }}",
            state_topic: "homeassistant/" + id,
            json_attributes_topic: "homeassistant/" + id,
            name: id + "_"+type,
            unique_id: id + "_"+type+"_homeassistant",
            device: module.exports.miPlant.device(id),
            //availability_topic: "homeassistant/" + id + "/availability"
        }
    }
}
