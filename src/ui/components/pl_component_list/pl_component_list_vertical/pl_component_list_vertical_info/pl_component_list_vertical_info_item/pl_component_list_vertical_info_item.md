# pl_component_list_vertical_info_item

Location: (19/21) right hand side

DOM Element:

```html
    <PlComponentListVerticalInfo
    items={items}
    extra_button={{"icon":icon, "onClick":this.onClickExtraButton.bind(this)}}
    onclickelement={this.onClickElement.bind(this)} />
```

Input:

```javascript
[
    {
        "name":"Name",
        "value":"John Doe"
    },
    {
        "name":"DB",
        "value":"24/05/1983"
    },
    {
        "name":"Age",
        "value":"35"
    },
    {
        "name":"Sex",
        "value":"Male"
    },
    {
        "name":"Race",
        "value":"Athlete"
    },
    {
        "name":"City",
        "value":"Barcelona (SPAIN)"
    },
    {
        "name":"EL",
        "value":"Computer Science Engineer"
    }
]
```

Output:

```javascript
[
    {
        "name":"Name",
        "value":"John Doe"
    },
    {
        "name":"DB",
        "value":"24/05/1983"
    },
    {
        "name":"Age",
        "value":"35"
    },
    {
        "name":"Sex",
        "value":"Male"
    },
    {
        "name":"Race",
        "value":"Athlete"
    },
    {
        "name":"City",
        "value":"Barcelona (SPAIN)"
    },
    {
        "name":"EL",
        "value":"Computer Science Engineer"
    }
]
```