# pl_component_list_vertical_options

Location: (6/21) right hand side

DOM Element:

```html
    <PlComponentListVerticalOptions
    items={items}
    onclickelement={this.onClickElement.bind(this)} />
```

Input:

```javascript
[
    {
        "name":"Carlos Yagüe Méndez",
        "author":"@cyague",
        "option":"admin"
    },
    {
        "name":"Sergio Sánchez",
        "author":"@ssanchez",
        "option":"admin"
    },
    {
        "name":"Bart Bijnens",
        "author":"@bbijnens",
        "option":"editor"
    },
    {
        "name":"Oscar Cámara",
        "author":"@ocamara",
        "option":"editor"
    }
]
```

Output:

```javascript
[
    {
        "name":"Name",
        "author":"@cyague",
        "option":"admin"
    },
    {
        "name":"Sergio Sánchez",
        "author":"@ssanchez",
        "option":"admin"
    },
    {
        "name":"Bart Bijnens",
        "author":"@bbijnens",
        "option":"editor"
    },
    {
        "name":"Oscar Cámara",
        "author":"@ocamara",
        "option":"editor"
    }
]
```