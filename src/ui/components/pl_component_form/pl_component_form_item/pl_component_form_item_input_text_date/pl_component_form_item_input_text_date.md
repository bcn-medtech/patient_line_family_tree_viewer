# pl_component_form_item_input_text_date

Location: (7/21)

DOM Element:

```html
    <PlComponentFormItemInputTextDate
    ref={ref}
    index={index}
    key={key} 
    label={label}
    onInputChange={this.computeFormStatus.bind(this)}/>
```

*props* **index** is optional, and allows to enumerate the item in the form (see *PlComponentFormItemLabel*). If it is not defined, the form item will not be enumerated.

Input:

```javascript
{ 
    "key":"date",
    "label": "When was this patient born?",
    "required_input":"letter"
}
```

Output:

```javascript
{ 
    "key":"date",
    "value":"24/05/1988"
}
```