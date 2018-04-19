# pl_component_form_item_input_text

Location: (7/21)

DOM Element:

```html
    <PlComponentFormItemInputText
    ref={ref}
    index={index}
    key={key} 
    label={label}
    required_input={'letter'}
    onInputChange={this.computeFormStatus.bind(this)}/>
```
*props* **index** is optional, and allows to enumerate the item in the form (see *PlComponentFormItemLabel*). If it is not defined, the form item will not be enumerated.

*props* **required_input** specifies the kind of input that the user is allowed to write. It can be 'letter' or 'number'; in case of being defined as ' ', or not being defined, the form item will allow all kind of inputs (that is, both alphanumercial values and symbols).

Input:

```javascript
{ 
    "key":"name",
    "label": "Which is the name of the new patient?",
    "required_input":"letter"
}
```

Output:

```javascript
{ 
    "key":"name",
    "value":"Carlos"
}
```