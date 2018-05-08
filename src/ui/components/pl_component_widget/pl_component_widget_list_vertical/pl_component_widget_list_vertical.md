# pl_component_widget_list_vertical

Location: (19/21) right hand side, (6/21) right hand side

This allows to display either a [PlComponentListVerticalInfo](./../../pl_component_list/pl_component_list_vertical/pl_component_list_vertical_info/pl_component_list_vertical_info.md) or a [PlComponentListVerticalOptions](./../../pl_component_list/pl_component_list_vertical/pl_component_list_vertical_options/pl_component_list_vertical_options.md).

DOM Element:
  
**non-editable widget**
```html

    <PlComponentWidgetListVertical 
        isEditable={false}
        icon={icon}
        title={title}
        type_of_list_vertical={"info"}
        list_vertical_items={list_vertical_info_items}
    />
```
OR
```html  
    <PlComponentWidgetListVertical 
        isEditable={false}
        icon={icon}
        title={title}
        type_of_list_vertical={"options"} 
        list_vertical_items={list_vertical_options_items}
    />
```

**editable widget**

```html

    <PlComponentWidgetListVertical
        isEditable={true}
        editor_actions={["search", "edit", "add", "delete"]}
        icon={icon}
        title={title}
        type_of_list_vertical={"info"}
        list_vertical_items={list_vertical_info_items}
        saveWidgetChanges={this.saveWidgetChanges.bind(this)}
    />
```
OR
```html
    <PlComponentWidgetListVertical
        isEditable={true}
        editor_actions={["add", "delete"]}
        icon={icon}
        title={title}
        type_of_list_vertical={"options"}
        list_vertical_items={list_vertical_options_items}
        saveWidgetChanges={this.saveWidgetChanges.bind(this)}
    /> 
```

**props** *type_of_list_vertical* **must** be either "info" or "options".
           
            