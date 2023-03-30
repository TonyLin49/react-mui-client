export let SESSION_USER_OBJECT = 'sessionUserObject'
export let SESSION_LOCAL = 'sessionLocal'

export let DEFAULT_FIELD_VARIANT = 'standard'
export let DEFAULT_FIELD_SIZE = 'small'
export let DEFAULT_SIZE = 'small'

export let FIELD_VARIANT = {
    STANDARD: DEFAULT_FIELD_VARIANT,
    OUTLINED: 'outlined',
    FILLED: 'filled'
}
export let DEFAULT_MULTILINE = {
    variant: FIELD_VARIANT.FILLED,
    multiline: true,
    minRows: 2,
    maxRows: 4
}

export let DATE_FORMAT = 'YYYY-MM-DD'

export let SIGN_STATUS = {
    SIGNING: 'signing',
    APPROVED: 'approved',
    REJECT: 'reject',
    CLOSED: 'closed',
    DRAFT: 'draft',
}

export let FORM_ACTION = {
    VIEW: 'view', 
    EDIT: 'edit', 
    ADD: 'add', 
    DELETE: 'delete', 
    SIGN: 'sign'
}

export let FIELD_TYPE = {
    TEXT_FIELD: 'TextField',
    PASSWORD_FIELD: 'PasswordField',
    DATE_FIELD: 'DateField',
    TIME_FIELD: 'TimeField',
    DATE_TIME_FIELD: 'DateTimeField',
    SELECT_FIELD: 'SelectField',
    NUMBER_FIELD: 'NumberField',
    TEXTAREA_FIELD: 'TextAreaField',
    CHECKBOX_FIELD: 'CheckBoxField',
    RADIOBOX_FIELD: 'RadioBoxField',
    AUTOCOMPLETE_FIELD: 'AutocompleteField',
}