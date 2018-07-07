import dayjs from 'dayjs'

export const formatDate = value => dayjs(value).format('DD MMMM YYYY')

