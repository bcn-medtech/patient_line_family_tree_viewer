# pl_component_form_item_input_options

Location: (7/21) right hand side

DOM Element:

```html
    <PlComponentFormItemInputOptions
    ref={ref}
    index={index}
    key={key} 
    label={label}
    items={items}
    onInputChange={this.computeFormStatus.bind(this)}/>
```

*props* **index** is optional, and allows to enumerate the item in the form (see *PlComponentFormItemLabel*). If it is not defined, the form item will not be enumerated.

Input:

```javascript
{ 
    "key":"sex",
    "label":"Is this patient male or female?",
    "items": ["male","female"]
}
```

Output:

```javascript
{ 
    "key":"sex",
    "value":"male"
}
```