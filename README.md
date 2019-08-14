# Home Assistant Config
Partial Home Assistant configuration with themes, templates and views

## Status of: 2019.08.13
My config is heavily based on custom Lovelace cards, themes and decluttering templates.

## Hemera and Nyx themes
I'm using two themes, [Hemera](https://github.com/AmoebeLabs/Hemera_Theme-01-Orange_Blue) (Day) and [Nyx](https://github.com/AmoebeLabs/Nyx_Theme-01-Orange_Blue) (Night).

These themes support of course Home Assistant but also some Lovelace components

It has built-in support for the following custom components:
- The [custom thermostat card](https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card)
- The [custom simple weather card](https://github.com/kalkih/simple-weather-card)
- The awesome [custom button card](https://github.com/custom-cards/button-card)
- The great [custom mini graph card](https://github.com/kalkih/mini-graph-card)
- The [custom air visual card](https://github.com/dnguyen800/air-visual-card)

## How does it look like?
The below screenshots show some mobile examples of the day and night theme, and the custom components side by side.

### Hemera 01 day theme
Based on the [Hemera 01](https://github.com/AmoebeLabs/Hemera_Theme-01-Orange_Blue) light grey/orange/blue day theme:

![1](https://github.com/AmoebeLabs/Hemera_Theme-01-Orange_Blue/blob/master/screenshots/hemera-01-examples01.png)

![2](https://github.com/AmoebeLabs/Hemera_Theme-01-Orange_Blue/blob/master/screenshots/hemera-01-examples02.png)

### Nyx 01 night theme
Based on the [Nyx 01](https://github.com/AmoebeLabs/Nyx_Theme-01-Orange_Blue) black/orange/blue theme:

![1](https://github.com/AmoebeLabs/Nyx_Theme-01-Orange_Blue/blob/master/screenshots/nyx-01-examples01.png)

![2](https://github.com/AmoebeLabs/Nyx_Theme-01-Orange_Blue/blob/master/screenshots/nyx-01-examples02.png)

### Nyx 03 night theme
And the fully Teal Green [Nyx 03](https://github.com/AmoebeLabs/Nyx_Theme-03-Teal_Teal) teal/teal/teal theme:

![1](https://github.com/AmoebeLabs/Nyx_Theme-03-Teal_Teal/blob/master/screenshots/nyx-03-examples01.png)

![2](https://github.com/AmoebeLabs/Nyx_Theme-03-Teal_Teal/blob/master/screenshots/nyx-03-examples02.png)

## Relation between theme, decluttering templates and views/cards
The theme, templates and cards are related in the sense that the template is using the theme settings, and the cards the template settings, ie: theme --> template --> cards.

Below a light button example for the state "On"

The theme defines the colors:
``` yaml
#
# Entity state = 'on'

theme-button-card-color-state-on:          'rgba(255, 255, 255, 1.0)'
theme-button-area-color-state-on:          'var(--primary-text-color)'
theme-button-icon-color-state-on:          'var(--paper-item-icon-active-color)'
theme-button-label-color-state-on:         'var(--mdc-orange-darken-4)'
theme-button-lock-color-state-on:          'var(--primary-text-color)'
theme-button-name-color-state-on:          'var(--primary-text-color)'
theme-button-state-color-state-on:         'var(--mdc-orange-darken-4)'
```

The template for the custom button-card implements the theme colors/settings for the state "On"

``` yaml
  state:
    - value: "on" 
      spin: '[[spin]]'  
      styles:
        card:
          - --ha-card-background: var(--theme-button-card-color-state-on)
        lock:
          - color: var(--theme-button-lock-color-state-on)
        label:
          - color: var(--theme-button-label-color-state-on)
        name:
          - color: var(--theme-button-name-color-state-on)
        state:
          - color: var(--theme-button-state-color-state-on)
        custom_fields:
          area:
            - color: var(--theme-button-area-color-state-on)
```

The cards need very little yaml code as a result, only functional stuff, NO styling!

``` yaml
          - type: custom:decluttering-card
            template: button_light_template
            variables:
              - entity: light.gledopto
              - area: Woonkamer
              - name: Boekenkast
              - icon: 'mdi:book-open-outline'
```
As a result:
- the cards need very little yaml, and only contain the functional stuff
- the template takes care of defaults and styling
- the theme is the only one responible for the style settings

## Inspired by...
Of course, I did not re-invent the wheel.
Hemera and Nyx, together with the 3-grid layout and on/off colors are heavily inspred by Apple's HomeKit and the mighty [HomeBridge UI](https://www.npmjs.com/package/homebridge-config-ui-x#accessory-control).

### Homekit:
![](https://github.com/AmoebeLabs/Home-Assistant-Config/blob/master/inspiration/Inspired%20by%20Homekit.png)

### Homebridge:
![](https://github.com/AmoebeLabs/Home-Assistant-Config/blob/master/inspiration/Inspired%20by%20Homebridge.png)

### Last but not least: Google's material design, inclusing design rules:
- https://materializecss.com/color.html
- https://material.io/design/color/#color-usage-palettes
- https://material.io/design/color/dark-theme.html

### And last last but not least: the 3 button topmenu by @jimzz
