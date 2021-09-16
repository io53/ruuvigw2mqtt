**v1.4.0** (2021-09-16)

- User definable decimals, battery minimum, battery maximum and battery low level settings.
  Please take a look into Configuration and add these values, if missing:
  ```yaml
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
