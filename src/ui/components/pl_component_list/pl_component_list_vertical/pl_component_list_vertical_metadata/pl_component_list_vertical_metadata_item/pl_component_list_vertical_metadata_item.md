# pl_component_list_vertical_metadata_item

Location: (11/21)

DOM Element:

```html
    <PlComponentListVerticalMetadataItem
    name={name}
    date={date}
    author={author}
    metadata={metadata}
    onclickelement={this.onClickElement.bind(this)} />
```

Input:

```javascript
{
    "name":"John Doe",
    "date":"24/05/1983",
    "author":"@cyague",
    "metadata":[
        {
            "name":"follow-ups",
            "value":4
        },
        {
            "name":"diagnostic",
            "value":"Yes"
        },
        {
            "name":"responder",
            "value":"Yes"
        },
        {
            "name":"study",
            "value":"HCB"
        }

    ]
}
```

Output:

```javascript
{
    "name":"John Doe",
    "date":"24/05/1983",
    "author":"@cyague",
    "metadata":[
        {
            "name":"follow-ups",
            "value":4
        },
        {
            "name":"diagnostic",
            "value":"Yes"
        },
        {
            "name":"responder",
            "value":"Yes"
        },
        {
            "name":"study",
            "value":"HCB"
        }

    ]
}
```