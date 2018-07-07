import Vue from 'vue'

/**
 * Walks recursively through to object and sets value to empty string
 * @param {Object} form 
 * @return {void}
 */
export const resetForm = form => {
    for (let key in form) {
        if (typeof form[key] === 'object' && form[key] !== null && !(form[key] instanceof Date)) {
            resetForm(form[key])
            continue
        }
        form[key] = ''
    }
}