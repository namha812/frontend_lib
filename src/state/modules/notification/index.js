import { createReducer } from '../../reducers/helper'

export const SHOW_TOAST = 'show toast'
export const HIDE_TOAST = 'hide toast'
export const SHOW_LOADING = 'show loading screen'
export const HIDE_LOADING = 'hide loading screen'
export const SHOW_TOAST_WITH_ACTION = 'show toast with action'
export const HIDE_TOAST_WITH_ACTION = 'hide toast with action'


const defaultState = {
    toast: {
        open: false,
        position: {
            vertical: "bottom",
            horizontal: "left"
        },
        message: "",
        action: "",
        autoHideDuration: 6000, 
        type: ""
    },
    loading: {
        open: false,
        message: "",
        action: ""
    },
    toastWithAction: {
        open: false,
        toastAction: ""
    }
};


const notificationReducer = createReducer(defaultState, {
    [SHOW_TOAST]: (state, action) => {
        const { toast } = action.payload
        return {
            ...state,
            toast: {
                ...state.toast,
                ...toast,
                open: true
            }
        }
    },
    [HIDE_TOAST]: (state) => {
        return {
            ...state,
            toast: {
                ...state.toast,
                open: false
            }
        }
    },
    [SHOW_LOADING]: (state, action) => {
        const { message } = action.payload
        return {
            ...state,
            loading: {
                ...state.loading,
                message: message,
                open: true
            }

        }
    },
    [HIDE_LOADING]: (state, action) => {
        return {
            ...state,
            loading: {
                ...state.loading,
                open: false,
                message: ""
            }
        }
    },

    [SHOW_TOAST_WITH_ACTION]: (state, action) => {
        const { toastAction } = action.payload;
        return {
            ...state,
            toastWithAction: {
                open: true,
                toastAction
            }
        }
    },
    
    [HIDE_TOAST_WITH_ACTION]: (state, action) => {
        return {
            ...state,
            toastWithAction: {
                ...defaultState.toastWithAction
            }
        }
    },

})

export const showToast = toast => ({
    type: SHOW_TOAST,
    payload: {
        toast
    }
})

export const hideToast = () => ({
    type: HIDE_TOAST,

})

export const showLoading = message => ({
    type: SHOW_LOADING,
    payload: {
        message
    }
})

export const hideLoading = () => ({
    type: HIDE_LOADING,

})

export const showToastWithAction = toastAction => ({
    type: SHOW_TOAST_WITH_ACTION,
    payload: {
        toastAction
    }
})

export const hideToastWithAction = () => ({
    type: HIDE_TOAST_WITH_ACTION,
})

export const namespace = 'notification';

export default notificationReducer