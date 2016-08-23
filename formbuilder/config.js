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
      label: "Pregunta Simple",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
        default: "",
        index: -1
      },
      uiSchema: {
        "ui:widget": "noinput",
        editSchema: {
          type: "object",
          description : "La respuesta puede ser cualquier texto o número.",
          properties: {
            title: {type: "string", title: "Pregunta:"},
            required: {type: "boolean", title: "Requerido "},
          }
        },
      },
      qtype: "textbox",
      formData: {}
    },
    {
      id: "singlechoice",
      icon: "list",
      label: "Opción Simple",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        enum: ["opción 1", "opción 2", "opción 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
        editSchema: {
          type: "object",
          description : "La respuesta puede ser una de las respuestas disponibles.",
          properties: {
            title: {type: "string", title: "Pregunta:"},
            required: {type: "boolean", title: "Requerido "},
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
      label: "Opción Múltiple",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        enum: ["opción 1", "opción 2", "opción 3"],
      },
      uiSchema: {
        "ui:widget": "multiplechoice",
        editSchema: {
          type: "object",
          description : "La respuesta puede ser una o varias opciones.",
          properties: {
            title: {type: "string", title: "Pregunta:"},
            required: {type: "boolean", title: "Requerido "},
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
      label: "Código QR",
      jsonSchema: {
        type: "string",
        description : "Permite escanear un código QR para enviar su valor.",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        "ui:widget": "noinput",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Pregunta:"},
            required: {type: "boolean", title: "Requerido "}
          }
        },
      },
      qtype: "qr",
      formData: {}
    },
    {
      id: "picture",
      icon: "picture",
      label: "Foto",
      jsonSchema: {
        type: "string",
        description: "Agregar una foto.",
        title: "Edit me",
        description: "",
        default: ""
      },
      uiSchema: {
        "ui:widget": "noinput",
        editSchema: {
          type: "object",
          properties: {
            title: {type: "string", title: "Pregunta:"},
            required: {type: "boolean", title: "Requerido "}
          }
        },
      },
      qtype: "takepicture",
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
        default: "",
        validation: {}
      },
      uiSchema: {
        "ui:readonly": true,
        "ui:widget": "gps",
        editSchema: {
          "title" : "Posición GPS",
          "description" : "Una pregunta que permite registrar la posición en donde se toma la encuesta.",
          "type" : "object",
          "properties" : {
            "title": {"type": "string", title: "Pregunta:"},
            "validation" : {
              "title" : "Validación de la posición",
              "type" : "object",
              "properties" : {
                "max_error" : {
                  "type" : "number",
                  "title": "Error Máximo de Exactitud",
                  "description" : "Ejemplo: Si el Error Máximo es de 50, ninguna posición con un error mayor a 50 será válida.",
                  "default" : 50
                },
                "areas" : {
                  "title": "Areas Aceptadas",
                  "type" : "array",
                  "items" : {
                    "title" : "Validación GPS",
                    "type" : "object",
                    "properties" : {
                      "northeast" : {
                        "type" : "string",
                        "title" : "Noreste",
                        "pattern" : "-?\\d+\\.\\d*,\\s*-?\\d+\\.\\d*"
                      },
                      "southwest" : {
                        "type" : "string",
                        "title" : "Suroeste",
                        "pattern" : "-?\\d+\\.\\d*,\\s*-?\\d+\\.\\d*"
                      }
                    },
                    "required" : ["northeast", "southwest"]
                  },
                  "default" : []
                }
              },
              "required": ["max_error"]
            },
            required: {type: "boolean", title: "Requerido "}
          },
          "required": ["title", "validation"]
        },
      },
      qtype: "gps",
      formData: {}
    }
  ],
};
