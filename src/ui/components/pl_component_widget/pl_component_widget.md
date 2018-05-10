# rkt_pl_component_widget

Location: (19/21)

DOM Element:

```html

    class current_component extends Component{
        
        constructor(){

        }

        sumPerformed(){

        }

        render(){

            var a = 5;
            var b = 6;
            var component = <ComponentSum prop_a={a} prop_b={b} onClick={this.sumPerformed.bind(this)}>
            var isEditable = boolean (true/false)

            return(
                <RktPlComponentWidget
                icon={icon}
                title={title}
                Widget_content={component}
                isEditable={isEditable}
                editor_actions={editor_actions}
                onclickelement={this.onclickelement.bind(this)}/>
            )
        
        }
    }
    
```