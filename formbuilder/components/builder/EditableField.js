import React, { Component } from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import Form from "react-jsonschema-form";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

function pickKeys(source, target) {
  const result = {};
  for (let key in source) {
    result[key] = target[key];
  }
  return result;
}

function shouldHandleDoubleClick(node) {
  // disable doubleclick on number input, so people can use inc/dec arrows
  if (node.tagName === "INPUT" &&
      node.getAttribute("type") === "number") {
    return false;
  }
  return true;
}

class FieldPropertiesEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editedSchema: props.schema};
  }

  onChange({formData}) {
    this.setState({editedSchema: formData});
  }

  render() {
    const {schema, name, required, uiSchema, onCancel, onUpdate, onDelete} = this.props;
    const formData = {
      ...schema,
      required,
      ...this.state.editedSchema,
      name: this.state.name
    };
    return (
      <div className="panel panel-default field-editor">
        <div className="panel-heading">
          <strong>Edit {name}</strong>
          <button type="button" className="close-btn" onClick={onCancel} aria-label="Close">
            close <i className="glyphicon glyphicon-remove-sign"/>
          </button>
          <button type="button" className="close-btn" onClick={onDelete} aria-label="Delete">
            delete <i className="glyphicon glyphicon-trash"/>
          </button>
        </div>
        <div className="panel-body">
          <Form
            schema={uiSchema.editSchema}
            uiSchema={uiSchema.editUiSchema}
            formData={formData}
            onChange={this.onChange.bind(this)}
            onSubmit={onUpdate} />
        </div>
      </div>
    );
  }
}

function DraggableFieldContainer(props) {
  const {
    children,
    dragData,
    onEdit,
    onDelete,
    onDoubleClick,
    onDrop
  } = props;
  return (
    <Draggable type="moved-field" data={dragData}>
      <Droppable types={["field", "moved-field"]}
        onDrop={onDrop}>
        <div className="row editable-field" onDoubleClick={onDoubleClick}>
          <div className="col-sm-9">
            {children}
          </div>
          <div className="col-sm-3 editable-field-actions">
            <button type="button" className="edit-btn" onClick={onEdit}>
              edit <i className="glyphicon glyphicon-edit"/>
            </button>
            <button type="button" className="delete-btn" onClick={onDelete}>
              delete <i className="glyphicon glyphicon-trash"/>
            </button>
          </div>
        </div>
      </Droppable>
    </Draggable>
  );
}

export default class EditableField extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: true, schema: props.schema, isChild: false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({schema: nextProps.schema, isChild: nextProps.isChild});
  }

  handleEdit(event) {
    event.preventDefault();
    if (shouldHandleDoubleClick(event.target)) {
      this.setState({edit: true});
    }
  }

  handleUpdate({formData}) {
    const updated = pickKeys(this.props.schema, formData);
    const schema = {...this.props.schema, ...updated};
    console.log("STROPS CHECK const schema = {...this.props.schema, ...updated};", this.state, "props ", this.props)
    this.setState({edit: false, schema});
    console.log("STROPS CHECK this.setState({edit: false, schema});", this.state, "props ", this.props)
    this.props.updateField(
      this.props.name, schema, formData.required, formData.title);
    console.log("STROPS CHECK this.props.updateField(", this.state, "props ", this.props)
  }

  handleDelete(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this field?")) {
      this.props.removeField(this.props.name);
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({edit: false});
  }

  handleDrop(data) {
    const {name, swapFields, insertField} = this.props;
    if ("moved-field" in data && data["moved-field"]) {
      if (data["moved-field"] !== name) {
        swapFields(data["moved-field"], name);
      }
    } else if ("field" in data && data.field) {
      insertField(JSON.parse(data.field), name);
    }
  }

  render() {
    const props = this.props;

    if (this.state.edit && props.schema.type === "object") {
      console.log("RENDER is editing", props.name);
      return (
        <FieldPropertiesEditor
          {...props}
          onCancel={this.handleCancel.bind(this)}
          onUpdate={this.handleUpdate.bind(this)}
          onDelete={this.handleDelete.bind(this)} />
      );
    }else if (this.state.edit && props.schema.type !== "object"){
      return (
        <SchemaField {...props} isChild={true} 
          schema={this.state.schema}
          idSchema={{id: props.name}} /> );
    }

    if (props.schema.type === "object") {
      console.log("RENDER is object", props.name);
      if (!props.name) {
      console.log("RENDER object with no name", props.name);
        // This can only be the root form object, returning a regular SchemaField.
        return <SchemaField {...props} isChild={true} idSchema={{id: props.name}} />;
      }
    }
    console.log("RENDER else", props.name);
    if (props.uiSchema && props.uiSchema["ui:widget"]==="hidden"){
      return null;
    }

    return (
      <DraggableFieldContainer
        draggableType="moved-field"
        droppableTypes={["moved-field", "field"]}
        dragData={props.name}
        onEdit={this.handleEdit.bind(this)}
        onDelete={this.handleDelete.bind(this)}
        onDoubleClick={this.handleEdit.bind(this)}
        onDrop={this.handleDrop.bind(this)}>
        <SchemaField {...props} isChild={true} 
          schema={this.state.schema}
          idSchema={{id: props.name}} />
      </DraggableFieldContainer>
    );
  }
}
