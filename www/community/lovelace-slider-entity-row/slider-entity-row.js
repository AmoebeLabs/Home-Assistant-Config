!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);const i=Object.getPrototypeOf(customElements.get("hui-view")),r=i.prototype.html,a=i.prototype.css;class n{constructor(t){this._config=t}set hass(t){this._hass=t,this.stateObj=this._config.entity in t.states?t.states[this._config.entity]:null}get value(){return this._value?Math.round(this._value/this.step)*this.step:0}set value(t){t!==this.value&&(this._value=t)}get string(){return`${this.value}`}get hidden(){return!1}get hasSlider(){return!0}get hasToggle(){return!0}get isOff(){return 0===this.value}get min(){return void 0!==this._config.min?this._config.min:void 0!==this._min?this._min:0}get max(){return void 0!==this._config.max?this._config.max:void 0!==this._max?this._max:100}get step(){return void 0!==this._config.step?this._config.step:void 0!==this._step?this._step:5}}const u={light:class extends n{get attribute(){return this._config.attribute||"brightness"}get _value(){if("on"!==this.stateObj.state)return 0;switch(this.attribute){case"color_temp":return Math.ceil(this.stateObj.attributes.color_temp);case"brightness":return Math.ceil(100*this.stateObj.attributes.brightness/255);case"red":return this.stateObj.attributes.rgb_color?Math.ceil(this.stateObj.attributes.rgb_color[0]):0;case"green":return this.stateObj.attributes.rgb_color?Math.ceil(this.stateObj.attributes.rgb_color[1]):0;case"blue":return this.stateObj.attributes.rgb_color?Math.ceil(this.stateObj.attributes.rgb_color[2]):0;case"hue":return this.stateObj.attributes.hs_color?Math.ceil(this.stateObj.attributes.hs_color[0]):0;case"saturation":return this.stateObj.attributes.hs_color?Math.ceil(this.stateObj.attributes.hs_color[1]):0;default:return 0}}get _min(){switch(this.attribute){case"color_temp":return this.stateObj.attributes.min_mireds;default:return 0}}get _max(){switch(this.attribute){case"color_temp":return this.stateObj.attributes.max_mireds;case"red":case"green":case"blue":return 255;case"hue":return 360;default:return 100}}set _value(t){let e,s=this.attribute,i=!0;switch(s){case"brightness":(t=Math.ceil(t/100*255))||(i=!1);break;case"red":case"green":case"blue":e=this.stateObj.attributes.rgb_color||[0,0,0],"red"===s&&(e[0]=t),"green"===s&&(e[1]=t),"blue"===s&&(e[2]=t),t=e,s="rgb_color";break;case"hue":case"saturation":e=this.stateObj.attributes.hs_color||[0,0],"hue"===s&&(e[0]=t),"saturation"===s&&(e[1]=t),t=e,s="hs_color"}i?this._hass.callService("light","turn_on",{entity_id:this.stateObj.entity_id,[s]:t}):this._hass.callService("light","turn_off",{entity_id:this.stateObj.entity_id})}get string(){if("off"===this.stateObj.state)return this._hass.localize("state.default.off");switch(this.attribute){case"color_temp":return`${this.value} K`;case"brightness":case"saturation":return`${this.value} %`;case"hue":return`${this.value} °`;default:return this.value}}get hasSlider(){switch(this.attribute){case"brightness":if("brightness"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&1&this.stateObj.attributes.supported_features)return!0;case"color_temp":if("color_temp"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&2&this.stateObj.attributes.supported_features)return!0;case"red":case"green":case"blue":if("rgb_color"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&16&this.stateObj.attributes.supported_features)return!0;case"hue":case"saturation":if("hs_color"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&16&this.stateObj.attributes.supported_features)return!0;default:return!1}}},media_player:class extends n{get _value(){return"on"===this.stateObj.is_volume_muted?0:Math.ceil(100*this.stateObj.attributes.volume_level)}set _value(t){t/=100,this._hass.callService("media_player","volume_set",{entity_id:this.stateObj.entity_id,volume_level:t})}get isOff(){return"off"===this.stateObj.state}get string(){return this.stateObj.attributes.is_volume_muted?"-":this.stateObj.attributes.volume_level?`${this.value} %`:this._hass.localize("state.media_player.off")}get hasToggle(){return!1}},climate:class extends n{get _value(){return this.stateObj.attributes.temperature}set _value(t){this._hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,temperature:t})}get string(){return"off"===this.stateObj.attributes.hvac_mode?this._hass.localize("state.climate.off"):`${this.value} ${this._hass.config.unit_system.temperature}`}get isOff(){return"off"===this.stateObj.attributes.hvac_mode}get _min(){return this.stateObj.attributes.min_temp}get _max(){return this.stateObj.attributes.max_temp}get _step(){return 1}},cover:class extends n{get attribute(){return this._config.attribute||"position"}get _value(){switch(this.attribute){case"position":return"open"===this.stateObj.state?this.stateObj.attributes.current_position:0;case"tilt":return this.stateObj.attributes.current_tilt_position;default:return 0}}set _value(t){switch(this.attribute){case"position":this._hass.callService("cover","set_cover_position",{entity_id:this.stateObj.entity_id,position:t});break;case"tilt":this._hass.callService("cover","set_cover_tilt_position",{entity_id:this.stateObj.entity_id,tilt_position:t})}}get string(){if(!this.hasSlider)return"";switch(this.attribute){case"position":return"closed"===this.stateObj.state?this._hass.localize("state.cover.closed"):`${this.value} %`;case"tilt":return this.value}}get hasToggle(){return!1}get hasSlider(){switch(this.attribute){case"position":if("current_position"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&4&this.stateObj.attributes.supported_features)return!0;case"tilt":if("current_tilt_position"in this.stateObj.attributes)return!0;if("supported_features"in this.stateObj.attributes&&128&this.stateObj.attributes.supported_features)return!0;default:return!1}}get _step(){return 10}},fan:class extends n{get _value(){return"off"!==this.stateObj.state?this.stateObj.attributes.speed_list.indexOf(this.stateObj.attributes.speed):0}set _value(t){t in this.stateObj.attributes.speed_list?this._hass.callService("fan","turn_on",{entity_id:this.stateObj.entity_id,speed:this.stateObj.attributes.speed_list[t]}):this._hass.callService("fan","turn_off",{entity_id:this.stateObj.entity_id})}get string(){return"off"===this.stateObj.state?this._hass.localize("state.default.off"):this.stateObj.attributes.speed}get hasSlider(){return"speed"in this.stateObj.attributes}get _max(){return this.stateObj.attributes.speed_list.length-1}get _step(){return 1}},input_number:class extends n{get _value(){return this.stateObj.state}set _value(t){this._hass.callService("input_number","set_value",{entity_id:this.stateObj.entity_id,value:t})}get string(){return`${parseFloat(this.stateObj.state)} ${this.stateObj.attributes.unit_of_measurement||""}`.trim()}get isOff(){return!1}get hasToggle(){return!1}get hasSlider(){return"slider"===this.stateObj.attributes.mode}get _min(){return this.stateObj.attributes.min}get _max(){return this.stateObj.attributes.max}get _step(){return this.stateObj.attributes.step}},input_select:class extends n{get _value(){return this.stateObj.attributes.options.indexOf(this.stateObj.state)}set _value(t){t in this.stateObj.attributes.options&&this._hass.callService("input_select","select_option",{entity_id:this.stateObj.entity_id,option:this.stateObj.attributes.options[t]})}get string(){return this.stateObj.state}get isOff(){return!1}get hasToggle(){return!1}get hasSlider(){return this.stateObj.attributes.options&&this.stateObj.attributes.options.length>0}get _max(){return this.stateObj.attributes.options.length-1}get _step(){return 1}}};customElements.define("slider-entity-row",class extends i{static get properties(){return{hass:{}}}setConfig(t){this._config=t;const e=t.entity.split(".")[0],s=u[e];if(!s)throw new Error(`Unsupported entity type: ${e}`);this.ctrl=new s(t)}render(){const t=this.ctrl;t.hass=this.hass;const e=r`
      <ha-slider
        .min=${t.min}
        .max=${t.max}
        .step=${t.step}
        .value=${t.value}
        pin
        @change=${e=>t.value=this.shadowRoot.querySelector("ha-slider").value}
        class=${this._config.full_row?"full":""}
      ></ha-slider>
    `,s=r`
      <ha-entity-toggle
        .stateObj=${this.hass.states[this._config.entity]}
        .hass=${this.hass}
      ></ha-entity-toggle>
    `,i=r`
    <div class="wrapper" @click=${t=>t.stopPropagation()}>
      ${"unavailable"===t.stateObj.state?r`
          <span class="state">
          unavailable
          </span>
        `:r`
          ${this._config.hide_when_off&&t.isOff||!t.hasSlider?"":e}
          ${this._config.hide_state||this._config.toggle?"":r`
              <span class="state">
                ${t.string}
              </span>
              `}
          ${this._config.toggle&&t.hasToggle?s:""}
        `}
    </div>
    `;return this._config.full_row?i:r`
    <hui-generic-entity-row
      .hass=${this.hass}
      .config=${this._config}
    > ${i} </hui-generic-entity-row>
    `}static get styles(){return a`
      .wrapper {
        display: flex;
        align-items: center;
        height: 40px;
      }
      .state {
        min-width: 45px;
        text-align: end;
      }
      ha-entity-toggle {
        margin-left: 8px;
      }
      ha-slider.full {
        width: 100%;
      }
    `}})}]);