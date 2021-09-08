# Ruuvi Gateway MQTT messages to Auto Discovery

## Installation

### Adding the repository to Supervisor
Either open [this link](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fkirbo%2Fruuvigw-mqtt-to-ha-auto-discovery.git) and continue from step 5,
or follow the steps:

1. Navigate to Supervisor -> Add-on Store
2. Click the 3 dots on the upper right corner
3. Select "Repositories"
4. At the end of the modal, fill the Input with: `https://github.com/kirbo/ruuvigw-mqtt-to-ha-auto-discovery.git`
5. Click "Add"
6. Click "Close"
7. Scroll at the end of the Add-on Store page and click the "Ruuvi Gateway MQTT messages to Auto Discovery"
8. Click "Install"
9. Update your configurations by clicking the "Configuration" up top
10. Click "Save"
11. Navigate back to "Info" and click "Start"

### Running manually from command line

```shell
git clone https://github.com/kirbo/ruuvigw-mqtt-to-ha-auto-discovery.git
cd ruuvigw-mqtt-to-ha-auto-discovery/ruuvigw2mqtt
cp data/options.example.json data/options.json
nano options.json # Modify the configuration with the editor of your choice
yarn
yarn start
```
