import Vue from 'vue'
import moment from 'moment'

const filters = () => {
  Vue.filter('capitalize', function (value) {
    if (value && typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }

    return ''
  })

  Vue.filter('formatDate', function (value, formatType = 'LL') {
    if (!value) return ''

    return moment(value).format(formatType)
  })

  Vue.filter('fromNow', function (value) {
    if (!value) return ''

    return moment(value).fromNow()
  })

  Vue.filter('betweenTime', function(start, end){
    var ahora = new Date().getHours();
    return ahora >= parseInt(start) && ahora <= parseInt(end)     
  })
}

export default filters
