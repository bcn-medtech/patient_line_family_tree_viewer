# pl_component_list_vertical_options

Location: (6/21) right hand side

DOM Element:

```html
    <PlComponentListVerticalOptions
    items={items}
    extra_button={{"icon":icon, "onClick":this.onClickExtraButton.bind(this)}}
    onclickelement={this.onClickElement.bind(this)} />
```

Input:

```javascript
[
    {
        "name":"Carlos Yagüe Méndez",
        "author":"@cyague",
        "value":"admin"
    },
    {
        "name":"Sergio Sánchez",
        "author":"@ssanchez",
        "value":"admin"
    },
    {
        "name":"Bart Bijnens",
        "author":"@bbijnens",
        "value":"editor"
    },
    {
        "name":"Oscar Cámara",
        "author":"@ocamara",
        "value":"editor"
    }
]
```

Output:

```javascript
[
    {
        "name":"Name",
        "author":"@cyague",
        "value":"admin"
    },
    {
        "name":"Sergio Sánchez",
        "author":"@ssanchez",
        "value":"admin"
    },
    {
        "name":"Bart Bijnens",
        "author":"@bbijnens",
        "value":"editor"
    },
    {
        "name":"Oscar Cámara",
        "author":"@ocamara",
        "value":"editor"
    }
]
```