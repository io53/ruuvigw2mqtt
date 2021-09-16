ARG BUILD_FROM=node:alpine
FROM $BUILD_FROM

WORKDIR /ruuvigw2ha
COPY ./ /ruuvigw2ha

RUN apk add --no-cache yarn
RUN yarn

CMD [ "yarn", "start:supervisor" ]

# Labels
LABEL \
    io.hass.name="RuuviGW MQTT 2 HA" \
    io.hass.description="Broadcast Ruuvi Gateway MQTT messages to HA Auto Discovery" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Kimmo Saari <kirbo@kirbo-designs.com>" \
    org.label-schema.name="RuuviGW MQTT 2 HA" \
    org.label-schema.description="Broadcast Ruuvi Gateway MQTT messages to HA Auto Discovery" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.schema-version="1.0" \
    org.label-schema.usage="https://github.com/kirbo/ha-ruuvi-addons-repository/-/blob/master/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/kirbo/ha-ruuvi-addons-repository" \
    org.label-schema.vendor="HomeAssistant add-ons by Kimmo Saari"
