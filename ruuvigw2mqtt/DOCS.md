## Configuration

|Option|Type|Default|Required|Description|
|------|----|-------|--------|-----------|
|mqtt_protocol|string|mqtt|x|MQTT Broker protocol|
|mqtt_host|string|core-mosquitto|x|MQTT Broker host|
|mqtt_port|integer|1884|x|MQTT Broker port|
|mqtt_credentials|object||x|MQTT Broker credentials object|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;client_id|string|ruuvi-gw-mqtt-to-ha|x|MQTT Broker Client ID|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username|string||x|MQTT Broker Username|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password|string||x|MQTT Broker Password|
|mqtt_ha_topic|string|homeassistant/|x|Home Assistant topic|
|mqtt_ruuvi_topic|string|ruuvi/#|x|Topic where you defined Ruuvi Gateway to publish messages|
|mqtt_parsed_ruuvi_topic|string|ruuvi/parsed/|-|Topic where you want this add-on to publish parsed JSON data|
|update_interval|integer|60|-|Interval how often you would like the messages to be parsed|
|decimals|object|||Configurations for decimals|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;humidity|integer|2|-|How many decimals you would want humidity to have.<br>Range: 0 - 4|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temperature|integer|2|-|How many decimals you would want temperature to have.<br>Range: 0 - 4|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pressure|integer|2|-|How many decimals you would want pressure to have.<br>Range: 0 - 4|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;battery|integer|0|-|How many decimals you would want battery to have.<br>Range: 0 - 4|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;voltage|integer|2|-|How many decimals you would want voltage to have.<br>Range: 0 - 4|
|battery|object|||Configurations for battery limits|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minimum|integer|2000|-|At which voltage do you want it to be 0%.<br>Range: 1800 - 2000|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maximum|integer|3000|-|At which voltage do you want it to be 100%.<br>Range: 3000 - 3400|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;low_battery|integer|2100|-|At which voltage do you want "low battery" to be set on.<br>Range: 2000 - 2500|

Default configuration is as following:
```yaml
mqtt_protocol: mqtt
mqtt_host: core-mosquitto
mqtt_port: 1883
mqtt_credentials:
  client_id: ruuvi-gw-mqtt-to-ha
  username: 
  password: 
mqtt_ha_topic: homeassistant/
mqtt_ruuvi_topic: ruuvi/#
mqtt_parsed_ruuvi_topic: ruuvi/parsed/
update_interval: 60
decimals:
  humidity: 2
  temperature: 2
  pressure: 2
  battery: 0
  voltage: 2
battery:
  minimum: 2000
  maximum: 3000
  low_battery: 2100
```
