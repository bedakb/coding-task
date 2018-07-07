import dayjs from 'dayjs'

/**
 * Format date function used as filter in Vue component
 * @param {String|Date} value
 * @return {String|Date} 
 */
export const formatDate = value => dayjs(value).format('DD MMMM YYYY')

