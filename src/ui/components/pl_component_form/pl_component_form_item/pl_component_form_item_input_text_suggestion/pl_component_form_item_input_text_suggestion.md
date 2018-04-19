# pl_component_form_item_input_text_suggestion 

Location: (7/21)

DOM Element:

```html
    <PlComponentFormItemInputTextSuggestion
    iref={ref}
    index={index}
    key={key} 
    label={label}
    icon={icon}
    suggestions={suggestions}
    required_input={'letter'}
    onInputChange={this.computeFormStatus.bind(this)}/>
```
*props* **index** is optional, and allows to enumerate the item in the form (see *PlComponentFormItemLabel*). If it is not defined, the form item will not be enumerated.

The elements in *props* **suggestions** must start with **lower case** so that the suggestions are rendered correctly.

*props* **required_input** specifies the kind of input that the user is allowed to write. It can be 'letter' or 'number'; in case of being defined as ' ', or not being defined, the form item will allow all kind of inputs (that is, both alphanumercial values and symbols).

Input:

```javascript
{ 
    "key":"study",
    "label": "In which clinical study would you like to include this patient?",
    "suggestions":["suggestion1","suggestion2","suggestion3","suggestion4","suggestion5"],
    "required_input":"letter"
}
```

Output:

```javascript
{ 
    "key":"study",
    "value":"HCB"
}
```

Links of interest: [react-autocomplete-input](https://www.npmjs.com/package/react-autocomplete-input)