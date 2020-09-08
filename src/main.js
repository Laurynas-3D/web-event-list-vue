import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// automatic base global components registration 1st part
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// manual base global components registration 1st part
// import BaseIcon from "@/components/BaseIcon.vue";
// import BaseButton from "@/components/BaseButton.vue";
// import BaseInput from "@/components/BaseInput.vue";

// manual global component registration, make sure this line is above Vue Instance 2nd part
// Vue.component('BaseIcon', BaseIcon)
// Vue.component('BaseButton', BaseButton)
// Vue.component('BaseInput', BaseInput)

// automatic base global components registration 2nd part
const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})
// automatic base global components registration ends here


Vue.config.productionTip = false;

// Vue Instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
