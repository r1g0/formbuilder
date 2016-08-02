export default {
  projectName: process.env.PROJECT_NAME || "Formbuilder",
  server: {
    remote: process.env.SERVER_URL,
    bucket: "formbuilder",
  },
  appURL: process.env.APP_URL || window.location.origin + window.location.pathname,
  fieldList: [
    {
      id: "text",
      icon: "text-color",
      label: "Text",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Pregunta:"},
            description: {type: "string", title: "Example value"},
            required: {type: "boolean"},
          }
        },
      },
      qtype: "text",
      formData: {}
    },
    {
      id: "singlechoice",
      icon: "list",
      label: "Single Choice",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Pregunta:"},
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
      qtype: "picker",
      formData: {}
    },
    {
      id: "multiplechoice",
      icon: "list",
      label: "Multiple Choice",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Pregunta:"},
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
      qtype: "checkbox",
      formData: {}
    },
    {
      id: "qrtext",
      icon: "qrcode",
      label: "QR Scan",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Pregunta:"},
            required: {type: "boolean"}
          }
        },
      },
      qtype: "qr",
      formData: {}
    },
    {
      id: "picture",
      icon: "picture",
      label: "Picture",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Pregunta:"},
            required: {type: "boolean"}
          }
        },
      },
      qtype: "picture",
      formData: {}
    },
    {
      id: "gps",
      icon: "map-marker",
      label: "GPS",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        editSchema: {
          "title" : "GPS Location",
          "description" : "A question for obtaining the mobile's GPS location.",
          "type" : "object",
          "properties" : {
            "text": {"type": "string"},
            "validation" : {
              "title" : "GPS Validation Parameters",
              "type" : "object",
              "properties" : {
                "max_error" : {
                  "type" : "number",
                  "title": "Maximum Accuracy Error",
                  "description" : "Example: If the maximum error is 30, no location with accuracy above 30 would be valid."
                },
                "areas" : {
                  "title": "Accepted Areas",
                  "type" : "array",
                  "items" : {
                    "title" : "GPS Validation",
                    "type" : "object",
                    "properties" : {
                      "northeast" : {
                        "type" : "string",
                        "pattern" : "-?\\d+\\.\\d*,\\s*-?\\d+\\.\\d*"
                      },
                      "southwest" : {
                        "type" : "string",
                        "pattern" : "-?\\d+\\.\\d*,\\s*-?\\d+\\.\\d*"
                      }
                    }
                  }
                }
              }
            }
          },
          "required": ["text"],
          "additionalProperties" : false
        },
      },
      qtype: "gps",
      formData: {}
    }
  ],
};
