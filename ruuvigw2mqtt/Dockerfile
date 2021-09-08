ARG BUILD_FROM=alpine
FROM node:14-alpine AS builder

# Local build:
# docker build -t ruuvigwmqtt2ha . && docker run --rm -v $PWD/data/options.example.json:/data/options.json ruuvigwmqtt2ha

ARG BUILD_ARCH
ARG CLI_VERSION

# Move to working directory /build
WORKDIR /build

# Copy static assets into the container
COPY . .

# Download dependencies using yarn
RUN yarn

FROM $BUILD_FROM

ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION=0.0.1

RUN apk add --no-cache libusb-dev bluez-dev linux-headers eudev-dev

# Move to /ruuvigwmqtt2ha directory as the place for resulting binary folder
WORKDIR /ruuvigwmqtt2ha

# Copy binary from build to main folder
# COPY --from=builder /build/entrypoint.sh ./
COPY --from=builder /build ./

# Command to run when starting the container
CMD ["yarn start"]

# Labels
LABEL \
    io.hass.name="Ruuvi Gateway from MQTT to Home Assistant auto-discovery" \
    io.hass.description="Broadcast Ruuvi Gateway sensors from MQTT to HA auto-discovery" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Kimmo Saari <kirbo@kirbo-designs.com>" \
    org.label-schema.description="Broadcast Ruuvi Gateway sensors from MQTT to HA auto-discovery" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="Ruuvi Gateway from MQTT to Home Assistant auto-discovery" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.usage="https://github.com/kirbo/ruuvigw-mqtt-to-ha-auto-discovery/-/blob/master/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/kirbo/ruuvigw-mqtt-to-ha-auto-discovery" \
    org.label-schema.vendor="HomeAssistant add-ons by Kimmo Saari"
