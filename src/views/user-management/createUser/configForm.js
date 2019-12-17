export default {
    "display": "form",
    "settings": {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    },
    "components": [
        {
            "title": "User information",
            "customClass": "box-form",
            "collapsible": false,
            "key": "add",
            "type": "panel",
            "label": "Add",
            "input": false,
            "validate": {
                "unique": false,
                "multiple": false
            },
            "components": [
                {
                    "label": "User name",
                    "spellcheck": true,
                    "validate": {
                        "required": true,
                        "unique": false,
                        "multiple": false
                    },
                    "key": "username",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Frist name",
                    "spellcheck": true,
                    "validate": {
                        "required": true,
                        "unique": false,
                        "multiple": false
                    },
                    "key": "firstname",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Last name",
                    "spellcheck": true,
                    "validate": {
                        "required": true,
                        "unique": false,
                        "multiple": false
                    },
                    "key": "lastname",
                    "type": "textfield",
                    "input": true
                },
                {
                    "label": "Email",
                    "spellcheck": true,
                    "validate": {
                        "required": true,
                        "unique": false,
                        "multiple": false
                    },
                    "key": "email",
                    "type": "email",
                    "input": true
                },
                // {
                //     "label": "Auto generate passwor",
                //     "validate": {
                //         "unique": false,
                //         "multiple": false
                //     },
                //     "key": "sendPasswordToEmail",
                //     "defaultValue":false,
                //     "hidden": true,
                //     "disabled": true,
                //     "conditional":{"json":{}},
                //     "type": "checkbox",
                //     "input": true,
                // },
                // {
                //     "label": "Override password expiry policy",
                //     "validate": {
                //         "unique": false,
                //         "multiple": false
                //     },
                //     "key": "overridePasswordExpiryPolicy",
                //     "type": "checkbox",
                //     "input": false,
                //     "defaultValue": false
                // },
                {
                    "label": "Password",
                    "spellcheck": true,
                    "tableView": false,
                    "validate": {
                        "required": true,
                        "unique": false,
                        "multiple": false
                    },
                    "conditional": {
                        "json": {
                            "===": [
                              {
                                "var": "data.sendPasswordToEmail"
                              },
                             false                           
                             ]
                          }
                    },
                    "key": "password",
                    "type": "password",
                    "input": true,
                    "protected": true
                },
                {
                    "label": "Repeat password",
                    "spellcheck": true,
                    "tableView": false,
                    "validate": {
                        "required": true,
                        "custom": "valid = (input === data.password) ? true : 'password not match';"
                    },
                    "key": "repeatPassword",
                    "type": "password",
                    "conditional": {
                        // "json": {
                        //     "===": [
                        //       {
                        //         "var": "data.sendPasswordToEmail"
                        //       },
                        //      false                           
                        //      ]
                        //   }
                    },
                    "input": true,
                    "protected": true
                },
                {
                    "label": "Office",
                    "widget": "choicesjs",
                    "placeholder": "--Select Office--",
                    "data": {
                        "values": []
                    },
                    "selectThreshold": 0.3,
                    "validate": {
                        "required": true,
                        "unique": false,
                        "multiple": false
                    },
                    "key": "officeId",
                    "type": "select",
                    "input": true
                },
                {
                    "label": "Staff",
                    "widget": "choicesjs",
                    "data": {
                        "values": [
                            {
                                "label": "",
                                "value": ""
                            }
                        ]
                    },
                    "selectThreshold": 0.3,
                    "validate": {
                        "unique": false,
                        "multiple": false
                    },
                    "key": "staff",
                    "type": "select",
                    "input": true
                },
                // {
                //     "label": "Clear data",
                //     "action": "reset",
                //     "showValidations": false,
                //     "theme": "secondary",
                //     "key": "cancel",
                //     "type": "button",
                //     "input": false,
                //     "validate": {
                //         "unique": false,
                //         "multiple": false
                //     }
                // },
                {
                    "label": "Submit",
                    "showSubmit": false,
                    "action": "saveState",
                    "showValidations": true,
                    "disableOnInvalid": true,
                    "key": "submit",
                    "type": "button",
                    "input": false,
                    "validate": {
                        "unique": false,
                        "multiple": false
                    }
                }

            ],
            "path": "add"
        }
    ]
}