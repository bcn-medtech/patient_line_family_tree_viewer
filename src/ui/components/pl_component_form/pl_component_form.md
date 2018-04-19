# pl_component_form

Location: (7/21)

DOM Element:

```html
    <PlComponentForm form={form} />
```


Input:

```javascript
{
    "form_elements":[
        {
            "form_type":"input_text",
            "data":
            { 
                "key":"name",
                "label": "Which is the name of the new patient?",
                "required_input":"letter"
            }
        },
        {
            "form_type":"input_text_suggestion",
            "data":
            { 
                "key":"study",
                "label": "In which clinical study would you like to include this patient?",
                "suggestions":["suggestion1","suggestion2","suggestion3","suggestion4","suggestion5"],
                "required_input":""
            }
        },
        {
            "form_type":"input_text_date",
            "data":
            { 
                "key":"date",
                "label": "When was this patient born?"
            }
        },
        {
            "form_type":"input_options",
            "data":
            { 
                "key":"sex",
                "label":"Is this patient male or female?",
                "items": ["male","female"]
            }
        },
        {
            "form_type":"input_text",
            "data":
            { 
                "key":"city",
                "label": "Where is this patient from?",
                "required_input":"letter"
            }
        }
    ]
}
```
Note: *key* of the different form elements has to be unique.


Output:

```javascript
{  
    "form":[
        { 
            "key":"name",
            "value":"Carlos"
        },
        { 
            "key":"study",
            "value":"HCB"
        },
        { 
            "key":"date",
            "value":"24/05/1988"
        },
        { 
            "key":"sex",
            "items": ["male","female"],
            "item_selected":"male"
        },
        { 
            "key":"city",
            "value":"Barcelona"
        }
    ]
}
```