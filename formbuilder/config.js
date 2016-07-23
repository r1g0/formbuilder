export default {
  projectName: process.env.PROJECT_NAME || "Formbuilder",
  server: {
    remote: process.env.SERVER_URL,
    bucket: "formbuilder",
  },
  appURL: process.env.APP_URL || window.location.origin + window.location.pathname,
  fieldList: [
    {
      id: "text2",
      icon: "text-color",
      label: "text2",
      jsonSchema: {
        "title" : "Text",
        "description" : "A question with a text answer.",
        "type" : "object",
        "properties" : {
          "qid":   {"type": "number"},
          "qtext": {"type": "string"},
          "qtype" : {
            "type" : "string",
            "default" : "textbox"
          },
          "qrequired": { "type": "boolean" }
        },
        "required": ["id", "text", "type"]
      },
      uiSchema: {
        "qid": {
          "ui:widget": "hidden"
        },
        "qtype": {
          "ui:widget": "hidden"
        },
        editSchema: {
          "title" : "Text",
          "description" : "A question with a text answer.",
          "type" : "object",
          "properties" : {
            "qid":   {"type": "number","default":1},
            "qtext": {"type": "string"},
            "qtype" : {
              "type" : "string",
              "default" : "textbox"
            },
            "qrequired": { "type": "boolean" }
          },
          "required": ["qid", "qtext", "qtype"]
        },
        editUiSchema:  {
          "qid": {
            "ui:widget": "hidden"
          },
          "qtype": {
            "ui:widget": "hidden"
          }
        }
      },
      formData: {}
    },
    {
      id: "qr_scan",
      icon: "align-left",
      label: "QR",
      jsonSchema: {
        type: "qr",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        "ui:widget": "textarea",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Example value"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    },
    {
      id: "multilinetext",
      icon: "align-left",
      label: "Long text",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        "ui:widget": "textarea",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Example value"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    },
    {
      id: "checkbox",
      icon: "check",
      label: "Checkbox",
      jsonSchema: {
        type: "boolean",
        title: "Edit me",
        default: false,
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    },
    {
      id: "radiobuttonlist",
      icon: "list",
      label: "Single Choice",
      jsonSchema: {
        type: "string",
        title: "Edit me edit",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
      },
      formData: {}
    },
    {
      id: "selectlist",
      icon: "list",
      label: "Select",
      jsonSchema: {
        type: "string",
        title: "Edit me edit",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
      },
      formData: {}
    },{
      id: "radiobuttonlist",
      icon: "list",
      label: "Multiple choice",
      jsonSchema: {
        type: "array",
        title: "Edit me edit",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "checkbox",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
      },
      formData: {}
    }
  ],
};
