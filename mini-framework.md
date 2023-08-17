# mini-framework - Usage Guide

## Explanation
The mini-framework project works by providing a set of functions that simplify the process of creating and manipulating elements and events in JavaScript, making it easier to build dynamic web applications.

This documentation file provides an explanation of the features along with code examples and explanations on : 
- How to create an element
- Create an event
- Add attributes to an element.
- ✨ Nest elements ✨

## Features

The mini-framework project includes the following features:
- `setAttributes(element,attributes)`: This function handles attributes of an element by setting the attribute key-value pairs using the built in `setAttribute()`.
- `createChild(parent,child)`: This function appends a child element to a parent element using the built in `appendChild()` method, using either a child of type Node or as a text representation of a HTML node.
- `removeChild(parent,child)`: This function removes a child element from a parent element.
- `getParent(element,num = 2)`: This function returns the parent element of a given element, default being two levels up (parent element of parent element).
- `createStructure(structure)`: This function creates an element structure based on the given tag, attributes, and children in a JSON object shown as an example below.
- `redirect(url)`: This function redirects the user to a new URL.
- `addEvent(eventType, element, callback)`: This function attaches an event listener to the specified element using the `addEventListener()` method.
- `removeEvent(eventType, element)`: This function removes an event listener from the specified element using the `removeEventListener()` method.
- `saveSate(state)`: This function saves the given (current) state of the application to the local storage.
- `loadState()`: This function loads the state of the application from the local storage.
- `state`: This object stores the state of the application.

## Code Examples

#### Creating an Element

To create an element using the mini-framework, use the `createStructure()` function. It takes an object with the following properties:
`tag`: The tag name of the element to be created.
`attri (optional)`: An array of attribute key-value pairs for the element.
`children (optional)`: An array of child elements for the element.

Here is an example of how to create a div element with a class of "example": 
```js
const exampleDiv = createStructure({
  tag: "div",
  attri: ["class", "example"],
  children:[node/text]
});
```

#### Creating an Event

To create an event using the mini-framework project, use the `addEvent()` function. 
`addEvent(eventType, element, callback)`: Attaches an event listener to the specified element using the `addEventListener()` method.  
```js
function addEvent(eventType, element, callback) {
    element.addEventListener(eventType,callback);
}
```
This function takes three arguments:
`eventType`: The type of event to listen for (e.g. "click").
`element`: The element to attach the event listener to.
`callback`: The function to be called when the event is triggered.

Example usage: 

```js
 addEvent("keypress", this.input, this.handleNewTodo)
 addEvent("click", this.clear, this.handleClearChecked)
 addEvent("change", this.checkAllBox, this.handleCheckAll)
```

#### Removing an Event

`removeEvent(eventType, element, callback)`: This function removes an event listener from the specified element using the `removeEventListener()` method. 
```js
function removeEvent(eventType, element, callback) {
    element.removeEventListener(eventType, callback)
}
```

It takes the same three parameters as the `addEvent()` function:
`eventType`: The type of event that was previously added.
`element`: The element from which the event listener will be removed.
`callback`: The function that was previously attached as the event listener.

Example Usage: 
```js
  removeEvent("blur", targetElement, this.handleChangeTodoText)
  removeEvent("keypress", targetElement, this.handleChangeTodoText)
```

#### Adding Attributes to an Element & Nesting Elements

To add attributes to an element using the mini-framework project, use the `createStructure()` function with an attri property provided alongside the tag property within the JSON object, 
that is an array of attribute key-value pairs.

To nest elements using the mini-framework project, use the `createStructure()` function with a children property provided alongside the tag property within the JSON object, 
that is a single child in a JSON object or an array of child elements.

Here is an example of how to create a li (list item) element with a child div element, which in turn contains a few child elements:

```js
const li = createStructure({
              tag:"li",
              attri:[
                "data-id",todo.id,
                "class",cl
              ],
              children:[
                  {
                    tag:"div",
                    attri:[
                      "class","view",
                    ],
                    children: [
                      {
                        tag:"input",
                        attri:[
                          "class","toggle",
                          "type","checkbox",
                          "data-id",todo.id,
                          "checked",todo.completed ? "checked" : "",
                        ],
                      },
                      {
                        tag:"label",
                        attri:[
                          "data-id",todo.id,
                        ],
                        children: [text]
                      },
                      {
                        tag:"button",
                        attri:[
                          "class","destroy",
                          "data-id",todo.id,
                        ],
                      },
                    ]
                  },   
              ]
            });
```
## Authors

- [@October](https://github.com/october45)

## License

[MIT](https://choosealicense.com/licenses/mit/)
