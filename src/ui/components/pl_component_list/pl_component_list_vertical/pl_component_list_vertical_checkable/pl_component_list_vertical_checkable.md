# pl_component_list_vertical_checkable

Location: (5/21) right hand side

DOM Element:

```html
    <PlComponentListCheckable name={name} items={items} at_leat_one_item_checked={at_leat_one_item_checked} onclickelement={this.onClickElement.bind(this)} />
```

Input:

```javascript
{ 
    "name": "Generic",
    "at_least_one_item_checked":false,
    "primary_item":"none",
    "items":[
        { "name": "follow-ups", "checked": false},
        { "name": "diagnostic", "checked": false},
        { "name": "responder", "checked": false}
    ]
}
```

Output:

```javascript
{ 
    "name": "Generic",
    "at_least_one_item_checked":false,
    "primary_item":"none", 
    "items":[
        { "name": "follow-ups", "checked": true},
        { "name": "fiagnostic", "checked": true},
        { "name": "responder", "checked": true}
    ]
}
```