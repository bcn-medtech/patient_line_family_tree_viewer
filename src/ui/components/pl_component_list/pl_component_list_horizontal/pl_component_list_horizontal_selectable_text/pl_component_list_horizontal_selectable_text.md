# pl_component_list_horizontal_selectable_text

Location: (19/21) right hand side

DOM Element:

```html
    <PlComponentListHorizontalSelectableText
    items={items}
    toWriteCommas={true}
    backgroundcolor={"transparent"}
    backgroundhovercolor={"transparent"}
    fontcolor={"#95989A"}
    fonthovercolor={"#81B9DE"}
    bordercolor={"transparent"}
    borderhovercolor={"transparent"} />
```
Defining *props* **toWriteCommas** as *true* writes commas between the different selectable texts. 

```javascript
["Kevin James","Nora Garcia","Philipous Klein"]
```

Output:

```javascript
["Kevin James"]
```