import React, { Component } from 'react';

class MultipleChoiceWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {...props.formData};
  }

  selectValue(value, selected, all) {
    const updated = selected + "_filler_" + value;
    return updated;
  }

  deselectValue(value, selected) {
    let updated = selected.replace("_filler_" + value, "");
    return updated.replace(value, "");
  }

  render() {
    const {id, disabled, options, value, onChange} = this.props;
    console.log("MultipleChoiceWidget render ", this.props);
    return (
      <div className="checkboxes" id={id}>{
           options.map((option, index) => {
             const checked = value.indexOf(option.value) !== -1;
             return (
               <div key={index} className="checkbox">
                 <label>
                   <input type="checkbox"
                     id={`${id}_${index}`}
                     checked={checked}
                     disabled={disabled}
                     onChange={(event) => {
                       const all = options.map(({value}) => value);
                       if (event.target.checked) {
                         onChange(this.selectValue(option.value, value, all));
                       } else {
                         onChange(this.deselectValue(option.value, value));
                       }
                     }} />
                   <strong>{option.label}</strong>
                 </label>
               </div>
             );
           })
         }</div>
    );
  }
}

export default MultipleChoiceWidget